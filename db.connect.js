const mongoose = require("mongoose")

async function connectDb(url) {
    return mongoose.connect(url);
}
module.exports= {
    connectDb
}
