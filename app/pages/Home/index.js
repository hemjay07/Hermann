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
        hermannRotate: ".hermann__rotate",
        hermannMove: ".hermann__move",
        hermannReverse: ".hermann__reverse"
        
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
    // Create the GSAP timeline
    const tl = GSAP.timeline();

    // Set initial scales and rotations for the elements
    tl.set(this.elements.rotate, {
      rotation: 16
    })
      .set(this.elements.move, {
        scale: 2
      })
      .set(this.elements.reverse, {
        scale: 0.5,
        rotation: -16
      })
      .set(this.elements.hermannRotate, {
        rotation: -16
      })
      .set(this.elements.hermannMove, {
        scale: 2
      })
      .set(this.elements.hermannReverse, {
        rotation: 16,
        scale: 0.5
      });

    // Add animation for 'move' and 'reverse' elements, both starting at "moveOut"
    tl.to(this.elements.move, {
      y: "-200%",
      ease: "power3.out",
      duration: 1.2
    }, "moveOut")
      .to(this.elements.reverse, {
        y: "100%",
        ease: "power3.out",
        duration: 1.2
      }, "moveOut");

    // Add animations for 'hermannMove' and 'hermannReverse' starting slightly after "moveOut"
    tl.to(this.elements.hermannMove, {
      y: "-200%",
      ease: "power3.out",
      duration: 1.2
    }, "hermannOut+=1")
      .to(this.elements.hermannReverse, {
        y: "100%",
        ease: "power3.out",
        duration: 1.2
      }, "hermannOut+=1");

    // Add a final label for reference
    tl.addLabel("hermannOutComplete", "+=0.2");
  }


}
