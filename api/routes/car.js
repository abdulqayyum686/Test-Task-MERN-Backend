const express = require("express");
const router = express.Router();
const carController = require("../controllers/car");
const upload = require("../middleware/uploadImages");
const checkUsertoken = require("../middleware/checkUserToken");

function carRouter(io) {
  function ioMiddleware(req, res, next) {
    (req.io = io), next();
  }
  io.on("connection", (socket) => {
    socket.emit("request", { data: "Socket connected" });
    socket.on("reply", (data) => {
      console.log("admin routes => ", data);
    });
  });

  router.post("/add-car", upload.single("file"), carController.addCar);
  router.get("/get-car/:id", carController.getCarById);
  router.put("/update-car/:id", upload.single("file"), carController.updateCar);
  router.delete("/delete-car/:id", carController.deletCar);

  return router;
}

let carRouterFile = {
  router: router,
  carRouter: carRouter,
};
module.exports = carRouterFile;
