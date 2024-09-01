import Page from "classes/Page.js";

export default class Details extends Page {
  constructor() {
    super({ id: "details", element: ".details", elements: {} });
  }

  create() {
    super.create();
  }
  // destroy() {
  //   super.destroy();
  // }
}
