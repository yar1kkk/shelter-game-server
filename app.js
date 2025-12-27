const express = require("express");
const roomsController = require("./src/routes/rooms");

// Middleware to add firebase admin SDK

// TODO: Remove it if database is not needed in the backends
// require("./src/configs/firebase");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/rooms", roomsController);

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

module.exports = app;
