const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  belongsTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
