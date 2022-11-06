import { Socket } from "socket.io";
import { Message, User } from "../types/types";
import { v4 as uuid } from "uuid";

export class ChatHandler {
  socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }
  initializeEvents() {
    this.socket.on("send-message", this.sendMessage());
    this.socket.on("join-room", this.joinRoom());
  }
  joinRoom() {
    return (user: User, cb?: () => void) => {
      this.socket.join(user.room);
      const roomJointNotif: Message = {
        direction: "info",
        text: `${user.name} joined`,
        id: uuid(),
      };
      this.socket.to(user.room).emit("receive-message", roomJointNotif);
      if (cb) cb();
    };
  }
  sendMessage() {
    return (message: Message) => {
      message.direction = "received";
      message.id = uuid();
      if (message.user?.room)
        this.socket.to(message.user?.room).emit("receive-message", message);
      else this.socket.broadcast.emit("receive-message", message);
    };
  }
}
