export interface Message {
  id?: string;
  text: string;
  direction: "sent" | "received" | "info";
  user?: User;
}

export interface User {
  name: string;
  room: string;
  id?: string;
}
