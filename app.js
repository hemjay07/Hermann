import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import errorHandler from "errorHandler"; 
import bodyParser from "body-parser"; 
import methodOverride from "method-override"; 
import logger from "morgan"

import PrismicDOM from "prismic-dom";
import * as Prismic from "@prismicio/client";

import dotenv from "dotenv";
dotenv.config(); 


// Initialize Express app
const app = express();

// Set Pug as the view engine
app.set("view engine", "pug");

// Determine the __dirname equivalent in ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const initApi = (req) => {
  return Prismic.createClient(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req,
  });
};

app.use(logger("dev")); // Using morgan's dev format for logging HTTP requests
app.use(bodyParser.json()); // Parsing incoming requests with JSON payloads
app.use(bodyParser.urlencoded({ extended: false })); // Parsing incoming requests with URL-encoded payloads
app.use(methodOverride()); // Allows use of HTTP verbs such as PUT or DELETE
app.use(errorHandler()); // Catching and handling errors globally
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the public directory

// Define a route to render the "base" Pug template
app.get("/", async (req, res) => {
  const api =  initApi(req);

  const galleries =await api.getAllByType("gallery"); // Fetching all galleries from Prismic

 
  // console.log("galleries",galleries)
  res.render("pages/home",{
    galleries
  });
});

app.get("/contact", (req, res) => {
  res.render("pages/contact");
});

app.get("/details", (req, res) => {
  res.render("pages/details");
});
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
