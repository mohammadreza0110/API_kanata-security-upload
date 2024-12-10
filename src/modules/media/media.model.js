const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const MediaSchema = new Schema({
  fileName: { type: String, required: true },
  fileHash: { type: String, required: true, unique: true },
  filePath: { type: String, required: true },
  dateUploaded: { type: Date, default: Date.now },
});

const MediaModel = model("Media", MediaSchema);

module.exports = MediaModel;
