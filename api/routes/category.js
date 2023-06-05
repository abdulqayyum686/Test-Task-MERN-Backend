const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category");
const upload = require("../middleware/uploadImages");
const checkUsertoken = require("../middleware/checkUserToken");

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

  router.post(
    "/add-category",
    checkUsertoken(),
    categoryController.addCategory
  );
  router.get(
    "/get-category/:id",
    checkUsertoken(),
    categoryController.getCategoryById
  );
  router.put(
    "/update-category/:id",
    checkUsertoken(),
    categoryController.updateCategory
  );
  router.delete(
    "/delete-category/:id",
    checkUsertoken(),
    categoryController.deletCategory
  );
  return router;
}

let categoryRouterFile = {
  router: router,
  categoryRouter: categoryRouter,
};
module.exports = categoryRouterFile;
