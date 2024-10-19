import Page from "classes/Page.js";

export default class Gallery extends Page {
    constructor() {
        super({ id: "gallery", element: ".gallery", elements: {} });
    }

    create() {
        super.create();
    }
    // destroy() {
    //   super.destroy();
    // }
}
