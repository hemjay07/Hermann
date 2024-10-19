import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import errorHandler from "errorHandler";
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
const cache = new NodeCache({ stdTTL: 3600 });

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
  if (doc.type === "product") {
    return `/detail/${doc.uid}`;
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

  // Try to get galleries from cache first
  let galleries = cache.get(CACHE_KEY);

  if (galleries === undefined) {
    try {
      const api = initApi(req);

      // Fetch galleries with retry mechanism
      galleries = await fetchWithRetry(async () => {
        const results = await api.getAllByType("gallery");
        return results;
      });

      if (galleries) {
        // Store in cache if fetch was successful
        cache.set(CACHE_KEY, galleries);
      }
    } catch (error) {
      console.error('Error fetching galleries:', error);
      // Return empty array instead of throwing to prevent complete failure
      return [];
    }
  }

  return galleries || [];
};

// Routes
app.get("/", async (req, res) => {
  try {
    const galleries = await getCachedGalleries(req);
    res.render("pages/home", {
      galleries
    });
  } catch (error) {
    console.error('Error in home route:', error);
    // Render the page with empty galleries rather than showing an error
    res.render("pages/home", {
      galleries: []
    });
  }
});

app.get("/gallery/:uid", async (req, res) => {
  try {
    const api = initApi(req);
    // You can implement similar caching for individual galleries if needed
    res.render("pages/gallery");
  } catch (error) {
    console.error('Error loading gallery:', error);
    res.render("pages/gallery");
  }
});

app.get("/contact", (req, res) => {
  res.render("pages/contact");
});

app.get("/details", (req, res) => {
  res.render("pages/details");
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