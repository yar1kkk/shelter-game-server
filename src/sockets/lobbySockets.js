module.exports = (socket, io, lobbies) => {
  socket.on("joinRoom", (roomId, playerId) => {
    socket.join(roomId);

    if (!lobbies[roomId]) lobbies[roomId] = new Set();
    lobbies[roomId].add(playerId);

    console.log(lobbies);

    io.to(roomId).emit("lobbyUpdate", {
      players: Array.from(lobbies[roomId]),
    });
  });

  socket.on("leaveRoom", (roomId, playerId) => {
    socket.leave(roomId, playerId);

    if (lobbies[roomId]) {
      lobbies[roomId].delete(playerId);
      if (lobbies[roomId].size === 0) delete lobbies[roomId];
    }

    io.to(roomId).emit("lobbyUpdate", {
      players: Array.from(lobbies[roomId] || []),
    });
  });
};
