import Page from "classes/Page.js";

export default class Home extends Page {
  constructor() {
    super({ id: "home", element: ".home", elements: {} });
  }

  create() {
    super.create();
  }
  // destroy() {
  //   super.destroy();
  // }
}
