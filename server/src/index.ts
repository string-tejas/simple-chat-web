import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { ChatHandler } from "./handlers/ChatHandler";
require("dotenv").config();

const app = express();
const port = process.env.PORT;
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "https://simple-chat-web.vercel.app/"],
  },
});

io.on("connection", (socket) => {
  const chat = new ChatHandler(socket);
  chat.initializeEvents();
});

httpServer.listen(port, () => {
  console.log(`Server started at Port ${port}`);
});
