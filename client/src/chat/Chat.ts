import io, { Socket } from "socket.io-client";
import { MessageHandler } from "./MessageHandler";

export class Chat {
  user: User;
  handler: MessageHandler;
  socket: Socket;

  constructor(user: User, handler: MessageHandler) {
    this.user = user;
    // this.socket = io("http://localhost:5000");
    this.socket = io("https://simple-chat-web-backend.herokuapp.com");
    this.handler = handler;

    this.initializeEvents();
  }

  // events
  initializeEvents() {
    this.socket.on("connect", this.onConnect());
    this.socket.on("receive-message", this.onReceive());
  }

  onConnect(): () => void {
    return () => {
      this.user.id = this.socket.id;
      this.joinRoom();
    };
  }

  joinRoom() {
    this.socket.emit("join-room", this.user, () => {
      this.handler.append(
        this.handler.getInfoMessage(`You are connected to ${this.user.room}`)
      );
    });
  }
  onReceive(): (message: Message) => void {
    return (message) => {
      this.handler.append(message);
    };
  }

  sendMessage(text: string) {
    const message = this.handler.prepareSendMessage(text);
    message.user = this.user;
    message.id = this.user.id + ":" + Date.now();
    this.socket.emit("send-message", message);
    this.handler.append(message);
  }

  updateUser(updatedUser: User) {
    const id = this.user.id;
    this.user = updatedUser;
    this.user.id = id;
  }
}
