const mongoose = require("mongoose");

const gallerySchema = mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true,
  },
  language: [
    {
      type: String,
      lowercase: true,
      trim: true,
    },
  ],
  category: [String],
  tags: [String],
  imageId: mongoose.Schema.Types.ObjectId,
});

const Gallery = mongoose.model("Gallery", gallerySchema);

module.exports = Gallery;
