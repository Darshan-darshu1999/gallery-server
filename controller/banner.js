const Banner = require("../model/banner");

const createImage = async (req, res) => {
  try {
    const bannerId = req.body.bannerId;

    console.log(1);

    const banner = await Banner({
      bannerId,
    });

    await banner.save();

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
    const banner = await Banner.find();

    res.status(200).json(banner);
  } catch (err) {
    console.log(err.message);
    res.status(200).json({ err: err.message });
  }
};

module.exports = {
  getImage,
  createImage,
};
