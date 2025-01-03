/*! For license information please see main.16a9fa462b0c4276c71c.hot-update.js.LICENSE.txt */
"use strict";self.webpackHotUpdatehermann("main",{"./app/pages/Home/index.js":(e,t,n)=>{n.r(t),n.d(t,{default:()=>v});var i=n("./app/classes/Page.js"),o=n("./node_modules/lodash/lodash.js"),r=n("./node_modules/gsap/index.js");function a(e){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a(e)}function l(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,u(i.key),i)}}function u(e){var t=function(e,t){if("object"!=a(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,t||"default");if("object"!=a(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==a(t)?t:t+""}function s(e,t,n){return t=f(t),function(e,t){if(t&&("object"==a(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(e,c()?Reflect.construct(t,n||[],f(e).constructor):t.apply(e,n))}function c(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(c=function(){return!!e})()}function d(e,t,n,i){var o=h(f(1&i?e.prototype:e),t,n);return 2&i?function(e){return o.apply(n,e)}:o}function h(){return h="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var i=function(e,t){for(;!{}.hasOwnProperty.call(e,t)&&null!==(e=f(e)););return e}(e,t);if(i){var o=Object.getOwnPropertyDescriptor(i,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},h.apply(null,arguments)}function f(e){return f=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},f(e)}function p(e,t){return p=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},p(e,t)}var v=function(e){function t(){var e;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(e=s(this,t,[{id:"home",element:".home",elements:{galleries:".gallery__image",slider:".slider",revealer:".revealer",galleryName:".revealer__text",details:".gallery__details__item",indicators:".indicator-dot"}}])).rotation=0,e.rotationSpeed=10,e.currentSpeed=0,e.directionMultiplier=1,e.lastTime=performance.now(),e.touchStart=null,e.touchY=null,e.lastDeltaY=0,e.touchVelocity=0,e.isTouching=!1,e.isInitializing=!1,e.initialSpeed=860,e.initialStartTime=null,e.initialDuration=2700,e.onNavigationCallback=null,e.boundWheel=e.onWheel.bind(e),e.boundTouchStart=e.onTouchStart.bind(e),e.boundTouchMove=e.onTouchMove.bind(e),e.boundTouchEnd=e.onTouchEnd.bind(e),e}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&p(e,t)}(t,e),n=t,(i=[{key:"create",value:function(){d(t,"create",this,3)([]),this.setupRotation(),this.addEventListener()}},{key:"setupRotation",value:function(){var e=this.elements.slider;e.style.transformStyle="preserve-3d",e.style.transform="perspective(1000px) rotateX(-16deg) rotateY(0deg)",this.startRotationLoop()}},{key:"initialSpeedUp",value:function(){this.isInitializing=!0}},{key:"startRotationLoop",value:function(){var e=this,t=function(n){var i=(n-e.lastTime)/1e3;if(e.lastTime=n,e.isInitializing){e.initialStartTime||(e.initialStartTime=n);var o=n-e.initialStartTime,r=Math.min(o/e.initialDuration,1);e.currentSpeed=(e.initialSpeed-(e.initialSpeed-e.rotationSpeed)*r)*e.directionMultiplier,1===r&&(e.isInitializing=!1)}else{var a=e.rotationSpeed*e.directionMultiplier;e.currentSpeed+=.2*(a-e.currentSpeed)}e.rotation+=e.currentSpeed*i,e.elements.slider.style.transform="perspective(1000px) rotateX(-16deg) rotateY(".concat(e.rotation,"deg)"),Math.abs(Math.abs(e.currentSpeed)-e.rotationSpeed)<.1&&e.updateDetailsAndIndicators(e.rotation),e.rotationFrame=requestAnimationFrame(t)};this.rotationFrame=requestAnimationFrame(t)}},{key:"updateDetailsAndIndicators",value:function(e){var t=(e%360+360)%360,n=Math.floor(t/360*6);-1===this.directionMultiplier&&(n=(n-1+6)%6),this.elements.details.forEach((function(e,t){r.default.to(e,{opacity:t===n?1:0,duration:.1,ease:"ease"})})),this.elements.indicators.forEach((function(e,t){e.style.backgroundColor=t===n?"hsl(78, 100%, 15%)":"hsla(78, 100%, 15%, 0.3)"})),this.elements.galleries.forEach((function(e,t){var i=e.querySelector("img");r.default.to(i,{filter:t===n?"grayscale(0%)":"grayscale(100%)",duration:.5})}))}},{key:"onWheel",value:function(e){e.preventDefault();var t=1.5*e.deltaY;Math.abs(t)>1&&(this.directionMultiplier=t>0?-1:1);var n=Math.abs(t);t>0&&this.directionMultiplier<0||t<0&&this.directionMultiplier>0?this.currentSpeed=this.directionMultiplier*Math.max(this.rotationSpeed,n):this.currentSpeed=n*this.directionMultiplier}},{key:"onTouchStart",value:function(e){this.isTouching=!0,this.touchStart=e.touches[0].clientY,this.touchY=this.touchStart,this.touchVelocity=0}},{key:"onTouchMove",value:function(e){if(this.isTouching){var t=e.touches[0].clientY,n=this.touchY-t;this.touchVelocity=n,this.lastDeltaY=n,this.onWheel({preventDefault:function(){},deltaY:2*n}),this.touchY=t}}},{key:"onTouchEnd",value:function(){var e=this;this.isTouching=!1;var t=15*this.touchVelocity,n=function(){Math.abs(t)>.1&&(e.onWheel({preventDefault:function(){},deltaY:t}),t*=.95,requestAnimationFrame(n))};requestAnimationFrame(n),this.touchStart=null,this.touchY=null}},{key:"onGalleryClick",value:function(e,t){t.preventDefault(),t.stopPropagation();var n=e.querySelector("a"),i=e.querySelector("img"),o=n.getAttribute("href");this.onNavigationCallback=function(){window.app.onChange({url:o})},this.galleryName=i.alt,this.elements.galleryName.innerText=this.galleryName,this.animateTransition()}},{key:"animateTransition",value:function(){var e=this,t=r.default.timeline(),n=Math.max(2*window.innerHeight,2*window.innerWidth);return t.set(this.elements.revealer,{display:"flex",y:"".concat(n,"px"),rotate:20}),t.set(this.elements.galleryName,{opacity:0,rotate:-20}),t.addLabel("firstHalf").to(this.elements.revealer,{y:"0",duration:1.2,ease:"power3.inOut"},"firstHalf").to(this.elements.galleryName,{opacity:1,duration:.8,ease:"power2.out"},"firstHalf+=0.4"),t.call((function(){e.onNavigationCallback&&(e.onNavigationCallback(),e.onNavigationCallback=null)}),null,"+=0.5"),t.addLabel("secondHalf").to(this.elements.galleryName,{opacity:0,duration:.6,ease:"power2.in"},"secondHalf").to(this.elements.revealer,{y:"-".concat(n,"px"),duration:2,rotate:20,ease:"power3.inOut"},"secondHalf+=0.2"),t.set(this.elements.revealer,{display:"none"}),t}},{key:"addEventListener",value:function(){var e=this;window.addEventListener("wheel",this.boundWheel,{passive:!1}),"ontouchstart"in window&&(window.addEventListener("touchstart",this.boundTouchStart),window.addEventListener("touchmove",this.boundTouchMove),window.addEventListener("touchend",this.boundTouchEnd)),o.forEach(this.elements.galleries,(function(t){var n=t.querySelector("a");e.boundGalleryClick=e.onGalleryClick.bind(e,t),n.addEventListener("click",e.boundGalleryClick)}))}},{key:"removeEventListeners",value:function(){var e=this;window.removeEventListener("wheel",this.boundWheel),"ontouchstart"in window&&(window.removeEventListener("touchstart",this.boundTouchStart),window.removeEventListener("touchmove",this.boundTouchMove),window.removeEventListener("touchend",this.boundTouchEnd)),o.forEach(this.elements.galleries,(function(t){t.querySelector("a").removeEventListener("click",e.boundGalleryClick)}))}},{key:"destroy",value:function(){this.rotationFrame&&cancelAnimationFrame(this.rotationFrame),this.removeEventListeners(),d(t,"destroy",this,3)([])}}])&&l(n.prototype,i),a&&l(n,a),Object.defineProperty(n,"prototype",{writable:!1}),n;var n,i,a}(i.default)}},(function(e){e.h=()=>"dbc5b5480efaa7cf9bb6"}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZXMvSG9tZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9oZXJtYW5uL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFnZSBmcm9tIFwiY2xhc3Nlcy9QYWdlLmpzXCI7XHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IEdTQVAgZnJvbSBcImdzYXBcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWUgZXh0ZW5kcyBQYWdlIHtcclxuIGNvbnN0cnVjdG9yKCkge1xyXG4gICBzdXBlcih7XHJcbiAgICAgaWQ6IFwiaG9tZVwiLFxyXG4gICAgIGVsZW1lbnQ6IFwiLmhvbWVcIiwgXHJcbiAgICAgZWxlbWVudHM6IHtcclxuICAgICAgIGdhbGxlcmllczogXCIuZ2FsbGVyeV9faW1hZ2VcIixcclxuICAgICAgIHNsaWRlcjogXCIuc2xpZGVyXCIsXHJcbiAgICAgICByZXZlYWxlcjogXCIucmV2ZWFsZXJcIixcclxuICAgICAgIGdhbGxlcnlOYW1lOiBcIi5yZXZlYWxlcl9fdGV4dFwiLFxyXG4gICAgICAgZGV0YWlsczogXCIuZ2FsbGVyeV9fZGV0YWlsc19faXRlbVwiLFxyXG4gICAgICAgaW5kaWNhdG9yczogXCIuaW5kaWNhdG9yLWRvdFwiXHJcbiAgICAgfVxyXG4gICB9KTtcclxuXHJcbiAgIC8vIFJvdGF0aW9uIHN5c3RlbVxyXG4gICB0aGlzLnJvdGF0aW9uID0gMDtcclxuICAgdGhpcy5yb3RhdGlvblNwZWVkID0gMzYwIC8gMzY7XHJcbiAgIHRoaXMuY3VycmVudFNwZWVkID0gMDtcclxuICAgICAgIHRoaXMuZGlyZWN0aW9uTXVsdGlwbGllciA9IDE7XHJcblxyXG4gICB0aGlzLmxhc3RUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcblxyXG4gICAvLyBUb3VjaCB0cmFja2luZyBwcm9wZXJ0aWVzXHJcbiAgIHRoaXMudG91Y2hTdGFydCA9IG51bGw7XHJcbiAgIHRoaXMudG91Y2hZID0gbnVsbDtcclxuICAgdGhpcy5sYXN0RGVsdGFZID0gMDtcclxuICAgdGhpcy50b3VjaFZlbG9jaXR5ID0gMDtcclxuICAgdGhpcy5pc1RvdWNoaW5nID0gZmFsc2U7XHJcblxyXG4gICAvLyBJbml0aWFsaXphdGlvbiBzdGF0ZXNcclxuICAgdGhpcy5pc0luaXRpYWxpemluZyA9IGZhbHNlO1xyXG4gICB0aGlzLmluaXRpYWxTcGVlZCA9IDg2MDtcclxuICAgdGhpcy5pbml0aWFsU3RhcnRUaW1lID0gbnVsbDtcclxuICAgdGhpcy5pbml0aWFsRHVyYXRpb24gPSAyNzAwO1xyXG5cclxuICAgLy8gTmF2aWdhdGlvbiBzdGF0ZVxyXG4gICB0aGlzLm9uTmF2aWdhdGlvbkNhbGxiYWNrID0gbnVsbDtcclxuXHJcbiAgIC8vIEJpbmQgZXZlbnQgaGFuZGxlcnNcclxuICAgIHRoaXMuYm91bmRXaGVlbCA9IHRoaXMub25XaGVlbC5iaW5kKHRoaXMpO1xyXG4gIHRoaXMuYm91bmRUb3VjaFN0YXJ0ID0gdGhpcy5vblRvdWNoU3RhcnQuYmluZCh0aGlzKTtcclxuICB0aGlzLmJvdW5kVG91Y2hNb3ZlID0gdGhpcy5vblRvdWNoTW92ZS5iaW5kKHRoaXMpO1xyXG4gIHRoaXMuYm91bmRUb3VjaEVuZCA9IHRoaXMub25Ub3VjaEVuZC5iaW5kKHRoaXMpO1xyXG4gfVxyXG5cclxuIGNyZWF0ZSgpIHtcclxuICAgc3VwZXIuY3JlYXRlKCk7XHJcbiAgIHRoaXMuc2V0dXBSb3RhdGlvbigpO1xyXG4gICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoKTtcclxuIH1cclxuXHJcbiBzZXR1cFJvdGF0aW9uKCkge1xyXG4gICBjb25zdCBzbGlkZXIgPSB0aGlzLmVsZW1lbnRzLnNsaWRlcjtcclxuICAgc2xpZGVyLnN0eWxlLnRyYW5zZm9ybVN0eWxlID0gJ3ByZXNlcnZlLTNkJztcclxuICAgc2xpZGVyLnN0eWxlLnRyYW5zZm9ybSA9ICdwZXJzcGVjdGl2ZSgxMDAwcHgpIHJvdGF0ZVgoLTE2ZGVnKSByb3RhdGVZKDBkZWcpJztcclxuICAgdGhpcy5zdGFydFJvdGF0aW9uTG9vcCgpO1xyXG4gfVxyXG5cclxuIGluaXRpYWxTcGVlZFVwKCkge1xyXG4gICB0aGlzLmlzSW5pdGlhbGl6aW5nID0gdHJ1ZTtcclxuIH1cclxuXHJcbiBzdGFydFJvdGF0aW9uTG9vcCgpIHtcclxuICAgY29uc3QgYW5pbWF0ZSA9IChjdXJyZW50VGltZSkgPT4ge1xyXG4gICAgIGNvbnN0IGRlbHRhVGltZSA9IChjdXJyZW50VGltZSAtIHRoaXMubGFzdFRpbWUpIC8gMTAwMDtcclxuICAgICB0aGlzLmxhc3RUaW1lID0gY3VycmVudFRpbWU7XHJcblxyXG4gICAgIGlmICh0aGlzLmlzSW5pdGlhbGl6aW5nKSB7XHJcbiAgICAgICBpZiAoIXRoaXMuaW5pdGlhbFN0YXJ0VGltZSkgdGhpcy5pbml0aWFsU3RhcnRUaW1lID0gY3VycmVudFRpbWU7XHJcblxyXG4gICAgICAgY29uc3QgZWxhcHNlZFRpbWUgPSBjdXJyZW50VGltZSAtIHRoaXMuaW5pdGlhbFN0YXJ0VGltZTtcclxuICAgICAgIGNvbnN0IHByb2dyZXNzID0gTWF0aC5taW4oZWxhcHNlZFRpbWUgLyB0aGlzLmluaXRpYWxEdXJhdGlvbiwgMSk7XHJcblxyXG4gICAgICAgIHRoaXMuY3VycmVudFNwZWVkID0gKHRoaXMuaW5pdGlhbFNwZWVkIC0gKHRoaXMuaW5pdGlhbFNwZWVkIC0gdGhpcy5yb3RhdGlvblNwZWVkKSAqIHByb2dyZXNzKSAqIHRoaXMuZGlyZWN0aW9uTXVsdGlwbGllcjtcclxuXHJcbiAgICAgICBpZiAocHJvZ3Jlc3MgPT09IDEpIHtcclxuICAgICAgICAgdGhpcy5pc0luaXRpYWxpemluZyA9IGZhbHNlO1xyXG4gICAgICAgfVxyXG4gICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0U3BlZWQgPSB0aGlzLnJvdGF0aW9uU3BlZWQgKiB0aGlzLmRpcmVjdGlvbk11bHRpcGxpZXI7XHJcbiAgICAgICB0aGlzLmN1cnJlbnRTcGVlZCArPSAodGFyZ2V0U3BlZWQgLSB0aGlzLmN1cnJlbnRTcGVlZCkgKiAwLjI7XHJcbiAgICAgfVxyXG5cclxuICAgICB0aGlzLnJvdGF0aW9uICs9IHRoaXMuY3VycmVudFNwZWVkICogZGVsdGFUaW1lO1xyXG5cclxuICAgICB0aGlzLmVsZW1lbnRzLnNsaWRlci5zdHlsZS50cmFuc2Zvcm0gPSBcclxuICAgICAgIGBwZXJzcGVjdGl2ZSgxMDAwcHgpIHJvdGF0ZVgoLTE2ZGVnKSByb3RhdGVZKCR7dGhpcy5yb3RhdGlvbn1kZWcpYDtcclxuXHJcbiAgICBcclxuICAgICAgaWYgKE1hdGguYWJzKE1hdGguYWJzKHRoaXMuY3VycmVudFNwZWVkKSAtIHRoaXMucm90YXRpb25TcGVlZCkgPCAwLjEpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZURldGFpbHNBbmRJbmRpY2F0b3JzKHRoaXMucm90YXRpb24pO1xyXG4gICAgICB9XHJcblxyXG4gICAgIHRoaXMucm90YXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcclxuICAgfTtcclxuXHJcbiAgIHRoaXMucm90YXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcclxuIH1cclxuXHJcbiB1cGRhdGVEZXRhaWxzQW5kSW5kaWNhdG9ycyhyb3RhdGlvbikge1xyXG4gICBjb25zdCBub3JtYWxpemVkUm90YXRpb24gPSAoKHJvdGF0aW9uICUgMzYwKSArIDM2MCkgJSAzNjA7XHJcbiAgIFxyXG4gICBsZXQgYWN0aXZlSW5kZXggPSBNYXRoLmZsb29yKChub3JtYWxpemVkUm90YXRpb24gLyAzNjApICogNik7XHJcblxyXG4gICAgaWYgKHRoaXMuZGlyZWN0aW9uTXVsdGlwbGllciA9PT0gLTEpIHtcclxuICAgIGFjdGl2ZUluZGV4ID0gKGFjdGl2ZUluZGV4IC0gMSArIDYpICUgNjsgLy8gU2hpZnQgYmFja3dhcmQsIHdyYXAgYXJvdW5kXHJcbiAgfVxyXG4gICB0aGlzLmVsZW1lbnRzLmRldGFpbHMuZm9yRWFjaCgoZGV0YWlsLCBpbmRleCkgPT4ge1xyXG4gICAgIEdTQVAudG8oZGV0YWlsLCB7XHJcbiAgICAgICBvcGFjaXR5OiBpbmRleCA9PT0gYWN0aXZlSW5kZXggPyAxIDogMCxcclxuICAgICAgIGR1cmF0aW9uOiAwLjEsXHJcbiAgICAgICBlYXNlOiBcImVhc2VcIlxyXG4gICAgIH0pO1xyXG4gICB9KTtcclxuXHJcbiAgIHRoaXMuZWxlbWVudHMuaW5kaWNhdG9ycy5mb3JFYWNoKChpbmRpY2F0b3IsIGluZGV4KSA9PiB7XHJcbiAgICAgaW5kaWNhdG9yLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGluZGV4ID09PSBhY3RpdmVJbmRleCA/IFxyXG4gICAgICAgJ2hzbCg3OCwgMTAwJSwgMTUlKScgOiBcclxuICAgICAgICdoc2xhKDc4LCAxMDAlLCAxNSUsIDAuMyknO1xyXG4gICB9KTtcclxuXHJcbiAgIHRoaXMuZWxlbWVudHMuZ2FsbGVyaWVzLmZvckVhY2goKGdhbGxlcnksIGluZGV4KSA9PiB7XHJcbiAgICAgY29uc3QgaW1nID0gZ2FsbGVyeS5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcclxuICAgICBHU0FQLnRvKGltZywge1xyXG4gICAgICAgZmlsdGVyOiBpbmRleCA9PT0gYWN0aXZlSW5kZXggPyAnZ3JheXNjYWxlKDAlKScgOiAnZ3JheXNjYWxlKDEwMCUpJyxcclxuICAgICAgIGR1cmF0aW9uOiAwLjVcclxuICAgICB9KTtcclxuICAgfSk7XHJcbiB9XHJcblxyXG4gb25XaGVlbChldmVudCkge1xyXG4gICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICBjb25zdCBzY3JvbGxJbmZsdWVuY2UgPSBldmVudC5kZWx0YVkgKiAxLjU7XHJcblxyXG4gICAgaWYgKE1hdGguYWJzKHNjcm9sbEluZmx1ZW5jZSkgPiAxKSB7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25NdWx0aXBsaWVyID0gc2Nyb2xsSW5mbHVlbmNlID4gMCA/IC0xIDogMTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzY3JvbGxTcGVlZCA9IE1hdGguYWJzKHNjcm9sbEluZmx1ZW5jZSk7XHJcbiAgICBcclxuICAgIGlmICgoc2Nyb2xsSW5mbHVlbmNlID4gMCAmJiB0aGlzLmRpcmVjdGlvbk11bHRpcGxpZXIgPCAwKSB8fCBcclxuICAgICAgICAoc2Nyb2xsSW5mbHVlbmNlIDwgMCAmJiB0aGlzLmRpcmVjdGlvbk11bHRpcGxpZXIgPiAwKSkge1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNwZWVkID0gdGhpcy5kaXJlY3Rpb25NdWx0aXBsaWVyICogXHJcbiAgICAgICAgICAgIE1hdGgubWF4KHRoaXMucm90YXRpb25TcGVlZCwgc2Nyb2xsU3BlZWQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTcGVlZCA9IHNjcm9sbFNwZWVkICogdGhpcy5kaXJlY3Rpb25NdWx0aXBsaWVyO1xyXG4gICAgfSB9XHJcblxyXG4gb25Ub3VjaFN0YXJ0KGV2ZW50KSB7XHJcbiAgLy8gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgIHRoaXMuaXNUb3VjaGluZyA9IHRydWU7XHJcbiAgIHRoaXMudG91Y2hTdGFydCA9IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WTtcclxuICAgdGhpcy50b3VjaFkgPSB0aGlzLnRvdWNoU3RhcnQ7XHJcbiAgIHRoaXMudG91Y2hWZWxvY2l0eSA9IDA7XHJcbiB9XHJcblxyXG4gb25Ub3VjaE1vdmUoZXZlbnQpIHtcclxuICAvLyAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgaWYgKCF0aGlzLmlzVG91Y2hpbmcpIHJldHVybjtcclxuXHJcbiAgIGNvbnN0IGN1cnJlbnRZID0gZXZlbnQudG91Y2hlc1swXS5jbGllbnRZO1xyXG4gICBjb25zdCBkZWx0YVkgPSB0aGlzLnRvdWNoWSAtIGN1cnJlbnRZO1xyXG5cclxuICAgdGhpcy50b3VjaFZlbG9jaXR5ID0gZGVsdGFZO1xyXG4gICB0aGlzLmxhc3REZWx0YVkgPSBkZWx0YVk7XHJcblxyXG4gICB0aGlzLm9uV2hlZWwoeyBcclxuICAgICBwcmV2ZW50RGVmYXVsdDogKCkgPT4ge30sXHJcbiAgICAgZGVsdGFZOiBkZWx0YVkgKiAyXHJcbiAgIH0pO1xyXG5cclxuICAgdGhpcy50b3VjaFkgPSBjdXJyZW50WTtcclxuIH1cclxuXHJcbiBvblRvdWNoRW5kKCkge1xyXG4gICB0aGlzLmlzVG91Y2hpbmcgPSBmYWxzZTtcclxuXHJcbiAgIGNvbnN0IHN0YXJ0VmVsb2NpdHkgPSB0aGlzLnRvdWNoVmVsb2NpdHkgKiAxNTtcclxuICAgbGV0IGN1cnJlbnRWZWxvY2l0eSA9IHN0YXJ0VmVsb2NpdHk7XHJcblxyXG4gICBjb25zdCBkZWNheSA9ICgpID0+IHtcclxuICAgICBpZiAoTWF0aC5hYnMoY3VycmVudFZlbG9jaXR5KSA+IDAuMSkge1xyXG4gICAgICAgdGhpcy5vbldoZWVsKHtcclxuICAgICAgICAgcHJldmVudERlZmF1bHQ6ICgpID0+IHt9LFxyXG4gICAgICAgICBkZWx0YVk6IGN1cnJlbnRWZWxvY2l0eVxyXG4gICAgICAgfSk7XHJcblxyXG4gICAgICAgY3VycmVudFZlbG9jaXR5ICo9IDAuOTU7XHJcbiAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZGVjYXkpO1xyXG4gICAgIH1cclxuICAgfTtcclxuXHJcbiAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShkZWNheSk7XHJcblxyXG4gICB0aGlzLnRvdWNoU3RhcnQgPSBudWxsO1xyXG4gICB0aGlzLnRvdWNoWSA9IG51bGw7XHJcbiB9XHJcblxyXG4gb25HYWxsZXJ5Q2xpY2soZ2FsbGVyeSwgZXZlbnQpIHtcclxuICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICBjb25zdCBsaW5rID0gZ2FsbGVyeS5xdWVyeVNlbGVjdG9yKCdhJyk7XHJcbiAgIGNvbnN0IGltZ0VsZW1lbnQgPSBnYWxsZXJ5LnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xyXG4gICBjb25zdCBocmVmID0gbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcclxuXHJcbiAgIHRoaXMub25OYXZpZ2F0aW9uQ2FsbGJhY2sgPSAoKSA9PiB7XHJcbiAgICAgd2luZG93LmFwcC5vbkNoYW5nZSh7IHVybDogaHJlZiB9KTtcclxuICAgfTtcclxuXHJcbiAgIHRoaXMuZ2FsbGVyeU5hbWUgPSBpbWdFbGVtZW50LmFsdDtcclxuICAgdGhpcy5lbGVtZW50cy5nYWxsZXJ5TmFtZS5pbm5lclRleHQgPSB0aGlzLmdhbGxlcnlOYW1lO1xyXG5cclxuICAgdGhpcy5hbmltYXRlVHJhbnNpdGlvbigpO1xyXG4gfVxyXG5cclxuIGFuaW1hdGVUcmFuc2l0aW9uKCkge1xyXG4gICBjb25zdCB0bCA9IEdTQVAudGltZWxpbmUoKTtcclxuICAgY29uc3QgbWF4RGltZW5zaW9uID0gTWF0aC5tYXgod2luZG93LmlubmVySGVpZ2h0ICogMiwgd2luZG93LmlubmVyV2lkdGggKiAyKTtcclxuXHJcbiAgIHRsLnNldCh0aGlzLmVsZW1lbnRzLnJldmVhbGVyLCB7XHJcbiAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgIHk6IGAke21heERpbWVuc2lvbn1weGAsXHJcbiAgICAgcm90YXRlOiAyMFxyXG4gICB9KTtcclxuXHJcbiAgIHRsLnNldCh0aGlzLmVsZW1lbnRzLmdhbGxlcnlOYW1lLCB7XHJcbiAgICAgb3BhY2l0eTogMCxcclxuICAgICByb3RhdGU6IC0yMFxyXG4gICB9KTtcclxuXHJcbiAgIHRsLmFkZExhYmVsKFwiZmlyc3RIYWxmXCIpXHJcbiAgICAgLnRvKHRoaXMuZWxlbWVudHMucmV2ZWFsZXIsIHtcclxuICAgICAgIHk6IFwiMFwiLFxyXG4gICAgICAgZHVyYXRpb246IDEuMixcclxuICAgICAgIGVhc2U6IFwicG93ZXIzLmluT3V0XCJcclxuICAgICB9LCBcImZpcnN0SGFsZlwiKVxyXG4gICAgIC50byh0aGlzLmVsZW1lbnRzLmdhbGxlcnlOYW1lLCB7XHJcbiAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgZHVyYXRpb246IDAuOCxcclxuICAgICAgIGVhc2U6IFwicG93ZXIyLm91dFwiXHJcbiAgICAgfSwgXCJmaXJzdEhhbGYrPTAuNFwiKTtcclxuXHJcbiAgIHRsLmNhbGwoKCkgPT4ge1xyXG4gICAgIGlmICh0aGlzLm9uTmF2aWdhdGlvbkNhbGxiYWNrKSB7XHJcbiAgICAgICB0aGlzLm9uTmF2aWdhdGlvbkNhbGxiYWNrKCk7XHJcbiAgICAgICB0aGlzLm9uTmF2aWdhdGlvbkNhbGxiYWNrID0gbnVsbDtcclxuICAgICB9XHJcbiAgIH0sIG51bGwsIFwiKz0wLjVcIik7XHJcblxyXG4gICB0bC5hZGRMYWJlbChcInNlY29uZEhhbGZcIilcclxuICAgICAudG8odGhpcy5lbGVtZW50cy5nYWxsZXJ5TmFtZSwge1xyXG4gICAgICAgb3BhY2l0eTogMCxcclxuICAgICAgIGR1cmF0aW9uOiAwLjYsXHJcbiAgICAgICBlYXNlOiBcInBvd2VyMi5pblwiXHJcbiAgICAgfSwgXCJzZWNvbmRIYWxmXCIpXHJcbiAgICAgLnRvKHRoaXMuZWxlbWVudHMucmV2ZWFsZXIsIHtcclxuICAgICAgIHk6IGAtJHttYXhEaW1lbnNpb259cHhgLFxyXG4gICAgICAgZHVyYXRpb246IDIsXHJcbiAgICAgICByb3RhdGU6IDIwLFxyXG4gICAgICAgZWFzZTogXCJwb3dlcjMuaW5PdXRcIlxyXG4gICAgIH0sIFwic2Vjb25kSGFsZis9MC4yXCIpO1xyXG5cclxuICAgdGwuc2V0KHRoaXMuZWxlbWVudHMucmV2ZWFsZXIsIHsgZGlzcGxheTogJ25vbmUnIH0pO1xyXG5cclxuICAgcmV0dXJuIHRsO1xyXG4gfVxyXG5hZGRFdmVudExpc3RlbmVyKCkge1xyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMuYm91bmRXaGVlbCwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcclxuICBcclxuICBpZiAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB7XHJcbiAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5ib3VuZFRvdWNoU3RhcnQpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuYm91bmRUb3VjaE1vdmUpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5ib3VuZFRvdWNoRW5kKTtcclxuICB9XHJcblxyXG5cclxuXHJcbiAgXy5mb3JFYWNoKHRoaXMuZWxlbWVudHMuZ2FsbGVyaWVzLCAoZ2FsbGVyeSkgPT4ge1xyXG4gICAgY29uc3QgbGluayA9IGdhbGxlcnkucXVlcnlTZWxlY3RvcignYScpO1xyXG4gICAgdGhpcy5ib3VuZEdhbGxlcnlDbGljayA9IHRoaXMub25HYWxsZXJ5Q2xpY2suYmluZCh0aGlzLCBnYWxsZXJ5KTtcclxuICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuYm91bmRHYWxsZXJ5Q2xpY2spO1xyXG4gIH0pO1xyXG59XHJcblxyXG5yZW1vdmVFdmVudExpc3RlbmVycygpIHtcclxuICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLmJvdW5kV2hlZWwpO1xyXG4gIFxyXG4gIGlmICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHtcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5ib3VuZFRvdWNoU3RhcnQpO1xyXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuYm91bmRUb3VjaE1vdmUpO1xyXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5ib3VuZFRvdWNoRW5kKTtcclxuICB9XHJcblxyXG4gIF8uZm9yRWFjaCh0aGlzLmVsZW1lbnRzLmdhbGxlcmllcywgKGdhbGxlcnkpID0+IHtcclxuICAgIGNvbnN0IGxpbmsgPSBnYWxsZXJ5LnF1ZXJ5U2VsZWN0b3IoJ2EnKTtcclxuICAgIGxpbmsucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuYm91bmRHYWxsZXJ5Q2xpY2spO1xyXG4gIH0pO1xyXG59XHJcblxyXG5cclxuIGRlc3Ryb3koKSB7XHJcbiAgIGlmICh0aGlzLnJvdGF0aW9uRnJhbWUpIHtcclxuICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLnJvdGF0aW9uRnJhbWUpO1xyXG4gICB9XHJcbiAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgc3VwZXIuZGVzdHJveSgpO1xyXG4gfVxyXG59XHJcbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcImRiYzViNTQ4MGVmYWE3Y2Y5YmI2XCIpIl0sIm5hbWVzIjpbIkhvbWUiLCJfUGFnZSIsIl90aGlzIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2NhbGxTdXBlciIsImlkIiwiZWxlbWVudCIsImVsZW1lbnRzIiwiZ2FsbGVyaWVzIiwic2xpZGVyIiwicmV2ZWFsZXIiLCJnYWxsZXJ5TmFtZSIsImRldGFpbHMiLCJpbmRpY2F0b3JzIiwicm90YXRpb24iLCJyb3RhdGlvblNwZWVkIiwiY3VycmVudFNwZWVkIiwiZGlyZWN0aW9uTXVsdGlwbGllciIsImxhc3RUaW1lIiwicGVyZm9ybWFuY2UiLCJub3ciLCJ0b3VjaFN0YXJ0IiwidG91Y2hZIiwibGFzdERlbHRhWSIsInRvdWNoVmVsb2NpdHkiLCJpc1RvdWNoaW5nIiwiaXNJbml0aWFsaXppbmciLCJpbml0aWFsU3BlZWQiLCJpbml0aWFsU3RhcnRUaW1lIiwiaW5pdGlhbER1cmF0aW9uIiwib25OYXZpZ2F0aW9uQ2FsbGJhY2siLCJib3VuZFdoZWVsIiwib25XaGVlbCIsImJpbmQiLCJib3VuZFRvdWNoU3RhcnQiLCJvblRvdWNoU3RhcnQiLCJib3VuZFRvdWNoTW92ZSIsIm9uVG91Y2hNb3ZlIiwiYm91bmRUb3VjaEVuZCIsIm9uVG91Y2hFbmQiLCJfaW5oZXJpdHMiLCJrZXkiLCJ2YWx1ZSIsIl9zdXBlclByb3BHZXQiLCJ0aGlzIiwic2V0dXBSb3RhdGlvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdHlsZSIsInRyYW5zZm9ybVN0eWxlIiwidHJhbnNmb3JtIiwic3RhcnRSb3RhdGlvbkxvb3AiLCJfdGhpczIiLCJhbmltYXRlIiwiY3VycmVudFRpbWUiLCJkZWx0YVRpbWUiLCJlbGFwc2VkVGltZSIsInByb2dyZXNzIiwiTWF0aCIsIm1pbiIsInRhcmdldFNwZWVkIiwiY29uY2F0IiwiYWJzIiwidXBkYXRlRGV0YWlsc0FuZEluZGljYXRvcnMiLCJyb3RhdGlvbkZyYW1lIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibm9ybWFsaXplZFJvdGF0aW9uIiwiYWN0aXZlSW5kZXgiLCJmbG9vciIsImZvckVhY2giLCJkZXRhaWwiLCJpbmRleCIsIkdTQVAiLCJ0byIsIm9wYWNpdHkiLCJkdXJhdGlvbiIsImVhc2UiLCJpbmRpY2F0b3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJnYWxsZXJ5IiwiaW1nIiwicXVlcnlTZWxlY3RvciIsImZpbHRlciIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJzY3JvbGxJbmZsdWVuY2UiLCJkZWx0YVkiLCJzY3JvbGxTcGVlZCIsIm1heCIsInRvdWNoZXMiLCJjbGllbnRZIiwiY3VycmVudFkiLCJfdGhpczMiLCJjdXJyZW50VmVsb2NpdHkiLCJkZWNheSIsInN0b3BQcm9wYWdhdGlvbiIsImxpbmsiLCJpbWdFbGVtZW50IiwiaHJlZiIsImdldEF0dHJpYnV0ZSIsIndpbmRvdyIsImFwcCIsIm9uQ2hhbmdlIiwidXJsIiwiYWx0IiwiaW5uZXJUZXh0IiwiYW5pbWF0ZVRyYW5zaXRpb24iLCJfdGhpczQiLCJ0bCIsInRpbWVsaW5lIiwibWF4RGltZW5zaW9uIiwiaW5uZXJIZWlnaHQiLCJpbm5lcldpZHRoIiwic2V0IiwiZGlzcGxheSIsInkiLCJyb3RhdGUiLCJhZGRMYWJlbCIsImNhbGwiLCJfdGhpczUiLCJwYXNzaXZlIiwiXyIsImJvdW5kR2FsbGVyeUNsaWNrIiwib25HYWxsZXJ5Q2xpY2siLCJfdGhpczYiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJyZW1vdmVFdmVudExpc3RlbmVycyIsIlBhZ2UiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwiaCJdLCJzb3VyY2VSb290IjoiIn0=