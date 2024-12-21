 const mongoose = require("mongoose");

 const urlSchema = new mongoose.Schema(
   {
     shortId: {
       type: String,
       unique: true,
       required: true,
     },
     redirectUrl: {
       type: String,
       required: true,
     },
   },
   {
     timestamps: true,
   }
 );

 module.exports = mongoose.model("Url", urlSchema);
