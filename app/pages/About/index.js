import Page from "classes/Page.js";
import GSAP from "gsap";

export default class About extends Page {
  constructor() {
    super({
      id: "about",
      element: ".about",
      elements: {
        wrapper: ".about__wrapper",
        first: ".about__first",
        firstLeft: ".about__first__left",
        firstRight: ".about__first__right",
        title: ".about__first__title",
        titleSpan: ".about__first__title span",
        description: ".about__first__description",
        recognition: ".about__recognition",
        social: ".about__social",
        services: ".about__service",
        serviceNumbers: ".about__service__number",
        serviceTitles: ".about__service__title",
        serviceDescriptions: ".about__service__description",
        recognitionItems: ".about__recognition__item",
        socialItems: ".about__social__item"
      }
    });

    this.isMobile = window.innerWidth <= 768;

    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      limit: this.isMobile ? window.innerHeight * 3 : window.innerWidth,
      ease: 0.05
    };

 this.touchStart = null;
    this.touchY = null;

    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);

    this.onWheel = this.onWheel.bind(this);
    this.onResize = this.onResize.bind(this);
    this.update = this.update.bind(this);

    this.recognitionAnimated = false;
    this.socialAnimated = false;
  }

  create() {
    super.create();
    this.setupPage();
    this.addEventListeners();
    this.createAnimations();
    this.update();
  }

  createAnimations() {
    // Initial loading animations
    const tl = GSAP.timeline({
      defaults: { ease: "power3.out" }
    });

    // Title Animation
    tl.fromTo(this.elements.title,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 }
    ).fromTo(this.elements.titleSpan,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.8"
    );

    // Description Typewriter Effect
    this.animateTypewriter(this.elements.description);

    // Service Items Animation
    this.elements.services.forEach((service, index) => {
      GSAP.fromTo(service,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2 * index,
          scrollTrigger: {
            trigger: service,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Add hover animations for services
    this.addServiceHoverEffects();
  }

  animateTypewriter(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = 1;

    let currentText = '';
    const typeSpeed = 30;

    const typeChar = (index) => {
      if (index < text.length) {
        currentText += text[index];
        element.textContent = currentText;
        setTimeout(() => typeChar(index + 1), typeSpeed);
      } else {
        // Add blinking cursor at the end
        element.style.borderRight = '2px solid #80ff00';
        setTimeout(() => {
          element.style.borderRight = 'none';
        }, 500);
      }
    };

    setTimeout(() => typeChar(0), 1000); // Start typing after title animation
  }

  addServiceHoverEffects() {
    this.elements.services.forEach(service => {
      const number = service.querySelector('.about__service__number');
      const title = service.querySelector('.about__service__title');

      service.addEventListener('mouseenter', () => {
        GSAP.to(number, {
          color: '#80ff00',
          duration: 0.3
        });
        GSAP.to(title, {
          color: '#80ff00',
          x: 10,
          duration: 0.3
        });
      });

      service.addEventListener('mouseleave', () => {
        GSAP.to(number, {
          color: 'rgba(255, 255, 255, 0.6)',
          duration: 0.3
        });
        GSAP.to(title, {
          color: '#FFFFFF',
          x: 0,
          duration: 0.3
        });
      });
    });
  }

  setupPage() { 
    this.scroll.current = 0;
    this.scroll.target = 0;
    this.scroll.limit = this.isMobile ? window.innerHeight * 3 : window.innerWidth;

    // Reset any ongoing animations
    GSAP.killTweensOf([
      this.elements.firstRight,
      this.elements.recognition,
      this.elements.social
    ]);

    if (this.isMobile) {
      // Mobile setup - vertical stacking
      GSAP.set([this.elements.firstRight, this.elements.recognition, this.elements.social], {
        y: "100%",
        x: 0
      });
    } else {
      // Desktop setup - horizontal sliding
      GSAP.set(this.elements.firstRight, {
        y: 0,
        x: 0
      });
      GSAP.set([this.elements.recognition, this.elements.social], {
        x: "100%",
        y: 0
      });
    }
  }

  update() {
    this.scroll.current = this.lerp(
      this.scroll.current,
      this.scroll.target,
      this.scroll.ease
    );

    if (this.scroll.current < 0.01) {
      this.scroll.current = 0;
    }

    const totalProgress = this.scroll.current / this.scroll.limit;

    if (this.isMobile) {
      this.updateMobileAnimations(totalProgress);
    } else {
      this.updateDesktopAnimations(totalProgress);
    }

    this.scroll.last = this.scroll.current;
    this.animationFrame = requestAnimationFrame(this.update.bind(this));
  }

  updateMobileAnimations(totalProgress) {
    const whatIdoProgress = Math.min(Math.max(totalProgress * 3, 0), 1);
    const recognitionProgress = Math.min(Math.max((totalProgress * 3) - 1, 0), 1);
    const socialProgress = Math.min(Math.max((totalProgress * 3) - 2, 0), 1);

    GSAP.set(this.elements.firstRight, {
      y: `${100 * (1 - whatIdoProgress)}%`,
      opacity: whatIdoProgress
    });

    GSAP.set(this.elements.recognition, {
      y: `${100 * (1 - recognitionProgress)}%`,
      opacity: recognitionProgress
    });

    GSAP.set(this.elements.social, {
      y: `${100 * (1 - socialProgress)}%`,
      opacity: socialProgress
    });

    // Trigger section animations
    if (recognitionProgress > 0.5 && !this.recognitionAnimated) {
      this.animateSection(this.elements.recognitionItems);
      this.recognitionAnimated = true;
    }

    if (socialProgress > 0.5 && !this.socialAnimated) {
      this.animateSection(this.elements.socialItems);
      this.socialAnimated = true;
    }
  }

  updateDesktopAnimations(totalProgress) {
    const recognitionProgress = Math.min(Math.max(totalProgress * 2, 0), 1);
    const socialProgress = Math.min(Math.max((totalProgress * 2) - 1, 0), 1);

    GSAP.set(this.elements.recognition, {
      x: `${100 * (1 - recognitionProgress)}%`,
      opacity: recognitionProgress
    });

    GSAP.set(this.elements.social, {
      x: `${100 * (1 - socialProgress)}%`,
      opacity: socialProgress
    });

    if (recognitionProgress > 0.5 && !this.recognitionAnimated) {
      this.animateSection(this.elements.recognitionItems);
      this.recognitionAnimated = true;
    }

    if (socialProgress > 0.5 && !this.socialAnimated) {
      this.animateSection(this.elements.socialItems);
      this.socialAnimated = true;
    }
  }

  animateSection(elements) {
    GSAP.fromTo(elements,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      }
    );
  }

  onWheel(event) {
    event.preventDefault();
    const normalized = this.normalizeWheel(event);
    const speed = normalized.pixelY;

    this.scroll.target = Math.min(
      Math.max(this.scroll.target + speed * 0.3, 0),
      this.scroll.limit
    );
  }

    onTouchStart(event) {
    this.touchStart = event.touches[0].clientY;
    console.log(event.touches)
    this.touchY = this.touchStart;
  }

  onTouchMove(event) {
    event.preventDefault();
    if (!this.touchStart) return;

    const currentY = event.touches[0].clientY;
    const diff = this.touchY - currentY;
    
    // Adjust sensitivity for mobile
    this.scroll.target = Math.min(
      Math.max(this.scroll.target + diff * 0.5, 0),
      this.scroll.limit
    );

    this.touchY = currentY;
  }

  onTouchEnd() {
    this.touchStart = null;
    this.touchY = null;
  }


  onResize() {
    const wasMotile = this.isMobile;
    this.isMobile = window.innerWidth <= 768; 
    console.log(this.isMobile)


    if (wasMotile !== this.isMobile) {
      this.setupPage();
    }

      if (this.isMobile) {
        this.element.addEventListener('touchstart', this.onTouchStart, { passive: false });
        this.element.addEventListener('touchmove', this.onTouchMove, { passive: false });
        this.element.addEventListener('touchend', this.onTouchEnd);
      } else {
        this.element.removeEventListener('touchstart', this.onTouchStart);
        this.element.removeEventListener('touchmove', this.onTouchMove);
        this.element.removeEventListener('touchend', this.onTouchEnd);
      }
  }

  normalizeWheel(event) {
    const PIXEL_STEP = 10;
    const LINE_HEIGHT = 40;
    const PAGE_HEIGHT = 800;

    let sX = 0, sY = 0,
      pX = 0, pY = 0;

    if ('detail' in event) {
      sY = event.detail;
    }
    if ('wheelDelta' in event) {
      sY = -event.wheelDelta / 120;
    }
    if ('wheelDeltaY' in event) {
      sY = -event.wheelDeltaY / 120;
    }
    if ('wheelDeltaX' in event) {
      sX = -event.wheelDeltaX / 120;
    }

    if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
      sX = sY;
      sY = 0;
    }

    pX = sX * PIXEL_STEP;
    pY = sY * PIXEL_STEP;

    if ('deltaY' in event) {
      pY = event.deltaY;
    }
    if ('deltaX' in event) {
      pX = event.deltaX;
    }

    if ((pX || pY) && event.deltaMode) {
      if (event.deltaMode === 1) {
        pX *= LINE_HEIGHT;
        pY *= LINE_HEIGHT;
      } else {
        pX *= PAGE_HEIGHT;
        pY *= PAGE_HEIGHT;
      }
    }

    if (pX && !sX) {
      sX = (pX < 1) ? -1 : 1;
    }
    if (pY && !sY) {
      sY = (pY < 1) ? -1 : 1;
    }

    return {
      spinX: sX,
      spinY: sY,
      pixelX: pX,
      pixelY: pY
    };
  }

  lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  addEventListeners() {
    window.addEventListener('wheel', this.onWheel, { passive: false });
    window.addEventListener('resize', this.onResize);

     if (this.isMobile) {
      this.element.addEventListener('touchstart', this.onTouchStart, { passive: false });
      this.element.addEventListener('touchmove', this.onTouchMove, { passive: false });
      this.element.addEventListener('touchend', this.onTouchEnd);
    }
  }

  removeEventListeners() {
    window.removeEventListener('wheel', this.onWheel);
    window.removeEventListener('resize', this.onResize);

     if (this.isMobile) {
      this.element.removeEventListener('touchstart', this.onTouchStart);
      this.element.removeEventListener('touchmove', this.onTouchMove);
      this.element.removeEventListener('touchend', this.onTouchEnd);
    }
  }

  destroy() {
    this.removeEventListeners();

    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    super.destroy();
  }
}