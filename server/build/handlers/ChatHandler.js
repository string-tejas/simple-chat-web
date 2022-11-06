"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatHandler = void 0;
const uuid_1 = require("uuid");
class ChatHandler {
    constructor(socket) {
        this.socket = socket;
    }
    initializeEvents() {
        this.socket.on("send-message", this.sendMessage());
        this.socket.on("join-room", this.joinRoom());
    }
    joinRoom() {
        return (user, cb) => {
            this.socket.join(user.room);
            const roomJointNotif = {
                direction: "info",
                text: `${user.name} joined`,
                id: (0, uuid_1.v4)(),
            };
            this.socket.to(user.room).emit("receive-message", roomJointNotif);
            if (cb)
                cb();
        };
    }
    sendMessage() {
        return (message) => {
            var _a, _b;
            message.direction = "received";
            message.id = (0, uuid_1.v4)();
            if ((_a = message.user) === null || _a === void 0 ? void 0 : _a.room)
                this.socket.to((_b = message.user) === null || _b === void 0 ? void 0 : _b.room).emit("receive-message", message);
            else
                this.socket.broadcast.emit("receive-message", message);
        };
    }
}
exports.ChatHandler = ChatHandler;
