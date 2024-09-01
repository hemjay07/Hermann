import _ from "lodash";

import Navigation from "./components/Navigation.js";
import Preloader from "./components/Preloader.js";

import Home from "./pages/Home/index.js";
import Contact from "./pages/Contact/index.js";
import Details from "./pages/Details/index.js";

class App {
  constructor() {
    this.createContent();
    this.createPages();
    this.createPreloader();
    this.createNavigation();

    this.addEventListeners();
    this.addLinkListeners();
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
      contact: new Contact(),
      details: new Details(),
    };

    this.page = this.pages[this.template];
    console.log(this.page);
    this.page.create();
  }

  createPreloader() {
    new Preloader();
  }

  createNavigation() {
    this.navigation = new Navigation({ template: this.template });
  }

  async onChange({ url, push = true }) {
    // this.canvas.onChangeStart(this.template, url);
    // console.log(url);
    await this.page.hide(); // Hide the current page before fetching the new page.

    // Once a link is clicked, instead of going to the routing to the page, we fetch the page and replace the content of the current page with the content of this new page.
    const request = await window.fetch(url);

    if (request.status === 200) {
      const html = await request.text();

      const div = document.createElement("div");

      if (push) {
        window.history.pushState({}, "", url);
      }

      div.innerHTML = html;

      // we want to replace only the content part. Other parts such as the doctype, navigation and things that are common to all pages should not be replaced.
      const divContent = div.querySelector(".content");
      this.template = divContent.getAttribute("data-template");

      // this.navigation.onChange(this.template);

      // Now subtitute the content of the current page with the content of the new page that was fetched.
      this.content.setAttribute("data-template", this.template);
      this.content.innerHTML = divContent.innerHTML;

      // Now we have to create the new page (create the elements that we want to animate or work on) and we want to animate the page in.
      this.page = this.pages[this.template];

      this.page.create();
      // this.onResize();

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
        event.preventDefault();

        const { href } = link;
        this.onChange({ url: href });
      };
    });
  }

  addEventListeners() {
    window.addEventListener("popstate", this.onPopState.bind(this));
  }
}

new App();
