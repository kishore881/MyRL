const mongoose = require("mongoose");

var urlSchema = new mongoose.Schema();
urlSchema = {
  urlCode: String,
  oldUrl: String,
  newUrl: String,
  date: { type: String, default: Date.now() }
};

module.exports = mongoose.model("Myrl", urlSchema);
