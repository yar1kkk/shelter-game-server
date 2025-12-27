const { createServer } = require("node:http");
const { Server } = require("socket.io");
const app = require("./app");
const initSockets = require("./src/sockets");
const Redis = require("ioredis");

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const lobbies = {};
initSockets(io, lobbies);

const PORT = process.env.APP_PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on some port`);
});
