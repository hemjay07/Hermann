import path from "path";
import { merge } from "webpack-merge";
import { fileURLToPath } from "url";

import * as config from "./webpack.config.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default merge(config.default, {
  mode: "production",

  output: {
    path: path.join(__dirname, "public"),
  },
});
