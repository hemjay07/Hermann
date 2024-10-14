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
        homeRevealer:".home__revealer",
        galleryName: ".home__revealer__text"
        
      },
    });

    super.create();
    console.log(this);
    // this.animate();
    this.addEventListener();
  }

  create() {
    super.create();
  
  }
  destroy() {
    super.destroy();
  }

  addEventListener() {
    console.log(this);

    const slider = this.elements.slider;

    _.forEach(this.elements.items, (item) => {
      item.addEventListener("click", () => {
        this.animate();
      });
    })
  }

  animate() {
    const tl = GSAP.timeline();

    // Initial setup
    tl.set(this.elements.homeRevealer, {
      y: "300vh",
      rotate: 16,
    });

    tl.set(this.elements.galleryName, {
      opacity: 0,
      rotate: -16,
    });

    // First half: Reveal and rotate
    tl.addLabel("firstHalf")
      .to(this.elements.homeRevealer, {
        y: "0",
        duration: 1.2,
        ease: "power3.inOut",
      }, "firstHalf")
      .to(this.elements.galleryName, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      }, "firstHalf+=0.4");

    // Pause
    tl.addLabel("pause", "+=2");

    // Second half: Hide and move up
    tl.addLabel("secondHalf")
      .to(this.elements.galleryName, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
      }, "secondHalf")
      .to(this.elements.homeRevealer, {
        y: "-300vh",
        duration: 1.2,
        ease: "power3.inOut",
      }, "secondHalf+=0.2");

    return tl;
  }


}
