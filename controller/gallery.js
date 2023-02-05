const { ObjectId } = require("mongodb");
const Gallery = require("../model/gallery");

const createImage = async (req, res) => {
  try {
    const name = req.body.name;
    const language = req.body.language;
    const tags = req.body.tags;
    const category = req.body.category;
    const imageId = req.body.imageId;

    const gallery = await Gallery({
      name,
      language,
      tags,
      category,
      imageId,
    });

    console.log("Done1");

    await gallery.save();
    console.log("Done2");

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
    const gallery = await Gallery.find();

    res.status(200).json(gallery);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ err: err.message });
  }
};

const getImages = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const gallery = await Gallery.findById(id);

    res.status(200).json(gallery);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const updateLanguage = async (req, res, next) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    gallery.language.push(req.body.language);

    await gallery.save();
  } catch (err) {
    console.log(err);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    gallery.category.push(req.body.category);

    await gallery.save();
  } catch (err) {
    console.log(err);
  }
};

const updateTags = async (req, res, next) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    gallery.tags.push(req.body.tags);

    await gallery.save();
  } catch (err) {
    console.log(err);
  }
};

const updateImage = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = Object.keys(req.body);
    const updateField = [
      "name",
      "imageUrl",
      "language",
      "category",
      "tags",
    ];
    const isValid = updates.every((update) =>
      updateField.includes(update),
    );

    const gallery = await Gallery.findById(id);

    if (!id || !gallery) {
      throw new Error(
        "please provide the id to update the gallery or id is not present",
      );
    }

    if (!isValid) {
      throw new Error(
        "Please enter the valid input to update",
      );
    }

    updates.forEach((update) => {
      gallery[update] = req.body[update];
    });

    await gallery.save();

    res.status(200).json(gallery);
  } catch (e) {
    res.status(500).send({ err: e.message });
  }
};

const deleteImage = async (req, res, next) => {
  const id = req.params.id;
  try {
    if (!id) {
      throw new Error("please provide details to delete");
    }

    const gallery = await Gallery.findById(id);

    await gallery.remove();

    res.status(200).json(gallery);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
  getImage,
  getImages,
  createImage,
  updateImage,
  updateCategory,
  updateTags,
  updateLanguage,
  deleteImage,
};
