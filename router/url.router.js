// const express = require("express");
// const router = express.Router();
// const { handleGenerateUrl } = require("../controllers/url.controller.js");

// // Route to shorten a URL
// router.post("/shorten", handleGenerateUrl);

// module.exports = router;
const express = require("express");
const router = express.Router();
const Url = require("../models/url.model.js");
const shortid = require("shortid");

// POST route to shorten the URL
router.post("/shorten", async (req, res) => {
  try {
    const longUrl = req.body.longUrl;

    if (!longUrl) {
      return res.status(400).send("Long URL is required");
    }

    // Generate short ID
    const shortId = shortid.generate();

    // Save to the database
    await Url.create({
      longUrl,
      shortId,
      redirectUrl: longUrl,
    });

    // Redirect to the short URL display page
    res.redirect(`/shorturl?shortId=${shortId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
