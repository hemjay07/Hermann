import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Initialize Express app
const app = express();

// Set Pug as the view engine
app.set("view engine", "pug");

// Determine the __dirname equivalent in ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log(__dirname);
// /Users/hem-jay/Desktop/Hermann

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Define a route to render the "base" Pug template
app.get("/", (req, res) => {
  res.render("pages/home");
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
