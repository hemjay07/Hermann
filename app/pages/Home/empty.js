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

  this.rotation = 0;
  this.rotationSpeed = 360 / 36;
  this.currentSpeed = 0;
  this.lastTime = performance.now();
  
  this.touchStart = null;
  this.touchY = null;
  this.touchX = null;
  this.lastDelta = 0;
  this.touchVelocity = 0;
  this.isTouching = false;
  
  this.isInitializing = false;
  this.initialSpeed = 860;
  this.initialStartTime = null;
  this.initialDuration = 2700;

  this.onNavigationCallback = null;

  this.boundWheel = this.onWheel.bind(this);
  this.boundTouchStart = this.onTouchStart.bind(this);
  this.boundTouchMove = this.onTouchMove.bind(this);
  this.boundTouchEnd = this.onTouchEnd.bind(this);
}

create() {
  super.create();
  this.setupRotation();
  this.addEventListener();
}

setupRotation() {
  const slider = this.elements.slider;
  slider.style.transformStyle = 'preserve-3d';
  slider.style.transform = 'perspective(1000px) rotateX(-16deg) rotateY(0deg)';
  this.startRotationLoop();
}

initialSpeedUp(){
  this.isInitializing = true;
}

startRotationLoop() {
  const animate = (currentTime) => {
    const deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    if (this.isInitializing) {
      if (!this.initialStartTime) this.initialStartTime = currentTime;
      
      const elapsedTime = currentTime - this.initialStartTime;
      const progress = Math.min(elapsedTime / this.initialDuration, 1);
      
      this.currentSpeed = (this.initialSpeed - (this.initialSpeed - this.rotationSpeed) * progress);
      
      if (progress === 1) {
        this.isInitializing = false;
      }
    } else {
      this.currentSpeed = this.rotationSpeed + (this.currentSpeed - this.rotationSpeed) * 0.95;
    }

    this.rotation += this.currentSpeed * deltaTime;
    
    this.elements.slider.style.transform = 
      `perspective(1000px) rotateX(-16deg) rotateY(${this.rotation}deg)`;

    if (Math.abs(this.currentSpeed - this.rotationSpeed) < 0.1) {
      this.updateDetailsAndIndicators(this.rotation);
    }

    this.rotationFrame = requestAnimationFrame(animate);
  };

  this.rotationFrame = requestAnimationFrame(animate);
}

updateDetailsAndIndicators(rotation) {
  const normalizedRotation = ((rotation % 360) + 360) % 360;
  const activeIndex = Math.floor((normalizedRotation / 360) * 6);
  
  this.elements.details.forEach((detail, index) => {
    GSAP.to(detail, {
      opacity: index === activeIndex ? 1 : 0,
      duration: 0.1,
      ease: "ease"
    });
  });

  this.elements.indicators.forEach((indicator, index) => {
    indicator.style.backgroundColor = index === activeIndex ? 
      'hsl(78, 100%, 15%)' : 
      'hsla(78, 100%, 15%, 0.3)';
  });

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
  const scrollInfluence = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? 
    event.deltaY : event.deltaX;
  this.currentSpeed = scrollInfluence * 1.5;
}

onTouchStart(event) {
  event.preventDefault();
  this.isTouching = true;
  this.touchStart = event.touches[0].clientY;
  this.touchY = this.touchStart;
  this.touchX = event.touches[0].clientX;
  this.touchVelocity = 0;
  this.initialTouchX = event.touches[0].clientX;
  this.initialTouchY = event.touches[0].clientY;
  this.hasMoved = false;
}

onTouchMove(event) {
  event.preventDefault();
  if (!this.isTouching) return;

  const currentY = event.touches[0].clientY;
  const currentX = event.touches[0].clientX;
  const deltaY = this.touchY - currentY;
  const deltaX = this.touchX - currentX;
  
  // Calculate total movement from initial touch
  const totalDeltaX = this.initialTouchX - currentX;
  const totalDeltaY = this.initialTouchY - currentY;
  const totalMovement = Math.sqrt(totalDeltaX * totalDeltaX + totalDeltaY * totalDeltaY);
  
  if (totalMovement > 10) {
    this.hasMoved = true;
    const delta = Math.abs(deltaY) > Math.abs(deltaX) ? deltaY : deltaX;
    this.touchVelocity = delta;
    this.lastDelta = delta;

    this.onWheel({ 
      preventDefault: () => {},
      deltaY: delta * 2
    });
  }

  this.touchY = currentY;
  this.touchX = currentX;
}

onTouchEnd(event) {
  if (!this.isTouching) return;
  
  if (!this.hasMoved) {
    // Handle as click if there was minimal movement
    const touch = event.changedTouches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    const gallery = element?.closest('.gallery__image');
    
    if (gallery) {
      this.onGalleryClick(gallery, event);
    }
  } else {
    // Handle momentum scrolling
    const startVelocity = this.touchVelocity * 15;
    let currentVelocity = startVelocity;
    
    const decay = () => {
      if (Math.abs(currentVelocity) > 0.1) {
        this.onWheel({
          preventDefault: () => {},
          deltaY: currentVelocity
        });
        
        currentVelocity *= 0.95;
        requestAnimationFrame(decay);
      }
    };

    requestAnimationFrame(decay);
  }
  
  this.isTouching = false;
  this.touchStart = null;
  this.touchY = null;
  this.touchX = null;
  this.hasMoved = false;
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
  window.addEventListener('wheel', this.boundWheel, { passive: false });
  
  if ('ontouchstart' in window) {
    this.elements.slider.addEventListener('touchstart', this.boundTouchStart, { passive: false });
    this.elements.slider.addEventListener('touchmove', this.boundTouchMove, { passive: false });
    this.elements.slider.addEventListener('touchend', this.boundTouchEnd);
  }

  _.forEach(this.elements.galleries, (gallery) => {
    const link = gallery.querySelector('a');
    this.boundGalleryClick = this.onGalleryClick.bind(this, gallery);
    link.addEventListener("click", this.boundGalleryClick);
  });
}

removeEventListeners() {
  window.removeEventListener('wheel', this.boundWheel);
  
  if ('ontouchstart' in window) {
    this.elements.slider.removeEventListener('touchstart', this.boundTouchStart);
    this.elements.slider.removeEventListener('touchmove', this.boundTouchMove);
    this.elements.slider.removeEventListener('touchend', this.boundTouchEnd);
  }

  _.forEach(this.elements.galleries, (gallery) => {
    const link = gallery.querySelector('a');
    link.removeEventListener("click", this.boundGalleryClick);
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