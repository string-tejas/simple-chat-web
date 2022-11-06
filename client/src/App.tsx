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

interface Message {
  text: string;
  direction: "sent" | "received" | "info";
}

interface User {
  name: string;
  room: string;
  id?: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const handleSendMessageClick = async (message: string) => {
    if (message.trim() === "") return;

    const newMessage: Message = {
      text: message,
      direction: "sent",
    };
    const updatedMessages = [...messages, newMessage];

    setMessages(updatedMessages);
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

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    console.log(newSocket);
    newSocket.on("connect", () => {
      if (newSocket.connected) {
        setSocket(newSocket);
      } else {
        setSocket(null);
      }
    });
  }, []);

  const saveUser = (name: string, room: string) => {
    const newUser: User = {
      name,
      room,
    };
    console.log(newUser);

    setUser(newUser);
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
