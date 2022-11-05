import {
  BottomBar,
  MessagesArea,
  Scaffold,
  TopBar,
} from "./components/PageStructure";
import TextInput from "./components/TextInput";
import chatSvg from "./chat.svg";
import ChatCloud from "./components/ChatCloud";
import { Fragment, useState } from "react";

interface Message {
  text: string;
  direction: "sent" | "received" | "info";
}

const testmessages: Message[] = [
  {
    text: "Hello",
    direction: "received",
  },
  {
    text: "How are You ??",
    direction: "received",
  },
  {
    text: "This is bob",
    direction: "received",
  },
  {
    text: "Hi bob ",
    direction: "sent",
  },
  {
    text: "John here",
    direction: "sent",
  },
  {
    text: "Hi John ! how you've been are you good ? Everything going alright",
    direction: "received",
  },
];

function App() {
  const [messages, setMessages] = useState<Message[]>(testmessages);

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
    </Scaffold>
  );
}

export default App;
