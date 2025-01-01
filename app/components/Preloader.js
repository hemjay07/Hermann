import GSAP from "gsap";
import Components from "classes/Components.js";

export default class Preloader extends Components {
  constructor({template, page, cache}) {
    super({
      element: ".preloader",
      elements: {
        title: ".preloader__text",
        number: ".preloader__number",
        numberText: ".preloader__number__text",
        preloaderAnimation: ".preloader__animation"
      },
    });

    this.pageCache = cache;

    // Track loading progress
    this.loadedItems = {
      preloaderImages: 0,
      galleryImages: 0,
      pages: 0
    };

    // Calculate totals for progress
    const routes = ['/', '/about'];
    const galleries = window.ASSETS.galleries || [];
    const galleryRoutes = galleries.map(gallery => `/gallery/${gallery.uid}`);
    const totalRoutes = [...routes, ...galleryRoutes];

    this.totalItems = {
      preloaderImages: window.ASSETS.preloaderImages.length,
      galleryImages: window.ASSETS.galleryImages.length,
      pages: totalRoutes.length
    };

    this.totalAssets = this.totalItems.preloaderImages + 
                      this.totalItems.galleryImages +
                      this.totalItems.pages;

    this.template = template;
    this.page = page;
    
    this.createLoader();
  }

  updateProgress() {
    const totalLoaded = this.loadedItems.preloaderImages + 
                       this.loadedItems.galleryImages +
                       this.loadedItems.pages;
    
    const percent = Math.min((totalLoaded / this.totalAssets) * 100, 100);
    this.elements.numberText.innerHTML = `${Math.round(percent)}%`;

    if (totalLoaded >= this.totalAssets) {
      setTimeout(() => {
        this.onLoaded();
      }, 1000);
    }
  }

  async loadPreloaderImages() {
    if (!window.ASSETS.preloaderImages.length) return;

    const preloaderLoadPromises = window.ASSETS.preloaderImages.map(async (image) => {
      try {
        await this.loadImage(image);
        this.loadedItems.preloaderImages++;
        this.updateProgress();

        if (this.loadedItems.preloaderImages === this.totalItems.preloaderImages) {
          if (this.elements.preloaderAnimation) {
            this.elements.preloaderAnimation.style.display = "block";
          }
        }
      } catch (error) {
        console.error('Error loading preloader image:', error);
      }
    });

    await Promise.allSettled(preloaderLoadPromises);
  }

  async loadGalleryImages() {
    if (!window.ASSETS.galleryImages.length) return;

    const galleryLoadPromises = window.ASSETS.galleryImages.map(async (image) => {
      try {
        await this.loadImage(image);
        this.loadedItems.galleryImages++;
        this.updateProgress();
      } catch (error) {
        console.error('Error loading gallery image:', error);
      }
    });

    await Promise.allSettled(galleryLoadPromises);
  }

  async loadPages() {
    const routes = ['/', '/about'];
    const galleries = window.ASSETS.galleries || [];
    const galleryRoutes = galleries.map(gallery => `/gallery/${gallery.uid}`);
    const allRoutes = [...routes, ...galleryRoutes];
    
    const fetchPromises = allRoutes.map(async (route) => {
      try {
        const response = await fetch(route);
        if (response.status === 200) {
          const html = await response.text();
          const div = document.createElement('div');
          div.innerHTML = html;
          const content = div.querySelector('.content');
          
          this.pageCache.set(route, {
            html: content.innerHTML,
            template: content.getAttribute('data-template')
          });
          
          this.loadedItems.pages++;
          this.updateProgress();
        }
      } catch (error) {
        console.error(`Error fetching ${route}:`, error);
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
      await Promise.all([
        this.loadPreloaderImages(),
        this.loadGalleryImages(),
        this.loadPages()
      ]);
    } catch (error) {
      console.error('Error in loader:', error);
    }
  }

  onLoaded() {
    return new Promise((resolve) => {
      this.emit("completed");

      this.animateOut = GSAP.timeline({ delay: 5 });
      
      if (this.template === "home") {
        this.animateOut.call(() => {           

          if (this.page && typeof this.page.initialSpeedUp === 'function') {

            this.page.initialSpeedUp();
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
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}