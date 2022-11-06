import { Socket } from "socket.io";
import { Message } from "../types/types";
import { v4 as uuid } from "uuid";

export class ChatHandler {
  socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }
  initializeEvents() {
    this.socket.on("send-message", this.sendMessage());
  }
  sendMessage() {
    return (message: Message) => {
      message.direction = "received";
      message.id = uuid();
      this.socket.broadcast.emit("receive-message", message);
    };
  }
}
