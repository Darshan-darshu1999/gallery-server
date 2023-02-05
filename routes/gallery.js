const express = require("express");
const {
  getImage,
  createImage,
  deleteImage,
  updateImage,
  getImages,
  updateLanguage,
  updateCategory,
  updateTags,
} = require("../controller/gallery");

const router = express.Router();

router.post("/", createImage);
router.get("/", getImage);
router.get("/:id", getImages);
router.patch("/:id", updateImage);
router.put("/language/:id", updateLanguage);
router.put("/category/:id", updateCategory);
router.put("/tags/:id", updateTags);

router.delete("/:id", deleteImage);

module.exports = router;
