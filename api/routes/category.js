const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category");
const upload = require("../middleware/uploadImages");

function categoryRouter(io) {
  function ioMiddleware(req, res, next) {
    (req.io = io), next();
  }
  io.on("connection", (socket) => {
    socket.emit("request", { data: "Socket connected" });
    socket.on("reply", (data) => {
      console.log("admin routes => ", data);
    });
  });

  router.post("/add-category", categoryController.addCategory);
  router.get("/get-category/:id", categoryController.getCategoryById);
  router.put("/update-category/:id", categoryController.updateCategory);
  router.delete("/delete-category/:id", categoryController.deletCategory);
  return router;
}

let categoryRouterFile = {
  router: router,
  categoryRouter: categoryRouter,
};
module.exports = categoryRouterFile;
