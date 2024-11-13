import Page from "classes/Page.js";
import _ from "lodash";
import GSAP from "gsap";
export default class Home extends Page {
  constructor() {
    super({
      id: "home",
      element: ".home",
      elements: {
        galleries: ".gallery__image",
        container: ".fake-middle",
        slider: ".slider",
        revealer:".revealer",
        galleryName: ".revealer__text"
        
      },
    });

    // super.create();
    console.log("indide hoem js");
    this.onNavigationCallback = null;

  }

  create() {
    super.create();
    console.log("super create")  
      this.addEventListener();
    // this.animate();

  
  }
  destroy() {
    super.destroy();
  }


  addEventListener() {
    _.forEach(this.elements.galleries, (gallery) => {
      const link = gallery.querySelector('a'); // Get the anchor element inside gallery

      link.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation(); // Prevent event from bubbling up

        const imgElement = gallery.querySelector('img');
        const altText = imgElement.alt;
        const href = link.getAttribute('href');

        // Store the navigation info but don't navigate yet
        this.onNavigationCallback = () => {
          window.app.onChange({ url: href });
        };

        console.log(altText)
        this.galleryName = altText;
        this.elements.galleryName.innerText = this.galleryName

        this.animate();
      });
    });
  }



  animate() {
    const tl = GSAP.timeline();
    const maxDimension = Math.max(window.innerHeight * 2, window.innerWidth * 2);



    tl.set(this.elements.revealer, {
      y: `${maxDimension}px`,
      rotate: 20,
    });

    tl.set(this.elements.galleryName, {
      opacity: 0,
      rotate: -20,
    });

    // First half animation
    tl.addLabel("firstHalf")
      .to(this.elements.revealer, {
        y: "0",
        duration: 1.2,
        ease: "power3.inOut",
      }, "firstHalf")
      .to(this.elements.galleryName, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      }, "firstHalf+=0.4");

    // Add callback at the midpoint of the animation
    tl.call(() => {
      if (this.onNavigationCallback) {
        this.onNavigationCallback();
        this.onNavigationCallback = null;
      }
    }, null, "+=0.5");

    // Second half animation
    tl.addLabel("secondHalf")
      .to(this.elements.galleryName, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
      }, "secondHalf")
      .to(this.elements.revealer, {
        y: `-${maxDimension}px`,
        duration: 2,
              rotate: 20,

        ease: "power3.inOut",
      }, "secondHalf+=0.2");

    return tl;
  }
}



