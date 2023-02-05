const mongoose = require("mongoose");

const bannerSchema = mongoose.Schema({
  bannerId: mongoose.Schema.Types.ObjectId,
});

const Banner = mongoose.model("banner", bannerSchema);

module.exports = Banner;
