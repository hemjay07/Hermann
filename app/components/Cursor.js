export default class Cursor {
  constructor() {
    this.template = document.querySelector('.content').getAttribute('data-template');
    this.createCursor();
  }

  createCursor() {
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    // Basic cursor movement for all pages
    window.addEventListener("mousemove", function (e) {
      const x = e.clientX;
      const y = e.clientY;

      cursorDot.style.left = `${x}px`;
      cursorDot.style.top = `${y}px`;

      cursorOutline.animate(
        {
          left: `${x}px`,
          top: `${y}px`,
        },
        { duration: 500, fill: "forwards" }
      );
    });

    if (this.template === 'home') {
      document.querySelectorAll("img").forEach((img) => {
        img.addEventListener("mouseenter", (e) => {
          const cursor = document.querySelector(".cursor-outline");
          cursor.classList.add("image-hover");
          cursor.setAttribute("data-label", e.target.alt);
          cursor.style.backgroundColor = "hsl(78, 100%, 90%, 0.6);";
        });

        img.addEventListener("mouseleave", () => {
          const cursor = document.querySelector(".cursor-outline");
          cursor.classList.remove("image-hover");
        });
      });
    } else {
      // Explicitly remove cursor label functionality for non-home pages
      const cursor = document.querySelector(".cursor-outline");
      if (cursor) {
        cursor.classList.remove("image-hover");
        cursor.removeAttribute("data-label");
        cursor.style.backgroundColor = "";
      }

      // Remove any existing event listeners on images
      document.querySelectorAll("img").forEach((img) => {
        img.removeEventListener("mouseenter", () => { });
        img.removeEventListener("mouseleave", () => { });
      });
    }
  }
}