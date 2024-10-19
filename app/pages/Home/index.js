import Page from "classes/Page.js";
import _ from "lodash";
import GSAP from "gsap";
export default class Home extends Page {
  constructor() {
    super({
      id: "home",
      element: ".home",
      elements: {
        galleries: ".gallery",
        container: ".fake-middle",
        slider: ".slider",
        homeRevealer:".home__revealer",
        galleryName: ".home__revealer__text"
        
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
        this.animate();
      });
    });
  }



  animate() {
    const tl = GSAP.timeline();
    const maxDimension = Math.max(window.innerHeight * 2, window.innerWidth * 2);

    this.elements.galleryName.innerText = this.galleryName


    tl.set(this.elements.homeRevealer, {
      y: `${maxDimension}px`,
      rotate: 16,
    });

    tl.set(this.elements.galleryName, {
      opacity: 0,
      rotate: -16,
    });

    // First half animation
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
      .to(this.elements.homeRevealer, {
        y: `-${maxDimension}px`,
        duration: 1.2,
        ease: "power3.inOut",
      }, "secondHalf+=0.2");

    return tl;
  }



  // animate() {
  //   const tl = GSAP.timeline();
  //   const maxDimension = Math.max(window.innerHeight * 2, window.innerWidth * 2);

  //   this.elements.galleryName.innerText = this.galleryName;

  //   // Initial setup
  //   tl.set(this.elements.homeRevealer, {
  //     y: `${maxDimension}px`,
  //     rotate: 20, // Slightly increased rotation for more dramatic effect
  //   });

  //   tl.set(this.elements.galleryName, {
  //     opacity: 0,
  //     rotate: -20,
  //   });

  //   // First half animation - Rolling in from bottom
  //   tl.addLabel("firstHalf")
  //     .to(this.elements.homeRevealer, {
  //       y: "0",
  //       rotate: 0, // Rotate back to neutral
  //       duration: 2, // Longer duration for smoother motion
  //       ease: "power2.out", // Changed to power2 for more natural deceleration
  //     }, "firstHalf")
  //     .to(this.elements.galleryName, {
  //       opacity: 1,
  //       rotate: 0,
  //       duration: 1.6, // Synchronized with main animation
  //       ease: "power1.out",
  //     }, "firstHalf+=0.4"); // Slight delay for text appearance

  //   // Pause at midpoint for visual effect
  //   tl.addLabel("pause")
  //     .to({}, {
  //       duration: 0.8, // Added pause for emphasis
  //     });

  //   // Add navigation callback after pause
  //   tl.call(() => {
  //     if (this.onNavigationCallback) {
  //       this.onNavigationCallback();
  //       this.onNavigationCallback = null;
  //     }
  //   });

  //   // Second half animation - Rolling out to top
  //   tl.addLabel("secondHalf")
  //     .to(this.elements.galleryName, {
  //       opacity: 0,
  //       rotate: 20, // Rotate in opposite direction
  //       duration: 1.6,
  //       ease: "power1.in",
  //     }, "secondHalf")
  //     .to(this.elements.homeRevealer, {
  //       y: `-${maxDimension}px`,
  //       rotate: 20,
  //       duration: 2,
  //       ease: "power2.in", // Changed to power2 for natural acceleration
  //     }, "secondHalf+=0.2");

  //   return tl;
  // }
}



