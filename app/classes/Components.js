import EventEmitter from "events";
import _ from "lodash";

export default class Components extends EventEmitter {
  constructor({ element, elements, id }) {
    super();
    this.selector = element;
    this.selectorChildren = { ...elements };

    this.create();
    this.addEventListeners();
  }

  create() {
    if (this.selector instanceof window.HTMLElement) {
      this.element = this.selector;
    } else {
      this.element = document.querySelector(this.selector);
    }

    this.elements = {};
    _.forEach(this.selectorChildren, (entry, key) => {
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
          }
        }
      }
    });
  }

  addEventListeners() {}
  removeEventListeners() {}
}
