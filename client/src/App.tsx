import {
  BottomBar,
  MessagesArea,
  Scaffold,
  TopBar,
} from "./components/PageStructure";
import TextInput from "./components/TextInput";
import chatSvg from "./chat.svg";
import ChatCloud from "./components/ChatCloud";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Socket } from "socket.io-client/build/esm/socket";
import OverlayUserForm from "./components/OverlayUserForm";
import { Chat } from "./chat/Chat";
import { MessageHandler } from "./chat/MessageHandler";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chat, setChat] = useState<Chat | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const handleSendMessageClick = async (message: string) => {
    if (message.trim() === "") return;
    chat?.sendMessage(message);
  };

  const tailLogic = (index: number) => {
    const currentMessage = messages[index];
    if (currentMessage.direction === "info") return false;
    if (index === messages.length - 1) return true;
    if (index - 1 < 0) return false;
    if (index + 1 === messages.length) return true;
    if (messages[index + 1].direction !== currentMessage.direction) return true;

    return false;
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
        <img src={chatSvg} /> Chat with socket.io
      </TopBar>
      <MessagesArea>
        <>
          <div style={{ width: "100%", paddingTop: "0.7rem" }} />
          {messages
            .map((message, index) => {
              const showTail = tailLogic(index);
              return (
                <ChatCloud
                  showTail={showTail}
                  direction={message.direction}
                  key={message.text}
                >
                  {message.text}
                </ChatCloud>
              );
            })
            .reverse()}
        </>
      </MessagesArea>
      <BottomBar>
        <TextInput onSendMessageClick={handleSendMessageClick} />
      </BottomBar>
      {!user && <OverlayUserForm onSubmit={saveUser} />}
    </Scaffold>
  );
}

export default App;
