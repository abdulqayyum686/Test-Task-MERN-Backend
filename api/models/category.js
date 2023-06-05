const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  title: {
    type: String,
  },
  belongsTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

module.exports = mongoose.model("Category", categorySchema);
