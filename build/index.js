"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const ChatHandler_1 = require("./handlers/ChatHandler");
const cors_1 = __importDefault(require("cors"));
require("dotenv").config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: ["http://localhost:3000", "https://simple-chat-web.vercel.app"],
    },
});
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "https://simple-chat-web.vercel.app"],
}));
io.on("connection", (socket) => {
    const chat = new ChatHandler_1.ChatHandler(socket);
    chat.initializeEvents();
});
httpServer.listen(port, () => {
    console.log(`Server started at Port ${port}`);
});
