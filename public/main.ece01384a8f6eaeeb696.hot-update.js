/*! For license information please see main.ece01384a8f6eaeeb696.hot-update.js.LICENSE.txt */
"use strict";self.webpackHotUpdatehermann("main",{"./app/pages/Gallery/index.js":(e,t,r)=>{r.r(t),r.d(t,{default:()=>m});var n=r("./app/classes/Page.js"),i=(r("./node_modules/lodash/lodash.js"),r("./node_modules/gsap/index.js"));function o(e){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o(e)}function a(e){return function(e){if(Array.isArray(e))return l(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return l(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?l(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}function s(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,c(n.key),n)}}function c(e){var t=function(e,t){if("object"!=o(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!=o(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==o(t)?t:t+""}function u(e,t,r){return t=v(t),function(e,t){if(t&&("object"==o(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(e,p()?Reflect.construct(t,r||[],v(e).constructor):t.apply(e,r))}function p(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(p=function(){return!!e})()}function f(e,t,r,n){var i=d(v(1&n?e.prototype:e),t,r);return 2&n?function(e){return i.apply(r,e)}:i}function d(){return d="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,r){var n=function(e,t){for(;!{}.hasOwnProperty.call(e,t)&&null!==(e=v(e)););return e}(e,t);if(n){var i=Object.getOwnPropertyDescriptor(n,t);return i.get?i.get.call(arguments.length<3?e:r):i.value}},d.apply(null,arguments)}function v(e){return v=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},v(e)}function y(e,t){return y=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},y(e,t)}var m=function(e){function t(){var e;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(e=u(this,t,[{id:"gallery",element:".gallery",elements:{grid:".grid",preview:".preview",gridItems:".grid_item",previewImage:".preview__image",previewClose:".preview__close",previewBackground:".preview__background"}}])).state={isPreviewOpen:!1,currentItem:null,timeline:null},e}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&y(e,t)}(t,e),r=t,n=[{key:"create",value:function(){f(t,"create",this,3)([]),this.setupGallery(),this.addEventListeners()}},{key:"setupGallery",value:function(){this.elements.preview.innerHTML='\n            <div class="preview__background"></div>\n            <div class="preview__content">\n                <button class="preview__close">×</button>\n                <div class="preview__image-container"></div>\n            </div>\n        ',this.elements.previewBackground=this.elements.preview.querySelector(".preview__background")}},{key:"addEventListeners",value:function(){var e=this;this.elements.grid.querySelectorAll(".grid_item").forEach((function(t){t.addEventListener("click",(function(r){r.preventDefault(),e.state.isPreviewOpen||e.openPreview(t)}))})),this.elements.preview.querySelector(".preview__close").addEventListener("click",(function(){e.state.isPreviewOpen&&e.closePreview()})),window.addEventListener("keydown",(function(t){"Escape"===t.key&&e.state.isPreviewOpen&&e.closePreview()}))}},{key:"openPreview",value:function(e){this.state.isPreviewOpen=!0,this.state.currentItem=e;var t=e.querySelector("img");this.currentImage=t;var r=t.getBoundingClientRect(),n=this.elements.preview.querySelector(".preview__image-container"),o=t.cloneNode(!0);o.className="preview__transition-image",o.style.position="fixed",o.style.left="".concat(r.left,"px"),o.style.top="".concat(r.top,"px"),o.style.width="".concat(r.width,"px"),o.style.height="".concat(r.height,"px"),o.style.objectFit="cover",o.style.transition="none",n.appendChild(o);var l,s,c=window.innerWidth,u=window.innerHeight,p=.9*c,f=.9*u,d=r.width/r.height;d>p/f?(l=p,s=p/d):(s=f,l=f*d);var v=c/2,y=u/2,m=r.left+r.width/2,w=v-m,h=y-(r.top+r.height/2),g=(l-r.width)/2,b=(s-r.height)/2;this.elements.preview.style.display="block",i.default.set(this.elements.previewBackground,{opacity:0}),i.default.set(t,{opacity:0});var _=i.default.timeline({onComplete:function(){if(t.dataset.large){var e=new Image;e.src=t.dataset.large,e.onload=function(){o.src=t.dataset.large}}}}),O=a(this.elements.grid.querySelectorAll(".grid_item")).filter((function(t){return t!==e})),P=m<c/2?-c:c;_.to(o,{x:w-g,y:h-b,width:l,height:s,duration:1.2,ease:"expo.inOut",reverseEase:!1},0).to(this.elements.previewBackground,{opacity:1,duration:1,ease:"power2.out",reverseEase:!1},.2),O.forEach((function(e,t){_.to(e,{x:P,y:0,scale:.5,opacity:0,duration:.8,ease:"expo.inOut",delay:.02*t,reverseEase:!1},0)})),this.state.timeline=_}},{key:"closePreview",value:function(){var e=this;this.state.isPreviewOpen&&this.state.timeline&&(this.state.timeline.reverse(),this.state.timeline.eventCallback("onReverseComplete",(function(){i.default.set(e.currentImage,{opacity:1});var t=e.elements.preview.querySelector(".preview__transition-image");t&&t.remove(),e.elements.preview.style.display="none",e.state.isPreviewOpen=!1,e.state.currentItem=null,e.state.timeline=null,e.elements.grid.querySelectorAll(".grid_item").forEach((function(e){i.default.set(e,{clearProps:"all"})}))})))}},{key:"destroy",value:function(){f(t,"destroy",this,3)([]),this.state.timeline&&this.state.timeline.kill(),window.removeEventListener("keydown",this.handleKeyDown)}}],n&&s(r.prototype,n),o&&s(r,o),Object.defineProperty(r,"prototype",{writable:!1}),r;var r,n,o}(n.default)}},(function(e){e.h=()=>"b71e175dc540fa831930"}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEdBQ1ZDLEtBQU0sYUFDTkksTUFBZSxJQUFSRixFQUFjRCxhQUFhLEdBQ25DLEVBQ1AsSUFFQXRFLEtBQUtSLE1BQU1HLFNBQVdBLENBQzFCLEdBQUMsQ0FBQUUsSUFBQSxlQUFBQyxNQUVELFdBQWUsSUFBQTRFLEVBQUEsS0FDTjFFLEtBQUtSLE1BQU1DLGVBQWtCTyxLQUFLUixNQUFNRyxXQU03Q0ssS0FBS1IsTUFBTUcsU0FBU2dGLFVBSXBCM0UsS0FBS1IsTUFBTUcsU0FBU2lGLGNBQWMscUJBQXFCLFdBQzNDekIsRUFBQUEsUUFBS0MsSUFBSXNCLEVBQUt6RCxhQUFjLENBQUVvQyxRQUFTLElBRS9DLElBQU1oQyxFQUFRcUQsRUFBS3pGLFNBQVNFLFFBQVFpQixjQUFjLDhCQUM5Q2lCLEdBQU9BLEVBQU13RCxTQUNqQkgsRUFBS3pGLFNBQVNFLFFBQVFxQyxNQUFNMEIsUUFBVSxPQUN0Q3dCLEVBQUtsRixNQUFNQyxlQUFnQixFQUMzQmlGLEVBQUtsRixNQUFNRSxZQUFjLEtBQ3pCZ0YsRUFBS2xGLE1BQU1HLFNBQVcsS0FHSitFLEVBQUt6RixTQUFTQyxLQUFLb0IsaUJBQWlCLGNBQzVDQyxTQUFRLFNBQUFDLEdBQ2QyQyxFQUFBQSxRQUFLQyxJQUFJNUMsRUFBTSxDQUNYc0UsV0FBWSxPQUVwQixHQUNKLElBQ0osR0FBQyxDQUFBakYsSUFBQSxVQUFBQyxNQUNELFdBQ0lDLEVBQUFyQixFQUFBLGlCQUFBcUIsQ0FBQSxJQUNJQyxLQUFLUixNQUFNRyxVQUNYSyxLQUFLUixNQUFNRyxTQUFTb0YsT0FFeEJqRSxPQUFPa0Usb0JBQW9CLFVBQVdoRixLQUFLaUYsY0FDL0MsZ0dBQUMsQ0F0TnVCLENBQVNDLEVBQUFBLHdCQ0pyQ0MsRUFBb0JDLEVBQUksSUFBTSIsInNvdXJjZXMiOlsid2VicGFjazovL2hlcm1hbm4vLi9hcHAvcGFnZXMvR2FsbGVyeS9pbmRleC5qcyIsIndlYnBhY2s6Ly9oZXJtYW5uL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFnZSBmcm9tIFwiY2xhc3Nlcy9QYWdlLmpzXCI7XHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IEdTQVAgZnJvbSBcImdzYXBcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbGxlcnkgZXh0ZW5kcyBQYWdlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKHtcclxuICAgICAgICAgICAgaWQ6IFwiZ2FsbGVyeVwiLFxyXG4gICAgICAgICAgICBlbGVtZW50OiBcIi5nYWxsZXJ5XCIsXHJcbiAgICAgICAgICAgIGVsZW1lbnRzOiB7XHJcbiAgICAgICAgICAgICAgICBncmlkOiBcIi5ncmlkXCIsXHJcbiAgICAgICAgICAgICAgICBwcmV2aWV3OiBcIi5wcmV2aWV3XCIsXHJcbiAgICAgICAgICAgICAgICBncmlkSXRlbXM6IFwiLmdyaWRfaXRlbVwiLFxyXG4gICAgICAgICAgICAgICAgcHJldmlld0ltYWdlOiBcIi5wcmV2aWV3X19pbWFnZVwiLFxyXG4gICAgICAgICAgICAgICAgcHJldmlld0Nsb3NlOiBcIi5wcmV2aWV3X19jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgcHJldmlld0JhY2tncm91bmQ6IFwiLnByZXZpZXdfX2JhY2tncm91bmRcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBpc1ByZXZpZXdPcGVuOiBmYWxzZSxcclxuICAgICAgICAgICAgY3VycmVudEl0ZW06IG51bGwsXHJcbiAgICAgICAgICAgIHRpbWVsaW5lOiBudWxsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGUoKSB7XHJcbiAgICAgICAgc3VwZXIuY3JlYXRlKCk7XHJcbiAgICAgICAgdGhpcy5zZXR1cEdhbGxlcnkoKTtcclxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0dXBHYWxsZXJ5KCkge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudHMucHJldmlldy5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcmV2aWV3X19iYWNrZ3JvdW5kXCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcmV2aWV3X19jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicHJldmlld19fY2xvc2VcIj7DlzwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByZXZpZXdfX2ltYWdlLWNvbnRhaW5lclwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG5cclxuICAgICAgICAvLyBTdG9yZSB0aGUgYmFja2dyb3VuZCBlbGVtZW50XHJcbiAgICAgICAgdGhpcy5lbGVtZW50cy5wcmV2aWV3QmFja2dyb3VuZCA9IHRoaXMuZWxlbWVudHMucHJldmlldy5xdWVyeVNlbGVjdG9yKCcucHJldmlld19fYmFja2dyb3VuZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgICAgIGNvbnN0IGdyaWRJdGVtcyA9IHRoaXMuZWxlbWVudHMuZ3JpZC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWRfaXRlbVwiKTtcclxuXHJcbiAgICAgICAgZ3JpZEl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc3RhdGUuaXNQcmV2aWV3T3Blbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlblByZXZpZXcoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmVsZW1lbnRzLnByZXZpZXcucXVlcnlTZWxlY3RvcignLnByZXZpZXdfX2Nsb3NlJykuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNQcmV2aWV3T3Blbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZVByZXZpZXcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScgJiYgdGhpcy5zdGF0ZS5pc1ByZXZpZXdPcGVuKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlUHJldmlldygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb3BlblByZXZpZXcoZ3JpZEl0ZW0pIHtcclxuICAgICAgICB0aGlzLnN0YXRlLmlzUHJldmlld09wZW4gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc3RhdGUuY3VycmVudEl0ZW0gPSBncmlkSXRlbTtcclxuXHJcbiAgICAgICAgY29uc3QgaW1nID0gZ3JpZEl0ZW0ucXVlcnlTZWxlY3RvcihcImltZ1wiKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRJbWFnZSA9IGltZ1xyXG4gICAgICAgIGNvbnN0IGltZ0JvdW5kcyA9IGltZy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBjb25zdCBwcmV2aWV3Q29udGFpbmVyID0gdGhpcy5lbGVtZW50cy5wcmV2aWV3LnF1ZXJ5U2VsZWN0b3IoJy5wcmV2aWV3X19pbWFnZS1jb250YWluZXInKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGNsb25lIGZvciB0cmFuc2l0aW9uXHJcbiAgICAgICAgY29uc3QgY2xvbmUgPSBpbWcuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIGNsb25lLmNsYXNzTmFtZSA9ICdwcmV2aWV3X190cmFuc2l0aW9uLWltYWdlJztcclxuICAgICAgICBjbG9uZS5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XHJcbiAgICAgICAgY2xvbmUuc3R5bGUubGVmdCA9IGAke2ltZ0JvdW5kcy5sZWZ0fXB4YDtcclxuICAgICAgICBjbG9uZS5zdHlsZS50b3AgPSBgJHtpbWdCb3VuZHMudG9wfXB4YDtcclxuICAgICAgICBjbG9uZS5zdHlsZS53aWR0aCA9IGAke2ltZ0JvdW5kcy53aWR0aH1weGA7XHJcbiAgICAgICAgY2xvbmUuc3R5bGUuaGVpZ2h0ID0gYCR7aW1nQm91bmRzLmhlaWdodH1weGA7XHJcbiAgICAgICAgY2xvbmUuc3R5bGUub2JqZWN0Rml0ID0gJ2NvdmVyJztcclxuICAgICAgICBjbG9uZS5zdHlsZS50cmFuc2l0aW9uID0gJ25vbmUnO1xyXG4gICAgICAgIHByZXZpZXdDb250YWluZXIuYXBwZW5kQ2hpbGQoY2xvbmUpO1xyXG5cclxuICAgICAgICAvLyBDYWxjdWxhdGUgdmlld3BvcnQgYW5kIHRhcmdldCBkaW1lbnNpb25zXHJcbiAgICAgICAgY29uc3Qgdmlld3BvcnRXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgIGNvbnN0IHZpZXdwb3J0SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgICAgIGNvbnN0IG1heFRhcmdldFdpZHRoID0gdmlld3BvcnRXaWR0aCAqIDAuOTtcclxuICAgICAgICBjb25zdCBtYXhUYXJnZXRIZWlnaHQgPSB2aWV3cG9ydEhlaWdodCAqIDAuOTtcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIGRpbWVuc2lvbnMgbWFpbnRhaW5pbmcgYXNwZWN0IHJhdGlvXHJcbiAgICAgICAgY29uc3QgaW1hZ2VBc3BlY3RSYXRpbyA9IGltZ0JvdW5kcy53aWR0aCAvIGltZ0JvdW5kcy5oZWlnaHQ7XHJcbiAgICAgICAgbGV0IGZpbmFsV2lkdGgsIGZpbmFsSGVpZ2h0O1xyXG5cclxuICAgICAgICBpZiAoaW1hZ2VBc3BlY3RSYXRpbyA+IG1heFRhcmdldFdpZHRoIC8gbWF4VGFyZ2V0SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIGZpbmFsV2lkdGggPSBtYXhUYXJnZXRXaWR0aDtcclxuICAgICAgICAgICAgZmluYWxIZWlnaHQgPSBtYXhUYXJnZXRXaWR0aCAvIGltYWdlQXNwZWN0UmF0aW87XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZmluYWxIZWlnaHQgPSBtYXhUYXJnZXRIZWlnaHQ7XHJcbiAgICAgICAgICAgIGZpbmFsV2lkdGggPSBtYXhUYXJnZXRIZWlnaHQgKiBpbWFnZUFzcGVjdFJhdGlvO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRyYW5zbGF0aW9ucyBmb3IgY2VudGVyaW5nXHJcbiAgICAgICAgY29uc3Qgdmlld3BvcnRDZW50ZXJYID0gdmlld3BvcnRXaWR0aCAvIDI7XHJcbiAgICAgICAgY29uc3Qgdmlld3BvcnRDZW50ZXJZID0gdmlld3BvcnRIZWlnaHQgLyAyO1xyXG4gICAgICAgIGNvbnN0IGltYWdlQ2VudGVyWCA9IGltZ0JvdW5kcy5sZWZ0ICsgKGltZ0JvdW5kcy53aWR0aCAvIDIpO1xyXG4gICAgICAgIGNvbnN0IGltYWdlQ2VudGVyWSA9IGltZ0JvdW5kcy50b3AgKyAoaW1nQm91bmRzLmhlaWdodCAvIDIpO1xyXG4gICAgICAgIGNvbnN0IHRyYW5zbGF0ZVggPSB2aWV3cG9ydENlbnRlclggLSBpbWFnZUNlbnRlclg7XHJcbiAgICAgICAgY29uc3QgdHJhbnNsYXRlWSA9IHZpZXdwb3J0Q2VudGVyWSAtIGltYWdlQ2VudGVyWTtcclxuICAgICAgICBjb25zdCBzY2FsZWRPZmZzZXRYID0gKGZpbmFsV2lkdGggLSBpbWdCb3VuZHMud2lkdGgpIC8gMjtcclxuICAgICAgICBjb25zdCBzY2FsZWRPZmZzZXRZID0gKGZpbmFsSGVpZ2h0IC0gaW1nQm91bmRzLmhlaWdodCkgLyAyO1xyXG5cclxuICAgICAgICAvLyBTaG93IHByZXZpZXcgY29udGFpbmVyIGJ1dCBrZWVwIGJhY2tncm91bmQgaW5pdGlhbGx5IHRyYW5zcGFyZW50XHJcbiAgICAgICAgdGhpcy5lbGVtZW50cy5wcmV2aWV3LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIEdTQVAuc2V0KHRoaXMuZWxlbWVudHMucHJldmlld0JhY2tncm91bmQsIHsgb3BhY2l0eTogMCB9KTtcclxuICAgICAgICBHU0FQLnNldChpbWcsIHsgb3BhY2l0eTogMCB9KTtcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIHRpbWVsaW5lIGZvciB0aGUgYW5pbWF0aW9uXHJcbiAgICAgICAgY29uc3QgdGltZWxpbmUgPSBHU0FQLnRpbWVsaW5lKHtcclxuICAgICAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGltZy5kYXRhc2V0LmxhcmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGlnaFJlc0ltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGlnaFJlc0ltYWdlLnNyYyA9IGltZy5kYXRhc2V0LmxhcmdlO1xyXG4gICAgICAgICAgICAgICAgICAgIGhpZ2hSZXNJbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lLnNyYyA9IGltZy5kYXRhc2V0LmxhcmdlO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEdldCBhbGwgb3RoZXIgaW1hZ2VzXHJcbiAgICAgICAgY29uc3Qgb3RoZXJJbWFnZXMgPSBbLi4udGhpcy5lbGVtZW50cy5ncmlkLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZF9pdGVtXCIpXVxyXG4gICAgICAgICAgICAuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gZ3JpZEl0ZW0pO1xyXG5cclxuICAgICAgICAvLyBEZXRlcm1pbmUgZXhpdCBkaXJlY3Rpb24gYmFzZWQgb24gaW1hZ2UgcG9zaXRpb25cclxuICAgICAgICBjb25zdCBpc0xlZnQgPSBpbWFnZUNlbnRlclggPCB2aWV3cG9ydFdpZHRoIC8gMjtcclxuICAgICAgICBjb25zdCB0cmFuc2xhdGVPdXRYID0gaXNMZWZ0ID8gLXZpZXdwb3J0V2lkdGggOiB2aWV3cG9ydFdpZHRoO1xyXG5cclxuICAgICAgICAvLyBTdGFydCBhbGwgYW5pbWF0aW9ucyBhdCB0aGUgc2FtZSB0aW1lIHdpdGggZGlmZmVyZW50IGR1cmF0aW9uc1xyXG4gICAgICAgIHRpbWVsaW5lXHJcbiAgICAgICAgICAgIC50byhjbG9uZSwge1xyXG4gICAgICAgICAgICAgICAgeDogdHJhbnNsYXRlWCAtIHNjYWxlZE9mZnNldFgsXHJcbiAgICAgICAgICAgICAgICB5OiB0cmFuc2xhdGVZIC0gc2NhbGVkT2Zmc2V0WSxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiBmaW5hbFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBmaW5hbEhlaWdodCxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxLjIsXHJcbiAgICAgICAgICAgICAgICBlYXNlOiBcImV4cG8uaW5PdXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgcmV2ZXJzZUVhc2U6IGZhbHNlICAvLyBNYWtlcyBpdCB1c2UgcG93ZXIyLmluIHdoZW4gcmV2ZXJzaW5nXHJcblxyXG4gICAgICAgICAgICB9LCAwKVxyXG4gICAgICAgICAgICAudG8odGhpcy5lbGVtZW50cy5wcmV2aWV3QmFja2dyb3VuZCwge1xyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxLFxyXG4gICAgICAgICAgICAgICAgZWFzZTogXCJwb3dlcjIub3V0XCIsICAgICAgICByZXZlcnNlRWFzZTogZmFsc2UgIC8vIE1ha2VzIGl0IHVzZSBwb3dlcjIuaW4gd2hlbiByZXZlcnNpbmdcclxuXHJcbiAgICAgICAgICAgIH0sIDAuMikgLy8gU3RhcnQgYmFja2dyb3VuZCBmYWRlIHNsaWdodGx5IGFmdGVyIHRoZSBtb3ZlbWVudCBiZWdpbnNcclxuXHJcbiAgICAgICAgLy8gQW5pbWF0ZSBvdGhlciBpbWFnZXMgb3V0IHdpdGggc3RhZ2dlclxyXG4gICAgICAgIG90aGVySW1hZ2VzLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHRpbWVsaW5lLnRvKGl0ZW0sIHtcclxuICAgICAgICAgICAgICAgIHg6IHRyYW5zbGF0ZU91dFgsXHJcbiAgICAgICAgICAgICAgICB5OiAwLFxyXG4gICAgICAgICAgICAgICAgc2NhbGU6IDAuNSxcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMC44LFxyXG4gICAgICAgICAgICAgICAgZWFzZTogXCJleHBvLmluT3V0XCIsXHJcbiAgICAgICAgICAgICAgICBkZWxheTogaW5kZXggKiAwLjAyLCByZXZlcnNlRWFzZTogZmFsc2VcclxuICAgICAgICAgICAgfSwgMCk7IC8vIFN0YXJ0IGF0IHRoZSBzYW1lIHRpbWUgYXMgY2xvbmUgbW92ZW1lbnRcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZS50aW1lbGluZSA9IHRpbWVsaW5lO1xyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlUHJldmlldygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuaXNQcmV2aWV3T3BlbiB8fCAhdGhpcy5zdGF0ZS50aW1lbGluZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyB0aGlzLnN0YXRlLnRpbWVsaW5lLnRpbWVTY2FsZSgxLjUpOyAvLyBNYWtlcyB0aGUgcmV2ZXJzZSBhbmltYXRpb24gMS41eCBmYXN0ZXJcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gU2ltcGx5IHJldmVyc2UgdGhlIHRpbWVsaW5lXHJcbiAgICAgICAgdGhpcy5zdGF0ZS50aW1lbGluZS5yZXZlcnNlKCk7XHJcblxyXG5cclxuICAgICAgICAvLyBDbGVhbiB1cCBhZnRlciB0aGUgcmV2ZXJzZSBhbmltYXRpb24gY29tcGxldGVzXHJcbiAgICAgICAgdGhpcy5zdGF0ZS50aW1lbGluZS5ldmVudENhbGxiYWNrKFwib25SZXZlcnNlQ29tcGxldGVcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIEdTQVAuc2V0KHRoaXMuY3VycmVudEltYWdlLCB7IG9wYWNpdHk6IDEgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjbG9uZSA9IHRoaXMuZWxlbWVudHMucHJldmlldy5xdWVyeVNlbGVjdG9yKCcucHJldmlld19fdHJhbnNpdGlvbi1pbWFnZScpO1xyXG4gICAgICAgICAgICBpZiAoY2xvbmUpIGNsb25lLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzLnByZXZpZXcuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5pc1ByZXZpZXdPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuY3VycmVudEl0ZW0gPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlLnRpbWVsaW5lID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlc2V0IGFueSB0cmFuc2Zvcm1zIG9uIGdyaWQgaXRlbXNcclxuICAgICAgICAgICAgY29uc3QgZ3JpZEl0ZW1zID0gdGhpcy5lbGVtZW50cy5ncmlkLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZF9pdGVtXCIpO1xyXG4gICAgICAgICAgICBncmlkSXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIEdTQVAuc2V0KGl0ZW0sIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhclByb3BzOiBcImFsbFwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBkZXN0cm95KCkge1xyXG4gICAgICAgIHN1cGVyLmRlc3Ryb3koKTtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS50aW1lbGluZSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlLnRpbWVsaW5lLmtpbGwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleURvd24pO1xyXG4gICAgfVxyXG59IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiYjcxZTE3NWRjNTQwZmE4MzE5MzBcIikiXSwibmFtZXMiOlsiR2FsbGVyeSIsIl9QYWdlIiwiX3RoaXMiLCJfY2xhc3NDYWxsQ2hlY2siLCJfY2FsbFN1cGVyIiwiaWQiLCJlbGVtZW50IiwiZWxlbWVudHMiLCJncmlkIiwicHJldmlldyIsImdyaWRJdGVtcyIsInByZXZpZXdJbWFnZSIsInByZXZpZXdDbG9zZSIsInByZXZpZXdCYWNrZ3JvdW5kIiwic3RhdGUiLCJpc1ByZXZpZXdPcGVuIiwiY3VycmVudEl0ZW0iLCJ0aW1lbGluZSIsIl9pbmhlcml0cyIsImtleSIsInZhbHVlIiwiX3N1cGVyUHJvcEdldCIsInRoaXMiLCJzZXR1cEdhbGxlcnkiLCJhZGRFdmVudExpc3RlbmVycyIsImlubmVySFRNTCIsInF1ZXJ5U2VsZWN0b3IiLCJfdGhpczIiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsIml0ZW0iLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0Iiwib3BlblByZXZpZXciLCJjbG9zZVByZXZpZXciLCJ3aW5kb3ciLCJncmlkSXRlbSIsImltZyIsImN1cnJlbnRJbWFnZSIsImltZ0JvdW5kcyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInByZXZpZXdDb250YWluZXIiLCJjbG9uZSIsImNsb25lTm9kZSIsImNsYXNzTmFtZSIsInN0eWxlIiwicG9zaXRpb24iLCJsZWZ0IiwiY29uY2F0IiwidG9wIiwid2lkdGgiLCJoZWlnaHQiLCJvYmplY3RGaXQiLCJ0cmFuc2l0aW9uIiwiYXBwZW5kQ2hpbGQiLCJmaW5hbFdpZHRoIiwiZmluYWxIZWlnaHQiLCJ2aWV3cG9ydFdpZHRoIiwiaW5uZXJXaWR0aCIsInZpZXdwb3J0SGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJtYXhUYXJnZXRXaWR0aCIsIm1heFRhcmdldEhlaWdodCIsImltYWdlQXNwZWN0UmF0aW8iLCJ2aWV3cG9ydENlbnRlclgiLCJ2aWV3cG9ydENlbnRlclkiLCJpbWFnZUNlbnRlclgiLCJ0cmFuc2xhdGVYIiwidHJhbnNsYXRlWSIsInNjYWxlZE9mZnNldFgiLCJzY2FsZWRPZmZzZXRZIiwiZGlzcGxheSIsIkdTQVAiLCJzZXQiLCJvcGFjaXR5Iiwib25Db21wbGV0ZSIsImRhdGFzZXQiLCJsYXJnZSIsImhpZ2hSZXNJbWFnZSIsIkltYWdlIiwic3JjIiwib25sb2FkIiwib3RoZXJJbWFnZXMiLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJmaWx0ZXIiLCJ0cmFuc2xhdGVPdXRYIiwidG8iLCJ4IiwieSIsImR1cmF0aW9uIiwiZWFzZSIsInJldmVyc2VFYXNlIiwiaW5kZXgiLCJzY2FsZSIsImRlbGF5IiwiX3RoaXMzIiwicmV2ZXJzZSIsImV2ZW50Q2FsbGJhY2siLCJyZW1vdmUiLCJjbGVhclByb3BzIiwia2lsbCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJoYW5kbGVLZXlEb3duIiwiUGFnZSIsIl9fd2VicGFja19yZXF1aXJlX18iLCJoIl0sInNvdXJjZVJvb3QiOiIifQ==