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
        slider: ".slider",
        revealer: ".revealer",
        galleryName: ".revealer__text",
        details: ".gallery__details__item",
        indicators: ".indicator-dot"
      }
    });

    // Single rotation system
    this.rotation = 0;
    this.rotationSpeed = 360 / 36; // Base speed
    this.currentSpeed = this.rotationSpeed;
    this.lastTime = performance.now();

    // Navigation state
    this.onNavigationCallback = null;

  }

  create() {
    super.create();
    this.setupRotation();
    this.addEventListener();
  }
setupRotation() {
    const slider = this.elements.slider;
    slider.style.transformStyle = 'preserve-3d';
    
    // Set initial transform directly
    slider.style.transform = 'perspective(1000px) rotateX(-16deg) rotateY(0deg)';

    this.startRotationLoop();
}
initialSpeedUp() {
  const initialSpeed = 860; // Fast initial speed
  const duration = 1700; // Duration of the speed-up in milliseconds
  const startTime = performance.now();

  const speedUp = (currentTime) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1); // Clamp progress to [0, 1]

    // Linearly interpolate from initialSpeed to rotationSpeed
    this.currentSpeed = initialSpeed - (initialSpeed - this.rotationSpeed) * progress;

    if (progress < 1) {
      requestAnimationFrame(speedUp);
    } else {
      this.currentSpeed = this.rotationSpeed; // Ensure normal speed at the end
    }
  };

  requestAnimationFrame(speedUp);
}



startRotationLoop() {
  this.initialSpeedUp()
    const animate = (currentTime) => {
      const deltaTime = (currentTime - this.lastTime) / 1000;
      // console.log(deltaTime)
      this.lastTime = currentTime;

      this.currentSpeed += (this.rotationSpeed - this.currentSpeed) * 0.2;
      this.rotation += this.currentSpeed * deltaTime;

      // Apply transform directly to DOM
      this.elements.slider.style.transform = 
        `perspective(1000px) rotateX(-16deg) rotateY(${this.rotation}deg)`;

        // console.log(this.currentSpeed, this.rotationSpeed)

     if (Math.abs(this.currentSpeed - 10) < 0.5) {
    this.updateDetailsAndIndicators(this.rotation);
}

      this.rotationFrame = requestAnimationFrame(animate);
    };

    this.rotationFrame = requestAnimationFrame(animate);
}

 updateDetailsAndIndicators(rotation) {
  const normalizedRotation = ((rotation % 360) + 360) % 360;
  const activeIndex = Math.floor((normalizedRotation / 360) * 6);
  
  // Update gallery details
  this.elements.details.forEach((detail, index) => {
    GSAP.to(detail, {
      opacity: index === activeIndex ? 1 : 0,
      duration: 0.1,
      ease:"ease"
    });
  });

  // Update indicator dots
  this.elements.indicators.forEach((indicator, index) => {
    indicator.style.backgroundColor = index === activeIndex ? 
      'hsl(78, 100%, 15%)' : 
      'hsla(78, 100%, 15%, 0.3)';
  });

  // Update gallery grayscale
  this.elements.galleries.forEach((gallery, index) => {
    const img = gallery.querySelector('img');
    GSAP.to(img, {
      filter: index === activeIndex ? 'grayscale(0%)' : 'grayscale(100%)',
      duration: 0.5
    });
  });
}

  onWheel(event) {
    event.preventDefault();
    // Directly modify current speed based on scroll
    const scrollInfluence = event.deltaY * 0.8;

    // console.log("scrollInfluence", scrollInfluence)
    this.currentSpeed = -scrollInfluence;
  }

  onGalleryClick(gallery, event) {
    event.preventDefault();
    event.stopPropagation();

    const link = gallery.querySelector('a');
    const imgElement = gallery.querySelector('img');
    const href = link.getAttribute('href');

    this.onNavigationCallback = () => {
      window.app.onChange({ url: href });
    };

    this.galleryName = imgElement.alt;
    this.elements.galleryName.innerText = this.galleryName;

    this.animateTransition();
  }

  animateTransition() {
    const tl = GSAP.timeline();
    const maxDimension = Math.max(window.innerHeight * 2, window.innerWidth * 2);

    tl.set(this.elements.revealer, {
      display: 'flex',
      y: `${maxDimension}px`,
      rotate: 20
    });

    tl.set(this.elements.galleryName, {
      opacity: 0,
      rotate: -20
    });

    // First half animation
    tl.addLabel("firstHalf")
      .to(this.elements.revealer, {
        y: "0",
        duration: 1.2,
        ease: "power3.inOut"
      }, "firstHalf")
      .to(this.elements.galleryName, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      }, "firstHalf+=0.4");

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
        ease: "power2.in"
      }, "secondHalf")
      .to(this.elements.revealer, {
        y: `-${maxDimension}px`,
        duration: 2,
        rotate: 20,
        ease: "power3.inOut"
      }, "secondHalf+=0.2");

    tl.set(this.elements.revealer, { display: 'none' });

    return tl;
  }

  addEventListener() {
    window.addEventListener('wheel', this.onWheel.bind(this), { passive: false });

    _.forEach(this.elements.galleries, (gallery) => {
      const link = gallery.querySelector('a');
      link.addEventListener("click", this.onGalleryClick.bind(this, gallery));
    });
  }

  removeEventListeners() {
    window.removeEventListener('wheel', this.onWheel.bind(this));

    _.forEach(this.elements.galleries, (gallery) => {
      const link = gallery.querySelector('a');
      link.removeEventListener("click", this.onGalleryClick.bind(this, gallery));
    });
  }

  destroy() {
    if (this.rotationFrame) {
      cancelAnimationFrame(this.rotationFrame);
    }
    this.removeEventListeners();
    super.destroy();
  }
}