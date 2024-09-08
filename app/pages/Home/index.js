import Page from "classes/Page.js";
import _ from "lodash";
import GSAP from "gsap";
export default class Home extends Page {
  constructor() {
    super({
      id: "home",
      element: ".home",
      elements: {
        items: ".item",
        container: ".fake-middle",
        slider: ".slider",
      },
    });
  }

  create() {
    super.create();
    this.createObserver();
  }
  // destroy() {
  //   super.destroy();
  // }

  createObserver() {
    console.log(this.elements.container);
    const options = {
      root: this.elements.container,
      rootMargin: "0px",
      threshold: 0,
    };
    this.observer = new IntersectionObserver((entries, observer) => {
      console.log(observer.root);
      // entries.forEach((entry) => {
      //   // entry.target.classList.toggle("in-view", entry.isIntersecting);
      //   if (entry.isIntersecting) {
      //     GSAP.to(entry.target.querySelector(), {
      //       filter: "grayscale(0%)",
      //       duration: 0.7,
      //       ease: "expo.out",
      //     });
      //   } else {
      //     GSAP.to(entry.target.querySelector("img"), {
      //       filter: "grayscale(100%)",
      //       duration: 0.7,
      //       ease: "expo.out", // Add ease for smooth transition
      //     });
      //   }
      // });
    }, options);

    _.forEach(this.elements.items, (element) => {
      this.observer.observe(element);

      // element.addEventListener("mouseenter", () => {
      //   GSAP.to(element, {
      //     scale: 1,
      //     duration: 0.7,
      //     ease: "expo.out",
      //   });
      // });
      // element.addEventListener("mouseleave", () => {
      //   GSAP.to(element, {
      //     scale: 0.7,
      //     duration: 0.7,
      //     ease: "expo.out",
      //   });
      // });
    });

    // this.observer.observe(this.elements.tester);
  }

  // addEventListener(){
  //   windows.addEventListener("mousedown", this.onTouchDown.)
  // }
}
