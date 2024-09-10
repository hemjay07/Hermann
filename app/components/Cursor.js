export default class Cursor {
  constructor() {
    this.createCursor();
  }

  createCursor() {
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");
    window.addEventListener("mousemove", function (e) {
      const x = e.clientX;
      const y = e.clientY;

      cursorDot.style.left = `${x}px`;
      cursorDot.style.top = `${y}px`;
      // cursorOutline.style.left = `${x}px`;
      // cursorOutline.style.top = `${y}px`;

      cursorOutline.animate(
        {
          left: `${x}px`,
          top: `${y}px`,
        },
        { duration: 500, fill: "forwards" }
      );
    });

    document.querySelectorAll("img").forEach((img) => {
      img.addEventListener("mouseenter", (e) => {
        const cursor = document.querySelector(".cursor-outline");
        // Add a class to show the label and update its text
        cursor.classList.add("image-hover");
        cursor.setAttribute("data-label", e.target.alt);
        cursor.style.backgroundColor = "hsl(78, 100%, 90%, 0.6);";
      });

      img.addEventListener("mouseleave", () => {
        const cursor = document.querySelector(".cursor-outline");
        // Remove the class to hide the label
        cursor.classList.remove("image-hover");
      });
    });
  }
}
