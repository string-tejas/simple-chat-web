import { BottomBar, Scaffold, TopBar } from "./components/PageStructure";
import TextInput from "./components/TextInput";
import chatSvg from "./chat.svg";
import { useState } from "react";
import OverlayUserForm from "./components/OverlayUserForm";
import { Chat } from "./chat/Chat";
import { MessageHandler } from "./chat/MessageHandler";
import Messaging from "./components/Messaging";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chat, setChat] = useState<Chat | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const handleSendMessageClick = async (message: string) => {
    if (message.trim() === "") return;
    chat?.sendMessage(message);
  };

  const saveUser = (name: string, room: string) => {
    const newUser: User = {
      name,
      room,
    };
    const updateMessages = (messages: Message[]) => setMessages(messages);
    const newChat = new Chat(
      newUser,
      new MessageHandler(newUser, updateMessages)
    );
    setUser(newUser);
    setChat(newChat);
  };

  return (
    <Scaffold>
      <TopBar>
        <img src={chatSvg} alt="logo" /> Chat with socket.io
      </TopBar>
      <Messaging messages={messages} />
      <BottomBar>
        <TextInput onSendMessageClick={handleSendMessageClick} />
      </BottomBar>
      {!user && <OverlayUserForm onSubmit={saveUser} />}
    </Scaffold>
  );
}

export default App;
