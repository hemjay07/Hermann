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
        const imgElement = item.querySelector('img'); // Select the <img> inside the item
        const altText = imgElement.alt// Get the alt attribute if img exists

        this.galleryName=altText
        this.animate();
      });
    })
  }

  animate() {
    const tl = GSAP.timeline();
    console.log()

    this.elements.galleryName.innerText=  this.galleryName

    console.log(this.elements.galleryName)

    // Initial setup
    // Calculate the maximum value between 300vh and 300vw
    const maxDimension = Math.max(window.innerHeight * 2, window.innerWidth * 2 );

    tl.set(this.elements.homeRevealer, {
      y: `${maxDimension}px`, // Set to the maximum value
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
        y: `-${maxDimension}px`,
        duration: 1.2,
        ease: "power3.inOut",
      }, "secondHalf+=0.2");

    return tl;
  }


}
