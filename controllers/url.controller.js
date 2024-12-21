const shortid = require("shortid");
const Url = require("../models/url.model.js");

// Generate a short URL and save it in the database
async function handleGenerateUrl(req, res) {
  try {
    const longUrl = req.body.longUrl;
    console.log("longUrl:", req.body);
    
    if (!longUrl) {
      return res.status(400).json({ error: "Long URL is required" });
    }

    // Generate short ID
    const shortId = shortid.generate();

    // Save to the database
    const newUrl = await Url.create({
      longUrl,
      shortId,
      redirectUrl: longUrl,
    });

    return res.status(201).json({
      shortId: newUrl.shortId,
      longUrl: newUrl.longUrl,
    });
  } catch (error) {
    console.error("Error in handleGenerateUrl:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  handleGenerateUrl,
};
