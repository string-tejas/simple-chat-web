import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
require("dotenv").config();

const app = express();
const port = process.env.PORT;
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
});

httpServer.listen(port, () => {
  console.log(`Server started at Port ${port}`);
});
