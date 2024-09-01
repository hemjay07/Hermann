import GSAP from "gsap";

import Components from "classes/Components.js";
import { set } from "lodash";

export default class Preloader extends Components {
  constructor() {
    super({
      element: ".preloader",
      elements: {
        title: ".preloader__text",
        number: ".preloader__number",
        numberText: ".preloader__number__text",
      },
    });

    this.length = 0;

    this.createLoader();
  }

  createLoader() {
    setTimeout(() => {
      this.onAssetLoaded();
    }, 500);
  }

  // This is used to calculate the preloader value. The fraction of loaded images to the total number of images.
  onAssetLoaded(image) {
    const randomNum = Math.floor(Math.random() * 10) + 1;

    this.length = this.length + randomNum;

    this.elements.numberText.innerHTML = `${Math.round(this.length)}%`;

    if (this.length >= 100) {
      this.elements.numberText.innerHTML = "100%";

      setTimeout(() => {
        this.onLoaded();
      }, 3000);
    } else {
      this.createLoader();
    }
  }

  onLoaded() {
    return new Promise((resolve) => {
      this.emit("completed");

      this.destroy();
    });
  }

  destroy() {
    this.element.parentNode.removeChild(this.element);
  }
}
