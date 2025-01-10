# Hermann Portfolio

> A modern, interactive portfolio showcasing Hermann's work through an immersive user experience.

## Motivation
A dynamic portfolio built to provide an engaging user experience with smooth transitions and interactive galleries, while maintaining optimal performance through server-side caching and modern web technologies.

## Overview
The portfolio features seamless page transitions, interactive gallery views, and responsive image previews. Built with vanilla JavaScript and GSAP animations, it demonstrates the power of modern web technologies without relying on heavy frameworks.

## Preview<img width="1440" alt="Screenshot 2025-01-10 at 5 46 22 PM" src="https://github.com/user-attachments/assets/7b04abb5-87c3-4534-8463-82fecb7ac23f" />

## Links
- Live Site URL: [hermann-art.com]()
- Repository: [https://github.com/hemjay07/Hermann]()

## Development Setup
1. Clone the repo
```bash
git clone https://github.com/yourusername/hermann-portfolio.git
cd hermann-portfolio
```

2. Install the dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
PRISMIC_ENDPOINT=your_prismic_endpoint
PRISMIC_ACCESS_TOKEN=your_prismic_access_token
```

4. Run the development server:
```bash
npm run dev
```

5. Navigate to [http://localhost:3000](http://localhost:3000)

## Built with
- Express.js - Backend server
- GSAP - Animations
- Prismic - Headless CMS
- Pug - Template engine
- Lodash - Utility functions
- Node-cache - Server-side caching

## What I learned
- Implemented complex animations using GSAP
- Managed state in vanilla JavaScript
- Built a custom page transition system
- Integrated headless CMS with server-side rendering
- Implemented efficient caching strategies

## Continued development
- Implement image lazy loading
- Add image optimization pipeline
- Integrate analytics
- Add search functionality
- Implement client-side caching

## Key Features

### Page Transitions
- Custom transition system using GSAP
- History API integration
- Preloader for smooth content loading

### Gallery System
- Interactive image preview with zoom
- Smooth state transitions
- Keyboard navigation
- Responsive grid layout

### Performance
- Server-side caching
- API retry mechanism
- Optimized image loading
- Resource preloading

## Takeaways/Lessons learned
- Proper state management is crucial even in vanilla JS applications
- Server-side caching significantly improves CMS-driven content delivery
- GSAP provides powerful tools for complex animations
- Careful planning of gallery interactions improves user experience

## Useful resources
- [GSAP Documentation](https://greensock.com/docs/)
- [Prismic Developer Documentation](https://prismic.io/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)

## Acknowledgments
Special thanks to Hermann for providing the photography content and creative direction for this portfolio.
