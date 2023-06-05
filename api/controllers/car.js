const carSchema = require("../models/car");
//category controllers
module.exports.addCar = async (req, res) => {
  console.log("addCar", req.body);
  let file = null;

  if (req.file.filename != undefined) {
    file = `/img/${req.file.filename}`;
  }
  try {
    const add_car = new carSchema({
      ...req.body,
      file,
    });
    const response = await add_car.save();
    if (response) {
      res
        .status(200)
        .json({ message: "Data addeded successfully", game: response });
    } else {
      res.status(500).json({ error: "game does not add" });
    }
  } catch (error) {
    console.log("Data addeded  api error", error);
  }
};
exports.getCarById = async (req, res) => {
  try {
    let data = await carSchema
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
exports.updateCar = async (req, res) => {
  try {
    let file = null;

    if (req.file) {
      file = `/img/${req.file.filename}`;
    }
    let data = await carSchema.findOneAndUpdate(
      { _id: req.params.id },
      {
        ...req.body,
        file: file ? file : null,
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
exports.deletCar = async (req, res) => {
  try {
    let data = await carSchema.findOneAndDelete({ _id: req.params.id });

    if (data) {
      res.status(200).json({
        message: "This car has been delete",
        data,
      });
    } else {
      console.log("no any car exit in data base");
    }
  } catch (err) {
    console.log("error", err);
  }
};
