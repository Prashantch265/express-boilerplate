const { createServer } = require("http");
const { Server } = require("socket.io");

module.exports = function (app) {
  const socketServer = createServer(app);
  const io = new Server(socketServer, {});

  io.on("connection", (socket) => {
    socket.on("connected", () => console.log("client connected"));
  });
};
