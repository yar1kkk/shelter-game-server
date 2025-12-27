const lobbySockets = require("./lobbySockets");

const initSockets = (io, lobbies) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    lobbySockets(socket, io, lobbies);

    socket.on("disconnect", (playerId) => {
      socket.broadcast.emit("newPlayerleaveRoom", playerId);

      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports = initSockets;
