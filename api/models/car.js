const mongoose = require("mongoose");

const carSchema = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  file: {
    type: String,
  },
  milage: {
    type: String,
  },
  year: {
    type: String,
  },
  color: {
    type: String,
  },
  model: {
    type: String,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  belongsTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

module.exports = mongoose.model("Car", carSchema);
