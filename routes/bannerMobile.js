const express = require("express");
const {
  getImage,
  createImage,
} = require("../controller/bannerMobile");

const router = express.Router();

router.post("/", createImage);
router.get("/", getImage);

module.exports = router;
