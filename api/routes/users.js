const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const upload = require("../middleware/uploadImages");
const { checkUsertoken } = require("../middleware/checkUserToken");

function userRouter(io) {
  function ioMiddleware(req, res, next) {
    (req.io = io), next();
  }
  io.on("connection", (socket) => {
    socket.emit("request", { data: "Socket connected" });
    socket.on("reply", (data) => {
      console.log("admin routes => ", data);
    });
  });
  router.post("/user-signup", userController.userSignup);
  router.post("/user-login", userController.userLogin);
  router.get("/get-user/:id", userController.getCurrentUser);

  return router;
}

let userRouterFile = {
  router: router,
  userRouter: userRouter,
};
module.exports = userRouterFile;
