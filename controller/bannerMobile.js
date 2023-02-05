const BannerMobile = require("../model/bannerMobile");

const createImage = async (req, res) => {
  console.log(req.file);
  try {
    const mobileId = req.body.mobileId;

    const bannerMobile = await BannerMobile({
      mobileId,
    });

    await bannerMobile.save();

    res.status(201).json({
      message: "Success",
    });
  } catch (err) {
    console.log("failed");
    console.log(err.message, "failed");
    res.status(400).json({ err: err.message });
  }
};

const getImage = async (req, res, next) => {
  try {
    const bannerMobile = await BannerMobile.find();

    res.status(200).json(bannerMobile);
  } catch (err) {
    console.log(err.message);
    res.status(200).json({ err: err.message });
  }
};

module.exports = {
  getImage,
  createImage,
};
