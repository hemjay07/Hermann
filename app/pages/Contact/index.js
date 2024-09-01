import Page from "classes/Page.js";

export default class Contact extends Page {
  constructor() {
    super({ id: "contact", element: ".contact", elements: {} });
  }

  create() {
    super.create();
  }
  // destroy() {
  //   super.destroy();
  // }
}
