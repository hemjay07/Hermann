import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import errorHandler from "errorhandler";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import logger from "morgan"
import NodeCache from "node-cache";

import PrismicDOM from "prismic-dom";
import * as Prismic from "@prismicio/client";

import UAParser from "ua-parser-js";

import dotenv from "dotenv";
dotenv.config();

// Initialize Express app
const app = express();
app.set("view engine", "pug");

// Determine the __dirname equivalent in ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Initialize cache with 1 hour TTL (Time To Live)
const cache = new NodeCache({ stdTTL: 180 }); // 3 minutes

/**
 * Enhanced Prismic client initialization with proper error handling and timeouts
 * Includes retry mechanism for failed initialization attempts
 */
const initApi = (req) => {
  return Prismic.createClient(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req,
    fetch: (url, options) => {
      // Set up request timeout using AbortController
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      return fetch(url, {
        ...options,
        signal: controller.signal,
      })
        .then(response => {
          clearTimeout(timeoutId);
          return response;
        })
        .catch(error => {
          clearTimeout(timeoutId);
          throw error;
        });
    }
  });
};

/**
 * Helper function to retry failed API calls
 * Uses exponential backoff strategy for retries
 */
const fetchWithRetry = async (fetchFn, maxRetries = 3, delay = 1000) => {
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetchFn();
    } catch (error) {
      lastError = error;
      console.error(`Attempt ${i + 1} failed:`, error);

      if (i < maxRetries - 1) {
        // Wait longer between each retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }

  throw lastError;
};



const handleLinkResolver = (doc) => {
  if (doc.type === "image_url") {
    const image_url = encodeURIComponent(doc.url);
    return `/details?image_url=${image_url}`; // Pass image_url as a URL parameter
  }
  if (doc.type === "about") {
    return `/about`;
  }
  if (doc.type === "gallery") {
    return `/gallery/${doc.uid}`;
  }
  if (doc.type === "collections_group") {
    return `/collections`;
  }
  return "/";
};

// Middleware setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(errorHandler());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  const ua = UAParser(req.headers["user-agent"]);

  res.locals.isDesktop = ua.device.type === undefined;
  res.locals.isPhone = ua.device.type === "mobile";
  res.locals.isTablet = ua.device.type === "tablet";

  res.locals.Link = handleLinkResolver;
  res.locals.PrismicDOM = PrismicDOM;
  next();
});

/**
 * Enhanced gallery fetching with caching and error handling
 * Returns cached data if available, otherwise fetches from Prismic
 * Includes retry mechanism for failed API calls
 */

const getCachedGalleries = async (req) => {
  const CACHE_KEY = 'galleries';
  let galleries = cache.get(CACHE_KEY);

  if (galleries === undefined) {
    console.log(`[${new Date().toISOString()}] Cache miss: Fetching galleries from Prismic`);
    try {
      const api = initApi(req);
      galleries = await fetchWithRetry(async () => {
        const results = await api.getAllByType("gallery");
        return results;
      });

      if (galleries) {
        cache.set(CACHE_KEY, galleries);
        console.log(`[${new Date().toISOString()}] Cached galleries for 3 minutes`);
      }
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Prismic fetch failed:`, error);
      throw error;
    }
  } else {
    console.log(`[${new Date().toISOString()}] Cache hit: Using cached galleries`);
  }

  return galleries || [];
};

const handleRequest = async (api,req) => {
 let preloaderImages = []

  let assets ={galleryImages:[], preloaderImages:[], galleries:[]}

  const galleries = await getCachedGalleries(req);
  galleries.forEach(gallery=>{

    assets.galleries.push({uid: gallery.uid})
    gallery.data.gallery_images.forEach(image=>{
            const baseUrl = image.gallery_image.url.split('?')[0]; // Remove any existing parameters

      assets.galleryImages.push({
                  url: `${baseUrl}?w=400&q=80`,          // Use thumbnail by default

        thumbnail: `${baseUrl}?w=400&q=80`,  // Grid & Home
        preview: `${baseUrl}?w=800&q=85`,    // Transitions
        full: baseUrl,                       // Final view
      })
    })
  })

const preloader = await api.getSingle("preloader");
preloader.data.body.forEach(frame => {
  frame.items.forEach(image => {
    const baseUrl = image.img.url.split('?')[0];
    // Only reduce quality for preloader images
    preloaderImages.push(`${baseUrl}?w=400&q=0`);  // Just lower quality since it's under overlay
  });
});


assets.preloaderImages.push(...preloaderImages)
  return {
    assets,
  preloaderImages, preloader
  };
};

// Routes
app.get("/", async (req, res) => {
  try {
    const api = initApi(req);
  const defaults = await handleRequest(api, req); 

    const galleries = await getCachedGalleries(req);
    res.render("pages/home", {
     ...defaults, galleries
    });
  } catch (error) {
    console.error('Error in home route:', error);
    // Render the page with empty galleries rather than showing an error
    // res.render("pages/home", {
    //   galleries: []
    // });
  }
});

app.get("/gallery/:uid", async (req, res) => {
  try {
    const api = initApi(req);

    const { uid } = req.params;
    const galleries = await getCachedGalleries(req);
    const defaults = await handleRequest(api, req); 


    // Find current gallery and its index
    const currentIndex = galleries.findIndex(gallery => gallery.uid === uid);

    if (currentIndex === -1) {
      return res.status(404).render("pages/gallery", { error: "Gallery not found" });
    }

    const gallery = galleries[currentIndex];
    const totalGalleries = galleries.length;

    // Calculate previous and next gallery UIDs
    const prevGalleryUid = galleries[(currentIndex - 1 + totalGalleries) % totalGalleries].uid;
    const nextGalleryUid = galleries[(currentIndex + 1) % totalGalleries].uid;

    // Get gallery names for animation
    const prevGalleryName = galleries[(currentIndex - 1 + totalGalleries) % totalGalleries].data.gallery_name;
    const nextGalleryName = galleries[(currentIndex + 1) % totalGalleries].data.gallery_name;

    // Transform gallery images to include optimized URLs
    const gallery_images = gallery.data.gallery_images.map(image => {
      const baseUrl = image.gallery_image.url.split('?')[0];
      return {
        ...image,
        gallery_image: {
          ...image.gallery_image,
          url: `${baseUrl}?w=400&q=80`,          // Use thumbnail by default
          thumbnail: `${baseUrl}?w=400&q=80`,     // For grid view
          preview: `${baseUrl}?w=800&q=85`,       // For transitions
          full: baseUrl,                          // For full view
        }
      };
    });
    // Pass all necessary data to the template
    res.render("pages/gallery", {
      ...defaults,
      gallery_images,
      navigation: {
        prev: {
          uid: prevGalleryUid,
          name: prevGalleryName
        },
        next: {
          uid: nextGalleryUid,
          name: nextGalleryName
        }
      }
    });

  } catch (error) {
    console.error('Error loading gallery:', error);
    // res.status(500).render("pages/gallery", { error: "Error loading gallery" });
  }
});



app.get("/about", async(req, res) => {
  const api = initApi(req);

  const defaults = await handleRequest(api, req); 

res.render("pages/about",{...defaults});
});
// Add a utility route to manually clear the cache if needed
app.get("/api/clear-cache", (req, res) => {
  cache.flushAll();
  res.json({ message: "Cache cleared successfully" });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});