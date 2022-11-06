export class MessageHandler {
  messages: Message[];
  setMessages: (newMsgs: Message[]) => void;

  constructor(user: User, setMessages: (newMsgs: Message[]) => void) {
    this.messages = [];
    this.setMessages = setMessages;
  }

  append(message: Message) {
    this.messages.push(message);
    this.setMessages([...this.messages]);
  }

  getInfoMessage(text: string): Message {
    return {
      direction: "info",
      text,
      id: Date.now().toString(),
    } as Message;
  }
  prepareSendMessage(text: string): Message {
    return {
      direction: "sent",
      text,
    };
  }
}
