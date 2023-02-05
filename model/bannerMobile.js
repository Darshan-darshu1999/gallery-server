const mongoose = require("mongoose");

const bannerMobileSchema = mongoose.Schema({
  mobileId: mongoose.Schema.Types.ObjectId,
});

const BannerMobile = mongoose.model(
  "banner-mobile",
  bannerMobileSchema,
);

module.exports = BannerMobile;
