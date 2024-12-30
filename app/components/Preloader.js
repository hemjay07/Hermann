
import GSAP from "gsap";
import Components from "classes/Components.js";
import { template } from "lodash";

export default class Preloader extends Components {
  constructor({template, page}) {
    super({
      element: ".preloader",
      elements: {
        title: ".preloader__text",
        number: ".preloader__number",
        numberText: ".preloader__number__text",
        preloaderAnimation: ".preloader__animation"
      },
    });

    this.length = 0;
    this.preloaderImageLength = 0;

    this.createLoader();
    this.template= template
    this.page=page
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

  async loadPreloaderImages() {
    const preloaderLoadPromises = window.ASSETS.preloaderImages.map(image => {
      return this.loadImage(image).then(() => {
        this.preloaderImageLength++
        this.onAssetLoaded();

        if (this.preloaderImageLength === window.ASSETS.preloaderImages.length) {
          console.log("Preloader images loaded");
          if (this.elements.preloaderAnimation) {
            this.elements.preloaderAnimation.style.display = "block";

          }
        }
      });
    });

    // Wait for all preloader images to load
    await Promise.all(preloaderLoadPromises);
  }

  async loadGalleryImages() {
    const galleryLoadPromises = window.ASSETS.galleryImages.map(image => {
      return this.loadImage(image).then(() => {
        this.onAssetLoaded();
      });
    });

    await Promise.all(galleryLoadPromises);
  }

  async createLoader() {
    try {
      // First load preloader images
      await this.loadPreloaderImages();

      // Then load gallery images
      await this.loadGalleryImages();

      // After all images are loaded
      const percent = this.length / (window.ASSETS.galleryImages.length + window.ASSETS.preloaderImages.length);
      
      if (percent === 1) {
        setTimeout(() => {
          this.onLoaded();
        }, 5000);
      }
    } catch (error) {
      console.error('Error loading images:', error);
    }
  }

  onAssetLoaded() {

    this.length += 1;    

    const percent = this.length / (window.ASSETS.galleryImages.length + window.ASSETS.preloaderImages.length);
    this.elements.numberText.innerHTML = `${Math.round(percent * 100)}%`;
  }

onLoaded() {
  return new Promise((resolve) => {
    this.emit("completed");

    this.animateOut = GSAP.timeline({ delay: 2 });
    
    // Call initialSpeedUp before scaling the preloader out
    if (this.template === "home") {
      this.animateOut.call(() => {
        this.page.initialSpeedUp();
      });
    }

    // Animate the preloader out
    this.animateOut.to(this.element, {
      scaleY: 0,
      transformOrigin: "0 100%",
      duration: 0.5,
    });

    // Destroy the preloader after the animation completes
    this.animateOut.call(() => {
      this.destroy();
    });
  });
}

  destroy() {
    this.element.parentNode.removeChild(this.element);
  }
}