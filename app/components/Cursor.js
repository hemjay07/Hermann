export default class Cursor {
  constructor() {
    this.template = document.querySelector('.content').getAttribute('data-template');
    
    // Store event listener references for cleanup
    this.mouseMoveHandler = this.handleMouseMove.bind(this);
    
    this.cursorDot = document.querySelector(".cursor-dot");
    this.cursorOutline = document.querySelector(".cursor-outline");
    
    this.createCursor();
  }

  handleMouseMove(e) {
    const x = e.clientX;
    const y = e.clientY;

    this.cursorDot.style.left = `${x}px`;
    this.cursorDot.style.top = `${y}px`;

    this.cursorOutline.animate(
      {
        left: `${x}px`,
        top: `${y}px`,
      },
      { duration: 500, fill: "forwards" }
    );
  }

  handleImageEnter(e) {
        this.cursorOutline.classList.add("image-hover");

      const img = e.target.querySelector('img');
    if (img) {
      console.log(img.alt);
      this.cursorOutline.setAttribute("data-label", img.alt);
    }
    this.cursorOutline.style.backgroundColor = "hsl(78, 100%, 90%, 0.6);";
  }

  handleImageLeave() {
    this.cursorOutline.classList.remove("image-hover");
  }

   createCursor() {
    window.addEventListener("mousemove", this.mouseMoveHandler);

    if (this.template === 'home') {
      this.imageEnterHandler = this.handleImageEnter.bind(this);
      this.imageLeaveHandler = this.handleImageLeave.bind(this);

      // Find all gallery image links
      document.querySelectorAll(".gallery_link").forEach((link) => {
        link.addEventListener("mouseenter", this.imageEnterHandler);
        link.addEventListener("mouseleave", this.imageLeaveHandler);
      });
    } else {
      if (this.cursorOutline) {
        this.cursorOutline.classList.remove("image-hover");
        this.cursorOutline.removeAttribute("data-label");
        this.cursorOutline.style.backgroundColor = "";
      }
    }
  }
  destroy() {
    window.removeEventListener("mousemove", this.mouseMoveHandler);

    if (this.imageEnterHandler && this.imageLeaveHandler) {
      // Make sure to remove listeners from gallery links specifically
      document.querySelectorAll(".gallery_link").forEach((link) => {
        link.removeEventListener("mouseenter", this.imageEnterHandler);
        link.removeEventListener("mouseleave", this.imageLeaveHandler);
      });
    }

    if (this.cursorOutline) {
      this.cursorOutline.classList.remove("image-hover");
      this.cursorOutline.removeAttribute("data-label");
      this.cursorOutline.style.backgroundColor = "";
    }
  }
}