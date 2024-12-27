import _ from "lodash";

import Navigation from "./components/Navigation.js";
import Preloader from "./components/Preloader.js";
import Cursor from "./components/Cursor.js";

// import img1 from "/assets/images/Hermann1.jpg";

import Home from "./pages/Home/index.js";
import About from "./pages/About/index.js";
import Details from "./pages/Details/index.js";
import Gallery from "./pages/Gallery/index.js";

class App {
  constructor() {   
   window.app = this;

    this.createContent();
    this.createPages();
    // this.createPreloader();
    this.createNavigation();

    this.addEventListeners();
    this.addLinkListeners();
    this.createCursor();

    this.galleries= []
    this.currentGalleryIndex= -1;



    // console.log('App initialized, window.app set:', window.app); // Debug log

  }



  // this tells the browser that you are just going to the url(using the back or forward button) but there is no need to push that url to the history. Rather than delibrate state change within the application that would normallu use "push state"
  onPopState() {
    this.onChange({ url: window.location.pathname, push: false });

    console.log("pop state");
  }

  createContent() {
    this.content = document.querySelector(".content");
    this.template = this.content.getAttribute("data-template");
  }

  createPages() {
    this.pages = {
      home: new Home(),
      about: new About(),
      details: new Details(),
      gallery:new Gallery()
    };

    this.page = this.pages[this.template]; 
        console.log(this.page);

    this.page.create();
  }

  createPreloader() {
    this.preloader = new Preloader();
    this.preloader.once("completed", this.onPreloaded)
  }

  createNavigation() {
    this.navigation = new Navigation({ template: this.template });
  }
  createCursor() {
    this.cursor = new Cursor();
  }

  onPreloaded (){
console.log("Preloaded")
  }


  async onChange({ url, push = true }) {
    await this.page.hide(); // Hide the current page before fetching the new page.

    // Once a link is clicked, instead of routing to the page,fetch the page and
    //  replace the content of the current page with the content of this new page.
    const request = await window.fetch(url);

    if (request.status === 200) {
      const html = await request.text();
      const div = document.createElement("div");

      if (push) {
        window.history.pushState({}, "", url);
      }
      div.innerHTML = html;

      // Replace only the content part. Other parts such as the doctype,
      //  navigation that are common to all pages should not be replaced.
      const divContent = div.querySelector(".content");
      this.template = divContent.getAttribute("data-template");

      //Subtitute the content of the current page with the content of the new page that was fetched.
      this.content.setAttribute("data-template", this.template);
      this.content.innerHTML = divContent.innerHTML;

      // Now we have to create the new page.
      this.page = this.pages[this.template];
      
      this.page.create();
      this.createCursor()
      this.page.show();

      // update the list of links since we have new links in the new page.
      this.addLinkListeners();
    } else {
      console.log("Error");
    }
  }

  addLinkListeners() {
    const links = document.querySelectorAll("a");

    _.forEach(links, (link) => {
      link.onclick = (event) => {
        // Check if this is a gallery link on the home page
        const isGalleryLink = link.classList.contains('gallery_link');
        // const isHomePage = this.template === 'home';

        // If it's not a gallery link or we're not on home page, handle normally
        if (!isGalleryLink ) {
          event.preventDefault();
          const { href } = link;
          this.onChange({ url: href });
        } else {
          // If it's a gallery link on home page, prevent default and let the
          // Home class handle the click event and animation
          event.preventDefault();
          // The click handler in Home class will take care of the rest
        }
      };
    });
  }

  addEventListeners() {
    window.addEventListener("popstate", this.onPopState.bind(this));
  }
}

new App();
