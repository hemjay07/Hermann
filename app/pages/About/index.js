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
        recognitionItems: ".about__recognition__item",
        socialItems: ".about__social__item"
      }
    });

    // Initialize scroll configuration
    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      limit: 0,
      ease: 0.05
    };

    // Bind methods
    this.onWheel = this.onWheel.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);

    // Track animation states
    this.recognitionAnimated = false;
    this.socialAnimated = false;
    this.isMobile = window.innerWidth <= 1024;
  }

  create() {
    super.create();
    this.setupPage();
    this.addEventListeners();
    this.createAnimations();
    this.update();
  }

  createAnimations() {
    const tl = GSAP.timeline({
      defaults: { ease: "power3.out" }
    });

    // Animate title
    tl.fromTo(this.elements.title,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 }
    ).fromTo(this.elements.titleSpan,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.8"
    );

    // Only set initial states for services in mobile view
    if (this.isMobile) {
      this.elements.services.forEach(service => {
        GSAP.set(service, { y: 20, opacity: 0 });
      });
    }

    this.elements.services.forEach(service => {
      this.addServiceHoverEffect(service);
    });

    this.animateTypewriter(this.elements.description);
  }

  addServiceHoverEffect(service) {
    const number = service.querySelector('.about__service__number');
    const title = service.querySelector('.about__service__title');
    
    service.addEventListener('mouseenter', () => {
      GSAP.to(number, { color: '#80ff00', duration: 0.3 });
      GSAP.to(title, { color: '#80ff00', x: 10, duration: 0.3 });
    });

    service.addEventListener('mouseleave', () => {
      GSAP.to(number, { color: 'rgba(255, 255, 255, 0.6)', duration: 0.3 });
      GSAP.to(title, { color: '#FFFFFF', x: 0, duration: 0.3 });
    });
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
      }
    };

    setTimeout(() => typeChar(0), 1000);
  }

  setupPage() {
    this.scroll = {
      ...this.scroll,
      current: 0,
      target: 0,
      limit: this.isMobile ? window.innerHeight * 3 : window.innerWidth
    };

    if (this.isMobile) {
      GSAP.set(this.elements.firstRight, { y: "100%", x: 0 ,      clearProps: "translate,rotate,scale,transform,opacity" // Added opacity
});
      GSAP.set([this.elements.recognition, this.elements.social], { y: "100%", x: 0 });
    } else {
      GSAP.set(this.elements.firstRight, { y: 0, x: 0 });
      GSAP.set([this.elements.recognition, this.elements.social], { y: 0, x: "100%" });
    }
  }

  update() {
    this.scroll.current = this.lerp(
      this.scroll.current,
      this.scroll.target,
      this.scroll.ease
    );

    this.scroll.current = Math.max(0, Math.min(this.scroll.current, this.scroll.limit));
    
    const totalProgress = this.scroll.current / this.scroll.limit;
    
    this.isMobile ? 
      this.updateMobileAnimations(totalProgress) : 
      this.updateDesktopAnimations(totalProgress);

    this.scroll.last = this.scroll.current;
    this.animationFrame = requestAnimationFrame(this.update.bind(this));
  }

  updateDesktopAnimations(totalProgress) {
    const recognitionProgress = Math.min(Math.max(totalProgress * 2, 0), 1);
    const socialProgress = Math.min(Math.max((totalProgress * 2) - 1, 0), 1);

    GSAP.set(this.elements.firstRight, {
      
      opacity: 1
    }); 
    
    GSAP.set(this.elements.recognition, {
      x: `${100 * (1 - recognitionProgress)}%`,
      opacity: recognitionProgress
    });

    GSAP.set(this.elements.social, {
      x: `${100 * (1 - socialProgress)}%`,
      opacity: socialProgress
    });

    // this.triggerSectionAnimations(recognitionProgress, socialProgress);
  }

  updateMobileAnimations(totalProgress) {
    const servicesProgress = Math.min(Math.max(totalProgress * 3, 0), 1);
    const recognitionProgress = Math.min(Math.max((totalProgress * 3) - 1, 0), 1);
    const socialProgress = Math.min(Math.max((totalProgress * 3) - 2, 0), 1);

    // Only animate services in mobile view
    this.elements.services.forEach((service, index) => {
      const delay = index * 0.1;
      const serviceProgress = Math.max(0, Math.min(1, (servicesProgress - delay) * 2));
      
      GSAP.to(service, {
        y: serviceProgress * -20,
        opacity: serviceProgress,
        duration: 0.3
      });
    });

    GSAP.set(this.elements.firstRight, {
      y: `${100 * (1 - servicesProgress)}%`,
      opacity: servicesProgress
    });

    GSAP.set(this.elements.recognition, {
      y: `${100 * (1 - recognitionProgress)}%`,
      opacity: recognitionProgress
    });

    GSAP.set(this.elements.social, {
      y: `${100 * (1 - socialProgress)}%`,
      opacity: socialProgress
    });

    // this.triggerSectionAnimations(recognitionProgress, socialProgress);
  }

  triggerSectionAnimations(recognitionProgress, socialProgress) {
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
      {opacity: 0 },
      {
        
        opacity: 1,
      
        stagger: 0.1,
      }
    );
  }

  onWheel(event) {
    event.preventDefault();
    this.scroll.target = Math.min(
      Math.max(this.scroll.target + event.deltaY * 0.3, 0),
      this.scroll.limit
    );
  }

  onTouchStart(event) {
    this.touchStart = event.touches[0].clientY;
    this.touchY = this.touchStart;
  }

  onTouchMove(event) {
    event.preventDefault();
    if (!this.touchStart) return;

    const currentY = event.touches[0].clientY;
    const diff = this.touchY - currentY;
    
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
    this.isMobile = window.innerWidth <= 1024;

    if (wasMotile !== this.isMobile) {
      this.setupPage();
      this.updateTouchListeners();
    }
  }

  updateTouchListeners() {
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

  lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  addEventListeners() {
    window.addEventListener('wheel', this.onWheel, { passive: false });
    window.addEventListener('resize', this.onResize);
    this.updateTouchListeners();
  }

  removeEventListeners() {
    window.removeEventListener('wheel', this.onWheel);
    window.removeEventListener('resize', this.onResize);
    this.element.removeEventListener('touchstart', this.onTouchStart);
    this.element.removeEventListener('touchmove', this.onTouchMove);
    this.element.removeEventListener('touchend', this.onTouchEnd);
  }

  destroy() {
    this.removeEventListeners();
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    super.destroy();
  }
}