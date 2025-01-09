import GSAP from "gsap";
import Component from "classes/Components.js";

export default class Navigation extends Component {
  constructor({ template }) {
    super({
      element: ".navigation",
      elements: {
        button: ".navigation__button",
        buttonCircle: ".navigation__button-circle",
        buttonIcon: ".navigation__button-icon",
        buttonSpans: ".navigation__button-icon span",
        menuWrapper: ".navigation__menu-wrapper",
        menuBackground: ".navigation__menu-background",
        menuItems: ".navigation__menu-list-item",
        menuLinks: ".navigation__menu-list-item",
        overlay: ".navigation__overlay",
      },
    });

    this.template = template;
    this.isMenuOpen = false;
    this.magneticRadius = 100;
    this.isAnimating = false;

    this.initializeState();
    this.addEventListeners();
  }

  initializeState() {
    if (this.elements.menuWrapper) {
      this.elements.menuWrapper.style.visibility = "hidden";
    }
    if (this.elements.menuBackground) {
      GSAP.set(this.elements.menuBackground, {
        scaleX: 0,
        borderTopLeftRadius: "100vw",
        borderBottomLeftRadius: "100vw",
      });
    }
    if (this.elements.menuItems) {
      GSAP.set(this.elements.menuItems, {
        y: 50,
        opacity: 0,
      });
    }
    if (this.elements.button) {
      GSAP.set(this.elements.button, {
        color: "hsl(78 100% 15% / 1)",
      });
    }
  }

  addEventListeners() {
    window.addEventListener("mousemove", this.onMouseMove.bind(this));
    if (this.elements.button) {
      this.elements.button.addEventListener(
        "click",
        this.onButtonClick.bind(this)
      );
      this.elements.button.addEventListener(
        "mouseenter",
        this.onButtonEnter.bind(this)
      );
      this.elements.button.addEventListener(
        "mouseleave",
        this.onButtonLeave.bind(this)
      );
    }
    if (this.elements.menuLinks) {
      this.elements.menuLinks.forEach((link) => {
        link.addEventListener("click", this.onMenuLinkClick.bind(this));
      });
    }
    if (this.elements.overlay) {
      this.elements.overlay.addEventListener(
        "click",
        this.onOverlayClick.bind(this)
      );
    }
  }

  onButtonEnter() {
    if (!this.isMenuOpen) {
      GSAP.to(this.elements.buttonCircle, {
        scale: 1.1,
        duration: 0.3,
      });

      GSAP.to(this.elements.buttonCircle.querySelector("circle"), {
        fill: "hsl(90, 100%, 50%)",
        duration: 0.3,
      });
    }
  }

  onButtonLeave() {
    if (!this.isMenuOpen) {
      GSAP.to(this.elements.buttonCircle, {
        scale: 1,
        duration: 0.3,
      });

      GSAP.to(this.elements.buttonCircle.querySelector("circle"), {
        fill: "hsl(78 100% 15% / 1)",
        duration: 0.3,
      });
    }
  }

  onMenuLinkClick(event) {
    if (this.isMenuOpen) {
      this.closeMenu();
    }
  }

  onOverlayClick(event) {
    if (this.isMenuOpen && !this.isAnimating) {
      this.closeMenu();
    }
  }

  onMouseMove(event) {
    if (!this.elements.button || !this.elements.buttonCircle) return;

    const rect = this.elements.button.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    const distanceX = event.clientX - buttonCenterX;
    const distanceY = event.clientY - buttonCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < this.magneticRadius) {
      const strengthX = (distanceX / this.magneticRadius) * 20;
      const strengthY = (distanceY / this.magneticRadius) * 20;

      GSAP.to(this.elements.buttonCircle, {
        x: strengthX,
        y: strengthY,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      GSAP.to(this.elements.buttonCircle, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }

  onButtonClick() {
    if (!this.isAnimating) {
      console.log("button clicked");
      this.isAnimating = true;
      if (this.isMenuOpen) {
        this.closeMenu();
      } else {
        this.openMenu();
      }
    }
  }

  openMenu() {
    this.elements.menuWrapper.style.visibility = "visible";
    this.elements.overlay.classList.add("is-active");
    this.elements.button.classList.add("is-active");

    GSAP.to(this.elements.buttonCircle.querySelector("circle"), {
      fill: "hsl(90, 100%, 50%)",
      duration: 0.3,
    });

    const timeline = GSAP.timeline({
      onComplete: () => {
        this.isMenuOpen = true;
        this.isAnimating = false;
      },
    });

    // Animate burger to cross
    const [top, middle, bottom] = this.elements.buttonSpans;
    timeline.to(
      top,
      {
        rotate: 45,
        y: 11,
        duration: 0.5,
        ease: "power2.inOut",
      },
      0
    );

    timeline.to(
      middle,
      {
        scaleX: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      },
      0
    );

    timeline.to(
      bottom,
      {
        rotate: -45,
        y: -11,
        duration: 0.5,
        ease: "power2.inOut",
      },
      0
    );

    // Slide in menu background
    timeline.to(
      this.elements.menuBackground,
      {
        scaleX: 1,
        borderTopLeftRadius: "0",
        borderBottomLeftRadius: "0",
        duration: 0.8,
        ease: "power3.inOut",
      },
      0
    );

    // Stagger menu items
    timeline.to(
      this.elements.menuItems,
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.4"
    );
  }

  closeMenu() {
    const timeline = GSAP.timeline({
      onComplete: () => {
        this.isMenuOpen = false;
        this.isAnimating = false;
        this.elements.menuWrapper.style.visibility = "hidden";
        this.elements.overlay.classList.remove("is-active");
        this.elements.button.classList.remove("is-active");

        if (!this.elements.button.matches(":hover")) {
          GSAP.to(this.elements.buttonCircle.querySelector("circle"), {
            fill: "hsl(78 100% 15% / 1)",
            duration: 0.3,
          });
        }
      },
    });

    // Remove the overlay immediately
    this.elements.overlay.classList.remove("is-active");

    // Hide menu items first
    timeline.to(
      this.elements.menuItems,
      {
        y: -50,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.in",
        clearProps: "transform",
      },
      0
    );

    // Animate cross back to burger
    const [top, middle, bottom] = this.elements.buttonSpans;
    timeline.to(
      [top, bottom],
      {
        rotate: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.inOut",
      },
      0
    );

    timeline.to(
      middle,
      {
        scaleX: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
      },
      0
    );

    // Slide out menu background
    timeline.to(
      this.elements.menuBackground,
      {
        scaleX: 0,
        borderTopLeftRadius: "100vw",
        borderBottomLeftRadius: "100vw",
        duration: 0.8,
        ease: "power3.inOut",
      },
      0.2
    );
  }

  removeEventListeners() {
    window.removeEventListener("mousemove", this.onMouseMove);
    if (this.elements.button) {
      this.elements.button.removeEventListener("click", this.onButtonClick);
      this.elements.button.removeEventListener(
        "mouseenter",
        this.onButtonEnter
      );
      this.elements.button.removeEventListener(
        "mouseleave",
        this.onButtonLeave
      );
    }
    if (this.elements.menuLinks) {
      this.elements.menuLinks.forEach((link) => {
        link.removeEventListener("click", this.onMenuLinkClick);
      });
    }
    if (this.elements.overlay) {
      this.elements.overlay.removeEventListener("click", this.onOverlayClick);
    }
  }

  destroy() {
    this.removeEventListeners();
  }
}
