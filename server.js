const http = require("http");
const express = require("express");
// const app = express();
require("events").EventEmitter.prototype._maxListeners = 100;
const app = require("./app");
var cors = require("cors");

const userRouterFile = require("./api/routes/users");
const categoryRouterFile = require("./api/routes/category");
const carRouterFile = require("./api/routes/car");

///cors issuenpm start
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    // origin: 'https://www.helpros.app/api/',
    // methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // credentials: true,
  },
});

userRouterFile.userRouter(io);
categoryRouterFile.categoryRouter(io);
carRouterFile.carRouter(io);

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

const port = process.env.port || 6002;
server.listen(port, "0.0.0.0", () => {
  console.log(`Server Started At PORT : ${port} {my-session  Project Backend}`);
});

module.exports = server;
