import { Socket } from "socket.io";
import { Message } from "../types/types";

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
      console.log(message?.user?.name, "sent", message.text);
      this.socket.broadcast.emit("receive-message", message);
    };
  }
}
