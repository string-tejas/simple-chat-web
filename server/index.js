const express = require("express");
const socket = require("socket.io");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const app = express();

app.listen(PORT, () => {
  console.log(`Starting server on port ${PORT}...`);
});
