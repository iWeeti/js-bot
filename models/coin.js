const mongoose = require("mongoose");

const coinSchema = mongoose.Schema({
    coins: Number,
    userID: String,
    guildID: String
});

module.exports = mongoose.model("Coin", coinSchema);