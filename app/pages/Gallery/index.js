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
                previewBackground: ".preview__background",
                transitionContainer: ".page-transition",
                transitionLayers: ".page-transition__layer",
                content: ".gallery__content",
                prevButton: ".gallery__nav--prev",
                nextButton: ".gallery__nav--next"
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

        // Get navigation data from DOM
        this.navigation = {
            prev: {
                url: this.element.dataset.prevGallery,
                name: this.element.dataset.prevName
            },
            next: {
                url: this.element.dataset.nextGallery,
                name: this.element.dataset.nextName
            }
        };

        this.setupGallery();
        this.addEventListeners();
    }


    // Override the show method to use our custom animation
    show() {
        const revealAnimation = this.createEnterAnimation();
        return super.show(revealAnimation);
    }

    createEnterAnimation() {
        const timeline = GSAP.timeline();

        timeline.set(this.element, {
            autoAlpha: 1
        });

        timeline.fromTo(this.elements.content,
            {
                autoAlpha: 0,
                x: '-30px'  // More subtle movement
            },
            {
                duration: 0.8,  // Longer duration for smoother effect
                autoAlpha: 1,
                x: '0',
                ease: "power3.out",
                            clearProps: "all"  

            }
        );

        // Stagger the grid items with adjusted timing
        timeline.from(this.elements.gridItems, {
            duration: 1,  // Slightly longer duration
            autoAlpha: 0,
            scale: 0.85,  // More subtle scale
            stagger: {
                amount: 0.4,  // Slightly quicker stagger
                from: "start"
            },
            ease: "power2.out",
                        clearProps: "all" 

        }, "-=0.6");  // Overlap more with previous animation

        return timeline;
    }
    
    onPrevClick(event) {
        console.log("prev Clicked")
        event.preventDefault();
        if (!this.navigation.prev.url || this.state.isPreviewOpen) return;

        // Instead of creating and playing a timeline, just call the navigation animation
        this.createNavigationAnimation('prev');
    }

    onNextClick(event) {
        console.log("next clicked")
        event.preventDefault();
        if (!this.navigation.next.url || this.state.isPreviewOpen) return;

        // Instead of creating and playing a timeline, just call the navigation animation
        this.createNavigationAnimation('next');
    }

    createNavigationAnimation(direction) {
        if (!this.elements.transitionContainer) {
            console.warn('Transition elements not found');
            return;
        }

        const container = this.elements.transitionContainer;
        const timeline = GSAP.timeline();

        // Remove existing classes first
        container.classList.remove('is-animating', 'is-animating-prev', 'is-animating-next');

        // Setup and start animation
        timeline
            .set(container, {
                display: 'block',
                onComplete: () => {
                    // Add new animation classes
                    container.classList.add('is-animating', `is-animating-${direction}`);
                }
            })
            .call(() => {
                // Change page at midpoint
                const url = direction === 'next' ?
                    this.navigation.next.url :
                    this.navigation.prev.url;
                window.app.onChange({ url });
            }, null, 0.2) 
            .call(() => {
                // Cleanup
                if (container) {
                    container.style.display = 'none';
                    container.classList.remove('is-animating', `is-animating-${direction}`);
                }
            }, null, 1.5); 

        return timeline;
    }
    setupGallery() {
        this.elements.preview.innerHTML = `
        <div class="preview__background"></div>
        <div class="preview__content">
            <div class="preview__image-container">

            
                <button class="preview__close" aria-label="Close preview">
                    <svg viewBox="0 0 24 24" class="icon-close">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </button>
            </div>
        </div>
    `;

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

        if (this.elements.prevButton) {
            this.elements.prevButton.addEventListener('click', this.onPrevClick.bind(this));
        }
        if (this.elements.nextButton) {
            this.elements.nextButton.addEventListener('click', this.onNextClick.bind(this));
        }
    }

 

    openPreview(gridItem) {
        this.state.isPreviewOpen = true;
        this.element.classList.add('no-scroll')
        this.elements.preview.classList.add('preview--open');

        // Hide navigation elements with GSAP
        const mainNav = document.querySelector('.navigation');
        const galleryNav = document.querySelector('.gallery__navigation');

        GSAP.to([mainNav, galleryNav], {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => {
                if (mainNav) mainNav.style.pointerEvents = 'none';
                if (galleryNav) galleryNav.style.pointerEvents = 'none';
            }
        });

        this.state.currentItem = gridItem;

        const img = gridItem.querySelector("img");
        this.currentImage = img;
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
  const timeline = GSAP.timeline({
        onComplete: () => {
            // Load full size image after animation completes
            const fullImage = new Image();
            fullImage.src = img.dataset.full;
            fullImage.onload = () => {
                if (this.state.isPreviewOpen) { // Check if still open
                    clone.src = img.dataset.full;
                }
            };
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
                reverseEase: false
            }, 0)
            .to(this.elements.previewBackground, {
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                reverseEase: false
            }, 0.2);

        // Animate other images out with stagger
        otherImages.forEach((item, index) => {
            timeline.to(item, {
                x: translateOutX,
                y: 0,
                scale: 0.5,
                opacity: 0,
                duration: 0.8,
                ease: "expo.inOut",
                delay: index * 0.02,
                reverseEase: false
            }, 0);
        });

        this.state.timeline = timeline;
    }

    closePreview() {
        if (!this.state.isPreviewOpen || !this.state.timeline) return;

        this.element.classList.remove('no-scroll')
        this.elements.preview.classList.remove('preview--open');

        // Show navigation elements with GSAP
        const mainNav = document.querySelector('.navigation');
        const galleryNav = document.querySelector('.gallery__navigation');

        // Reset pointer-events first so they're ready when visible
        if (mainNav) mainNav.style.pointerEvents = '';
        if (galleryNav) galleryNav.style.pointerEvents = '';

        GSAP.to([mainNav, galleryNav], {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out'
        });


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