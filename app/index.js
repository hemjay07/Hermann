import _ from "lodash";

import Navigation from "./components/Navigation.js";
import Preloader from "./components/Preloader.js";
import Cursor from "./components/Cursor.js";

import Home from "./pages/Home/index.js";
import About from "./pages/About/index.js";
import Gallery from "./pages/Gallery/index.js";
import { inject } from '@vercel/analytics';
 
inject();

class App {
  constructor() {
    window.app = this;

    // This cache will contain the html of all the pages of the website mapped to the url for each page
    this.pageCache = new Map();

    this.createContent();
    this.createPages();
    this.createPreloader();
    this.createNavigation();

    this.addEventListeners();
    this.addLinkListeners();
    this.createCursor();
  }

  onPopState() {
    this.onChange({ url: window.location.pathname, push: false });
  }

  createContent() {
    this.content = document.querySelector(".content");
    this.template = this.content.getAttribute("data-template");
  }

  createPages() {
    this.pages = {
      home: new Home(),
      about: new About(),
      gallery: new Gallery(),
    };

    this.page = this.pages[this.template];
    this.page.create();
  }

  createPreloader() {
    this.preloader = new Preloader({
      template: this.template,
      page: this.page,
      cache: this.pageCache,
    });
    this.preloader.once("completed", this.onPreloaded.bind(this));
  }

  createNavigation() {
    this.navigation = new Navigation({ template: this.template });
  }

  createCursor() {
    if (this.cursor) {
      this.cursor.destroy();
    }
    this.cursor = new Cursor();
  }
  onPreloaded() {
    // console.log("All content preloaded");
  }

  async onChange({ url, push = true }) {
    await this.page.hide();

    // Get just the pathname part of the URL
    const pathname = new URL(url, window.location.origin).pathname;
    const cachedPage = this.pageCache.get(pathname);

    if (cachedPage) {
      console.log("page found in cache");
      if (push) {
        window.history.pushState({}, "", url);
      }

      this.template = cachedPage.template;
      this.content.setAttribute("data-template", this.template);
      this.content.innerHTML = cachedPage.html;

      this.page = this.pages[this.template];
      this.page.create();
      this.createCursor();
      await this.page.show();

      this.addLinkListeners();
    } else {
      const request = await window.fetch(url);
      if (request.status === 200) {
        const html = await request.text();
        const div = document.createElement("div");

        if (push) {
          window.history.pushState({}, "", url);
        }

        div.innerHTML = html;
        const divContent = div.querySelector(".content");
        this.template = divContent.getAttribute("data-template");
        this.content.setAttribute("data-template", this.template);
        this.content.innerHTML = divContent.innerHTML;

        // Cache with pathname
        this.pageCache.set(pathname, {
          html: divContent.innerHTML,
          template: this.template,
        });

        this.page = this.pages[this.template];
        this.page.create();
        this.createCursor();
        await this.page.show();

        this.addLinkListeners();
      }
    }
  }

  addLinkListeners() {
    const links = document.querySelectorAll(
      "a:not(.gallery_link, .about__social__item)"
    );

    console.log(links);

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
