import {
  BottomBar,
  Scaffold,
  TopBar,
  UserChip,
} from "./components/PageStructure";
import TextInput from "./components/TextInput";
import chatSvg from "./chat.svg";
import { useState, useEffect } from "react";
import OverlayUserForm from "./components/OverlayUserForm";
import { Chat } from "./chat/Chat";
import { MessageHandler } from "./chat/MessageHandler";
import Messaging from "./components/Messaging";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chat, setChat] = useState<Chat | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showDialog, setShowDialog] = useState(true);

  const handleSendMessageClick = async (message: string) => {
    if (message.trim() === "") return;
    chat?.sendMessage(message);
  };

  const saveUser = (name: string, room: string) => {
    const newUser: User = {
      name,
      room,
    };

    if (user?.room === newUser.room) {
      setUser({ ...user, name: newUser.name });
      setShowDialog(false);
      return;
    }

    const updateMessages = (messages: Message[]) => setMessages(messages);
    const newChat = new Chat(
      newUser,
      new MessageHandler(newUser, updateMessages)
    );
    setUser(newUser);
    setChat(newChat);
    setShowDialog(false);
  };

  useEffect(() => {
    if (user) chat?.updateUser(user);
  }, [user]);

  return (
    <Scaffold>
      <TopBar>
        <img src={chatSvg} alt="logo" /> Chat with socket.io
        {user && (
          <UserChip onClick={() => setShowDialog(true)}>{user.name}</UserChip>
        )}
      </TopBar>
      <Messaging messages={messages} />
      <BottomBar>
        <TextInput onSendMessageClick={handleSendMessageClick} />
      </BottomBar>
      {showDialog && <OverlayUserForm onSubmit={saveUser} user={user} />}
    </Scaffold>
  );
}

export default App;
