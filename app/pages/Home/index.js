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
       indicators: ".indicator-dot", pinnedArt: ".pinned-art", // Add this
      artworkContainer: ".pinned-art .artwork" // Add this
     }
   });

   // Rotation system
   this.rotation = 0;
   this.rotationSpeed = 360 / 36;
   this.currentSpeed = 0;
       this.directionMultiplier = 1;

   this.lastTime = performance.now();

   // Touch tracking properties
   this.touchStart = null;
   this.touchY = null;
   this.lastDeltaY = 0;
   this.touchVelocity = 0;
   this.isTouching = false;

   // Initialization states
   this.isInitializing = false;
   this.initialSpeed = 860;
   this.initialStartTime = null;
   this.initialDuration = 2700;

   // Navigation state
   this.onNavigationCallback = null;

   // Bind event handlers
    this.boundWheel = this.onWheel.bind(this);
  this.boundTouchStart = this.onTouchStart.bind(this);
  this.boundTouchMove = this.onTouchMove.bind(this);
  this.boundTouchEnd = this.onTouchEnd.bind(this);

 }
initializePinnedArt(){
  console.log("initialize pinned art")
   GSAP.set(this.elements.pinnedArt,{
        opacity:0

  })
}

 setupPinnedArt() {
  console.log("set up being called")
  if (this.elements.pinnedArt) {
    GSAP.set(this.elements.pinnedArt,{
        opacity:1

  })
    const tl = GSAP.timeline({ delay: 1 });
    
    tl.from(this.elements.pinnedArt, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "elastic.out(1, 0.5)"
    });

    // subtle swing animation
    GSAP.to(this.elements.artworkContainer, {
      opacity:1,
      rotation: "2",
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut"
    });
  }
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

 initialSpeedUp() {
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

        this.currentSpeed = (this.initialSpeed - (this.initialSpeed - this.rotationSpeed) * progress) * this.directionMultiplier;

       if (progress === 1) {
         this.isInitializing = false;
              this.setupPinnedArt(); // Add this

       }
     } else {
        const targetSpeed = this.rotationSpeed * this.directionMultiplier;
       this.currentSpeed += (targetSpeed - this.currentSpeed) * 0.2;
     }

     this.rotation += this.currentSpeed * deltaTime;

     this.elements.slider.style.transform = 
       `perspective(1000px) rotateX(-16deg) rotateY(${this.rotation}deg)`;

    
      if (Math.abs(Math.abs(this.currentSpeed) - this.rotationSpeed) < 0.1) {
        this.updateDetailsAndIndicators(this.rotation);
      }

     this.rotationFrame = requestAnimationFrame(animate);
   };

   this.rotationFrame = requestAnimationFrame(animate);
 }

 updateDetailsAndIndicators(rotation) {
   const normalizedRotation = ((rotation % 360) + 360) % 360;
   
   let activeIndex = Math.floor((normalizedRotation / 360) * 6);

    if (this.directionMultiplier === -1) {
    activeIndex = (activeIndex - 1 + 6) % 6; // Shift backward, wrap around
  }
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
   const scrollInfluence = event.deltaY * 1.5;

    if (Math.abs(scrollInfluence) > 1) {
        this.directionMultiplier = scrollInfluence > 0 ? -1 : 1;
    }

    const scrollSpeed = Math.abs(scrollInfluence);
    
    if ((scrollInfluence > 0 && this.directionMultiplier < 0) || 
        (scrollInfluence < 0 && this.directionMultiplier > 0)) {
        this.currentSpeed = this.directionMultiplier * 
            Math.max(this.rotationSpeed, scrollSpeed);
    } else {
        this.currentSpeed = scrollSpeed * this.directionMultiplier;
    } }

 onTouchStart(event) {
  //  event.preventDefault();
   this.isTouching = true;
   this.touchStart = event.touches[0].clientY;
   this.touchY = this.touchStart;
   this.touchVelocity = 0;
 }

 onTouchMove(event) {
  //  event.preventDefault();
   if (!this.isTouching) return;

   const currentY = event.touches[0].clientY;
   const deltaY = this.touchY - currentY;

   this.touchVelocity = deltaY;
   this.lastDeltaY = deltaY;

   this.onWheel({ 
     preventDefault: () => {},
     deltaY: deltaY * 2
   });

   this.touchY = currentY;
 }

 onTouchEnd() {
   this.isTouching = false;

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

   this.touchStart = null;
   this.touchY = null;
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
   window.addEventListener('touchstart', this.boundTouchStart);
    window.addEventListener('touchmove', this.boundTouchMove);
    window.addEventListener('touchend', this.boundTouchEnd);
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
    window.removeEventListener('touchstart', this.boundTouchStart);
    window.removeEventListener('touchmove', this.boundTouchMove);
    window.removeEventListener('touchend', this.boundTouchEnd);
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
