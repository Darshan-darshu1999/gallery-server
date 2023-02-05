const express = require("express");
const {
  getImage,
  createImage,
} = require("../controller/banner");

const router = express.Router();

router.post("/", createImage);
router.get("/", getImage);

module.exports = router;
