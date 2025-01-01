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
    this.cursorOutline.setAttribute("data-label", e.target.alt);
    this.cursorOutline.style.backgroundColor = "hsl(78, 100%, 90%, 0.6);";
  }

  handleImageLeave() {
    this.cursorOutline.classList.remove("image-hover");
  }

  createCursor() {
    // Add main cursor movement
    window.addEventListener("mousemove", this.mouseMoveHandler);

    if (this.template === 'home') {
      // Store references to bound event handlers
      this.imageEnterHandler = this.handleImageEnter.bind(this);
      this.imageLeaveHandler = this.handleImageLeave.bind(this);

      document.querySelectorAll("img").forEach((img) => {
        img.addEventListener("mouseenter", this.imageEnterHandler);
        img.addEventListener("mouseleave", this.imageLeaveHandler);
      });
    } else {
      // Reset cursor state for non-home pages
      if (this.cursorOutline) {
        this.cursorOutline.classList.remove("image-hover");
        this.cursorOutline.removeAttribute("data-label");
        this.cursorOutline.style.backgroundColor = "";
      }
    }
  }

  destroy() {
    // Remove main mousemove listener
    window.removeEventListener("mousemove", this.mouseMoveHandler);

    // Remove image event listeners if they exist
    if (this.imageEnterHandler && this.imageLeaveHandler) {
      document.querySelectorAll("img").forEach((img) => {
        img.removeEventListener("mouseenter", this.imageEnterHandler);
        img.removeEventListener("mouseleave", this.imageLeaveHandler);
      });
    }

    // Reset cursor state
    if (this.cursorOutline) {
      this.cursorOutline.classList.remove("image-hover");
      this.cursorOutline.removeAttribute("data-label");
      this.cursorOutline.style.backgroundColor = "";
    }
  }
}