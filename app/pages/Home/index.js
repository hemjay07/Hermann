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
        rotate: ".content__rotate",
        move: ".content__move",
        reverse: ".content__reverse",
      },
    });

    super.create();
    console.log(this);
    // this.animate();
    this.addEventListener();
  }

  create() {
    super.create();
    // this.addEventListener();

    // this.createObserver();
  }
  destroy() {
    super.destroy();
  }

  // createObserver() {
  //   console.log(this.elements.container);
  //   const options = {
  //     root: this.elements.container,
  //     rootMargin: "0px",
  //     threshold: 0,
  //   };
  //   this.observer = new IntersectionObserver((entries, observer) => {
  //     console.log(observer.root);
  //     // entries.forEach((entry) => {
  //     //   // entry.target.classList.toggle("in-view", entry.isIntersecting);
  //     //   if (entry.isIntersecting) {
  //     //     GSAP.to(entry.target.querySelector(), {
  //     //       filter: "grayscale(0%)",
  //     //       duration: 0.7,
  //     //       ease: "expo.out",
  //     //     });
  //     //   } else {
  //     //     GSAP.to(entry.target.querySelector("img"), {
  //     //       filter: "grayscale(100%)",
  //     //       duration: 0.7,
  //     //       ease: "expo.out", // Add ease for smooth transition
  //     //     });
  //     //   }
  //     // });
  //   }, options);

  //   _.forEach(this.elements.items, (element) => {
  //     this.observer.observe(element);

  //     // element.addEventListener("mouseenter", () => {
  //     //   GSAP.to(element, {
  //     //     scale: 1,
  //     //     duration: 0.7,
  //     //     ease: "expo.out",
  //     //   });
  //     // });
  //     // element.addEventListener("mouseleave", () => {
  //     //   GSAP.to(element, {
  //     //     scale: 0.7,
  //     //     duration: 0.7,
  //     //     ease: "expo.out",
  //     //   });
  //     // });
  //   });

  //   // this.observer.observe(this.elements.tester);
  // }

  addEventListener() {
    console.log(this);

    const slider = this.elements.slider;

    _.forEach(this.elements.items, (item) => {
      item.addEventListener("click", () => {
        this.animate();
      });
    });

    //   console.log("event listener added");
    // });

    // slider.addEventListener("click", () => {
    //   console.log(slider.style.animationPlayState);
    //   slider.style.animationPlayState = "paused";
    // });
  }

  animate() {
    // this.elements.rotate.style.transform = `rotate(16deg)`;

    // this.elements.move.style.width = `calc(100vw * ${Math.abs(
    //   Math.cos((16 * Math.PI) / 180)
    // )} + 100vh * ${Math.abs(Math.sin((16 * Math.PI) / 180))})`;
    // this.elements.move.style.height = `calc(100vw * ${Math.abs(
    //   Math.sin((16 * Math.PI) / 180)
    // )} + 100vh * ${Math.abs(Math.cos((16 * Math.PI) / 180))})`;

    // this.elements.reverse.style.transform = `rotate(-16deg)`;

    const tl = GSAP.timeline();

    tl.to(this.elements.move, {
      y: "-100%",
      ease: "power3.out", // Apply easing
      duration: 1.2, // Set duration to 1 second
    }).to(
      this.elements.reverse,
      {
        y: "100%",
        ease: "power3.out", // Apply easing
        duration: 1.2, // Set duration to 1 second
      },
      0
    ); // The '0' here ensures both animations start at the same time
  }
}
