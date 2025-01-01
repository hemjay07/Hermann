import _ from "lodash";
import GSAP from "gsap";

import { ColorsManager } from "./Colors.js";

export default class Page {
  constructor({ element, elements, id }) {
    this.selector = element;
    this.selectorChildren = { ...elements };

    this.id = this.id;
  }

  create() {
    this.element = document.querySelector(this.selector);
    this.elements = {};

    _.forEach(this.selectorChildren, (entry, key) => {
      // console.log(entry);

 
      // Check if entry is an HTML element
      // or a NodeList
      // or a selector

      // if its not one of these, then its probably a selector. In that case, querySelectAll is applied.
      //  If this returns an empty array, then its not a valid selector but if it returns an array with one element, then its a valid selector however it is just a single element. In that case, we can just use querySelector instead of querySelectorAll returns a nodelist. A nodelist is harder to work with.
      // console.log(entry);
      if (
        entry instanceof window.HTMLElement ||
        entry instanceof window.NodeList
      ) {
        this.elements[key] = entry;
      } else {
        this.elements[key] = document.querySelectorAll(entry);
        if (this.elements[key].length === 0) {
          this.elements[key] = null;
        } else {
          if (this.elements[key].length === 1) {
            this.elements[key] = document.querySelector(entry);
            // console.log(this.elements[key]);
          }
        }
      }
      // console.log(this.elements);
    });
  }

  show(animation) {
    return new Promise((resolve) => {
      ColorsManager.change({
        backgroundColor: this.element.getAttribute("data-background"),
        color: this.element.getAttribute("data-color"),
      });

      if (animation) {
        this.animationIn = animation;
      } else {
        this.animationIn = GSAP.timeline();
        this.animationIn.fromTo(
          this.element,
          {
            autoAlpha: 0,
          },
          {
            autoAlpha: 1,
          }
        );
      }

      this.animationIn.call((_) => {

        resolve();
      });
    });
  }
  
  hide() {
    return new Promise((resolve) => {
      this.destroy();

      this.animationOut = GSAP.timeline();

      this.animationOut.to(this.element, {
        autoAlpha: 0,
        onComplete: resolve,
      });
    });
  }
  // Listeners
  addEventListeners() {}
  removeEventListeners() {}

  // Destroy
  destroy() {
    this.removeEventListeners();
  }
}
