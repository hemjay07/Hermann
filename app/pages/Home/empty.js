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

    // Base rotation from auto-rotate
    this.baseRotation = 0;
    // Additional rotation from scroll
    this.scrollRotation = 0;
    this.autoRotateSpeed = 360 / 42; // Full rotation in 42 seconds
    this.lastTime = performance.now();
  }

  startRotationLoop() {
    const animate = (currentTime) => {
      // Calculate time elapsed since last frame
      const deltaTime = (currentTime - this.lastTime) / 1000;
      this.lastTime = currentTime;

      // Update auto-rotation
      this.baseRotation += this.autoRotateSpeed * deltaTime;

      // Smoothly decay scroll rotation
      this.scrollRotation *= 0.95; // Adjust this value to control how quickly scroll effect fades

      // Combined rotation
      const totalRotation = this.baseRotation + this.scrollRotation;

      // Apply rotation
      GSAP.set(this.elements.slider, {
        rotateX: -16,
        rotateY: totalRotation
      });

      // Update synchronized elements using total rotation
      this.updateDetailsAndIndicators(totalRotation);

      this.rotationFrame = requestAnimationFrame(animate);
    };

    this.rotationFrame = requestAnimationFrame(animate);
  }

  onWheel(event) {
    event.preventDefault();
    // Add to scroll rotation instead of replacing
    this.scrollRotation += event.deltaY * 0.5;
  }

  updateDetailsAndIndicators(rotation) {
    const normalizedRotation = ((rotation % 360) + 360) % 360;
    const activeIndex = Math.floor((normalizedRotation / 360) * 6);
    
    // Update details and indicators as before...
  }

  // Rest of the class remains the same...
}