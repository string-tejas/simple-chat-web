import React from "react";
import ChatCloud from "./ChatCloud";
import { MessagesArea } from "./PageStructure";

const Messaging: React.FC<{ messages: Message[] }> = ({ messages }) => {
  const tailLogic = (index: number) => {
    const currentMessage = messages[index];
    if (currentMessage.direction === "info") return false;
    if (index === messages.length - 1) return true;
    if (index - 1 < 0) return false;
    if (index + 1 === messages.length) return true;
    if (messages[index + 1].direction !== currentMessage.direction) return true;

    return false;
  };

  const nameLogic = (
    index: number,
    direction: "sent" | "received" | "info"
  ) => {
    if (direction !== "received") return false;
    if (index === 0) return true;
    if (index - 1 < 0) return false;
    if (messages[index - 1].direction === "sent") return true;
    if (messages[index - 1].direction === "info") return true;
    if (messages[index - 1].user?.id !== messages[index].user?.id) return true;
    if (messages[index - 1].user?.name !== messages[index].user?.name)
      return true;

    return false;
  };

  const getName = (index: number) => {
    const name = messages[index].user?.name;

    if (index === 0) return name;
    if (index - 1 < 0) return name;

    // name change
    const previous = messages[index - 1].user;
    const current = messages[index].user;
    if (previous?.id === current?.id && previous?.name !== current?.name)
      return previous?.name + " → " + current?.name;

    return name;
  };

  return (
    <MessagesArea>
      <div style={{ width: "100%", paddingTop: "0.7rem" }} />
      {messages
        .map((message, index) => {
          const showTail = tailLogic(index);
          const showName = nameLogic(index, message.direction);
          const name = getName(index);
          return (
            <ChatCloud
              showTail={showTail}
              direction={message.direction}
              key={message.id}
              name={name || null}
              showName={showName}
            >
              {message.text}
            </ChatCloud>
          );
        })
        .reverse()}
    </MessagesArea>
  );
};

export default Messaging;
