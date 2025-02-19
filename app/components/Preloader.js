import GSAP from "gsap";
import Components from "classes/Components.js";

export default class Preloader extends Components {
  constructor({ template, page, cache }) {
    super({
      element: ".preloader",
      elements: {
        title: ".preloader__text",
        number: ".preloader__number",
        numberText: ".preloader__number__text",
        preloaderAnimation: ".preloader__animation",
      },
    });

    this.pageCache = cache;

    // Track loading progress
    this.loadedItems = {
      preloaderImages: 0,
      galleryImages: 0,
      pages: 0,
    };

    // Calculate totals for progress
    const routes = ["/", "/about"];
    const galleries = window.ASSETS.galleries || [];
    const galleryRoutes = galleries.map((gallery) => `/gallery/${gallery.uid}`);
    const totalRoutes = [...routes, ...galleryRoutes];

    this.totalItems = {
      preloaderImages: window.ASSETS.preloaderImages.length,
      galleryImages: window.ASSETS.galleryImages.length,
      pages: totalRoutes.length,
    };

    this.totalAssets =
      this.totalItems.preloaderImages +
      this.totalItems.galleryImages +
      this.totalItems.pages;

    this.template = template;
    this.page = page;

    this.createLoader();
  }

  updateProgress() {
    const totalLoaded =
      this.loadedItems.preloaderImages +
      this.loadedItems.galleryImages +
      this.loadedItems.pages;

    let percent;
    const actualPercent = (totalLoaded / this.totalAssets) * 90;

    if (actualPercent >= 90) {
      if (!this.startTime) {
        this.startTime = Date.now();
        this.progressInterval = setInterval(() => {
          const elapsed = Date.now() - this.startTime;
          const artificialProgress = (elapsed / 6000) * 10; // 10% over 6s

          percent = Math.min(90 + artificialProgress, 100);
          this.elements.numberText.innerHTML = `${Math.round(percent)}%`;

          if (percent >= 100) {
            clearInterval(this.progressInterval);
            this.onLoaded();
          }
        }, 100); // Update every 50ms for smooth animation
      }
      return;
    }

    percent = actualPercent;
    this.elements.numberText.innerHTML = `${Math.round(percent)}%`;
  }

  async loadPreloaderImages() {
    if (!window.ASSETS.preloaderImages.length) return;

    const preloaderLoadPromises = window.ASSETS.preloaderImages.map(
      async (image) => {
        try {
          await this.loadImage(image);
          this.loadedItems.preloaderImages++;
          this.updateProgress();
          if (
            this.loadedItems.preloaderImages === this.totalItems.preloaderImages
          ) {
            if (this.elements.preloaderAnimation) {
              // Animate title first
              GSAP.fromTo(
                this.elements.title,
                {
                  opacity: 0,
                },
                {
                  opacity: 1,
                  duration: 0.5,
                  ease: "ease.in",
                }
              );

              GSAP.fromTo(
                this.elements.preloaderAnimation,
                {
                  opacity: 0,
                },
                {
                  opacity: 1,
                  duration: 1,
                  ease: "ease.in",
                  delay: 0.5,
                }
              );
            }
          }
        } catch (error) {
          console.error("Error loading preloader image:", error);
          this.updateProgress();
        }
      }
    );

    await Promise.allSettled(preloaderLoadPromises);
  }

  async loadGalleryImages() {
    if (!window.ASSETS.galleryImages.length) return;

    const galleryLoadPromises = window.ASSETS.galleryImages.map(
      async (image) => {
        try {
          // Load both thumbnail and preview versions in parallel
          await Promise.all([
            this.loadImage(image.thumbnail),
            this.loadImage(image.preview),
          ]);

          this.loadedItems.galleryImages++;
          this.updateProgress();
        } catch (error) {
          console.error("Error loading gallery image:", error);
          this.updateProgress();
        }
      }
    );

    await Promise.allSettled(galleryLoadPromises);
  }

  async loadPages() {
    const routes = ["/", "/about"];
    const galleries = window.ASSETS.galleries || [];
    const galleryRoutes = galleries.map((gallery) => `/gallery/${gallery.uid}`);
    const allRoutes = [...routes, ...galleryRoutes];

    const fetchPromises = allRoutes.map(async (route) => {
      try {
        const response = await fetch(route);
        if (response.status === 200) {
          const html = await response.text();
          const div = document.createElement("div");
          div.innerHTML = html;
          const content = div.querySelector(".content");

          this.pageCache.set(route, {
            html: content.innerHTML,
            template: content.getAttribute("data-template"),
          });

          this.loadedItems.pages++;
          this.updateProgress();
        }
      } catch (error) {
        console.error(`Error fetching ${route}:`, error);
        this.updateProgress();
      }
    });

    await Promise.allSettled(fetchPromises);
  }

  loadImage(src) {
    return new Promise((resolve, reject) => {
      const media = new window.Image();
      media.crossOrigin = "anonymous";
      media.src = src;
      media.onload = () => resolve(media);
      media.onerror = reject;
    });
  }

  async createLoader() {
    try {
      // Load preloader images first
      await this.loadPreloaderImages();

      // Then load gallery images and pages in parallel
      await Promise.all([this.loadGalleryImages(), this.loadPages()]);
    } catch (error) {
      console.error("Error in loader:", error);
    }
  }

  onLoaded() {
    return new Promise((resolve) => {
      this.emit("completed");

      this.animateOut = GSAP.timeline({ delay: 0.5 });

      if (this.template === "home") {
        // If we are on the home page, give the gallery an initial speed up
        this.animateOut.call(() => {
          if (this.page && typeof this.page.initialSpeedUp === "function") {
            this.page.initialSpeedUp();
            this.page.initializePinnedArt();
          }
        });
      }

      this.animateOut.to(this.element, {
        scaleY: 0,
        transformOrigin: "0 100%",
        duration: 0.5,
      });

      this.animateOut.call(() => {
        this.destroy();
        resolve();
      });
    });
  }

  destroy() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }

    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}
