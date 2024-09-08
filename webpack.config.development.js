import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { merge } from "webpack-merge";
import * as config from "./webpack.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default merge(config.default, {
  mode: "development",

  devtool: "inline-source-map",

  devServer: {
    devMiddleware: { writeToDisk: true },
  },

  output: {
    path: path.resolve(__dirname, "public"),
    clean: true,
    // assetModuleFilename: "images/[name][ext]",
  },
});
