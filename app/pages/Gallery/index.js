import Page from "classes/Page.js";
import _ from "lodash";
import GSAP from "gsap";

export default class Gallery extends Page {
    constructor() {
        super({
            id: "gallery",
            element: ".gallery",
            elements: {
                grid: ".grid",
                preview: ".preview",
                gridItems: ".grid_item",
                previewImage: ".preview__image",
                previewClose: ".preview__close",
                previewBackground: ".preview__background"
            },
        });

        this.state = {
            isPreviewOpen: false,
            currentItem: null,
            timeline: null
        };
    }

    create() {
        super.create();
        this.setupGallery();
        this.addEventListeners();
    }

    setupGallery() {
        this.elements.preview.innerHTML = `
            <div class="preview__background"></div>
            <div class="preview__content">
                <button class="preview__close">×</button>
                <div class="preview__image-container"></div>
            </div>
        `;

        // Store the background element
        this.elements.previewBackground = this.elements.preview.querySelector('.preview__background');
    }

    addEventListeners() {
        const gridItems = this.elements.grid.querySelectorAll(".grid_item");

        gridItems.forEach(item => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                if (!this.state.isPreviewOpen) {
                    this.openPreview(item);
                }
            });
        });

        this.elements.preview.querySelector('.preview__close').addEventListener("click", () => {
            if (this.state.isPreviewOpen) {
                this.closePreview();
            }
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.state.isPreviewOpen) {
                this.closePreview();
            }
        });
    }

    openPreview(gridItem) {
        this.state.isPreviewOpen = true;
        this.state.currentItem = gridItem;

        const img = gridItem.querySelector("img");
        this.currentImage = img
        const imgBounds = img.getBoundingClientRect();
        const previewContainer = this.elements.preview.querySelector('.preview__image-container');

        // Create clone for transition
        const clone = img.cloneNode(true);
        clone.className = 'preview__transition-image';
        clone.style.position = 'fixed';
        clone.style.left = `${imgBounds.left}px`;
        clone.style.top = `${imgBounds.top}px`;
        clone.style.width = `${imgBounds.width}px`;
        clone.style.height = `${imgBounds.height}px`;
        clone.style.objectFit = 'cover';
        clone.style.transition = 'none';
        previewContainer.appendChild(clone);

        // Calculate viewport and target dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const maxTargetWidth = viewportWidth * 0.9;
        const maxTargetHeight = viewportHeight * 0.9;

        // Calculate dimensions maintaining aspect ratio
        const imageAspectRatio = imgBounds.width / imgBounds.height;
        let finalWidth, finalHeight;

        if (imageAspectRatio > maxTargetWidth / maxTargetHeight) {
            finalWidth = maxTargetWidth;
            finalHeight = maxTargetWidth / imageAspectRatio;
        } else {
            finalHeight = maxTargetHeight;
            finalWidth = maxTargetHeight * imageAspectRatio;
        }

        // Calculate translations for centering
        const viewportCenterX = viewportWidth / 2;
        const viewportCenterY = viewportHeight / 2;
        const imageCenterX = imgBounds.left + (imgBounds.width / 2);
        const imageCenterY = imgBounds.top + (imgBounds.height / 2);
        const translateX = viewportCenterX - imageCenterX;
        const translateY = viewportCenterY - imageCenterY;
        const scaledOffsetX = (finalWidth - imgBounds.width) / 2;
        const scaledOffsetY = (finalHeight - imgBounds.height) / 2;

        // Show preview container but keep background initially transparent
        this.elements.preview.style.display = 'block';
        GSAP.set(this.elements.previewBackground, { opacity: 0 });
        GSAP.set(img, { opacity: 0 });
        

        // Create timeline for the animation
        const timeline = GSAP.timeline({
            onComplete: () => {
                if (img.dataset.large) {
                    const highResImage = new Image();
                    highResImage.src = img.dataset.large;
                    highResImage.onload = () => {
                        clone.src = img.dataset.large;
                    };
                }

            }
        });

        // Get all other images
        const otherImages = [...this.elements.grid.querySelectorAll(".grid_item")]
            .filter(item => item !== gridItem);

        // Determine exit direction based on image position
        const isLeft = imageCenterX < viewportWidth / 2;
        const translateOutX = isLeft ? -viewportWidth : viewportWidth;

        // Start all animations at the same time with different durations
        timeline
            .to(clone, {
                x: translateX - scaledOffsetX,
                y: translateY - scaledOffsetY,
                width: finalWidth,
                height: finalHeight,
                duration: 1.2,
                ease: "expo.inOut",
                     reverseEase: false  // Makes it use power2.in when reversing

            }, 0)
            .to(this.elements.previewBackground, {
                opacity: 1,
                duration: 1,
                ease: "power2.out",        reverseEase: false  // Makes it use power2.in when reversing

            }, 0.2) // Start background fade slightly after the movement begins

        // Animate other images out with stagger
        otherImages.forEach((item, index) => {
            timeline.to(item, {
                x: translateOutX,
                y: 0,
                scale: 0.5,
                opacity: 0,
                duration: 0.8,
                ease: "expo.inOut",
                delay: index * 0.02, reverseEase: false
            }, 0); // Start at the same time as clone movement
        });

        this.state.timeline = timeline;
    }

    closePreview() {
        if (!this.state.isPreviewOpen || !this.state.timeline) return;

        // this.state.timeline.timeScale(1.5); // Makes the reverse animation 1.5x faster

        
        // Simply reverse the timeline
        this.state.timeline.reverse();


        // Clean up after the reverse animation completes
        this.state.timeline.eventCallback("onReverseComplete", () => {
                    GSAP.set(this.currentImage, { opacity: 1 });

            const clone = this.elements.preview.querySelector('.preview__transition-image');
            if (clone) clone.remove();
            this.elements.preview.style.display = 'none';
            this.state.isPreviewOpen = false;
            this.state.currentItem = null;
            this.state.timeline = null;

            // Reset any transforms on grid items
            const gridItems = this.elements.grid.querySelectorAll(".grid_item");
            gridItems.forEach(item => {
                GSAP.set(item, {
                    clearProps: "all"
                });
            });
        });
    }
    destroy() {
        super.destroy();
        if (this.state.timeline) {
            this.state.timeline.kill();
        }
        window.removeEventListener('keydown', this.handleKeyDown);
    }
}