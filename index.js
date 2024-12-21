require("dotenv").config();
const express = require("express");
const app = express();
const urlRoute = require("./router/url.router.js");
const { connectDb } = require("./db.connect.js");
const Url = require("./models/url.model.js");

const PORT = process.env.PORT || 8000;
const DBURL = process.env.DBURL;

// Middleware for JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set("view engine", "ejs");

// Connect to MongoDB
connectDb(`${DBURL}/shortUrl`)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

// Route to serve the homepage (index.ejs)
app.get("/", (req, res) => {
  res.render("index"); // Serves the index.ejs file
});

// Route to serve the short URL page (shortid.ejs)
app.get("/shorturl", (req, res) => {
  const shortId = req.query.shortId; // Extract shortId from query parameters

  if (!shortId) {
    return res.status(400).send("Short ID is required");
  }

  // Construct the full shortened URL
  const shortUrl = `${req.protocol}://${req.get("host")}/${shortId}`;

  // Pass shortUrl to the EJS template
  res.render("shortid", { shortUrl });
});

// Endpoint to handle short ID redirection
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const entry = await Url.findOne({ shortId });
    if (!entry) {
      return res.status(404).send("Short URL not found");
    }
    res.redirect(entry.redirectUrl);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// URL router for additional API routes
app.use("/url", urlRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
