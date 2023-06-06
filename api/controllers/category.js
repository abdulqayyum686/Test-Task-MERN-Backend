const categorySchema = require("../models/category");
//category controllers
module.exports.addCategory = async (req, res) => {
  console.log("addCategory", req.body);
  const { title, belongsTo } = req.body;

  try {
    const found_category = await categorySchema.findOne({
      title,
    });
    console.log("lali", found_category);
    if (found_category) {
      res.status(500).json({ message: "Category alredy exist" });
    } else {
      const add_category = new categorySchema({
        title,
        belongsTo,
      });
      const response = await add_category.save();
      if (response) {
        res
          .status(200)
          .json({ message: "Data addeded successfully", category: response });
      } else {
        res.status(500).json({ error: "category does not add" });
      }
    }
  } catch (error) {
    console.log("Data addeded  api error", error);
  }
};
exports.getCategoryById = async (req, res) => {
  try {
    let data = await categorySchema
      .find({ belongsTo: req.params.id })
      .populate("belongsTo");
    if (data) {
      res.status(200).json({
        data,
      });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ error: err });
  }
};
exports.updateCategory = async (req, res) => {
  try {
    let data = await categorySchema.findOneAndUpdate(
      { _id: req.params.id },
      {
        ...req.body,
      },
      {
        new: true,
      }
    );

    if (data) {
      res.status(201).json({ message: "category has been update succesfully" });
    } else {
      res
        .status(500)
        .json({ message: "category not update plase check your script" });
    }
  } catch (error) {
    console.log("update category api have error plases check your code", error);
  }
};
exports.deletCategory = async (req, res) => {
  try {
    let data = await categorySchema.findOneAndDelete({ _id: req.params.id });

    if (data) {
      res.status(200).json({
        message: "This category has been delete",
        data,
      });
    } else {
      console.log("no any category exit in data base");
    }
  } catch (err) {
    console.log("error", err);
  }
};
