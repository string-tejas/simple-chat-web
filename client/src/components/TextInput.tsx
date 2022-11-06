import React, { useState } from "react";
import styled from "styled-components";
import colors from "./color";
import sendSvg from "./send.svg";

const TextInput: React.FC<{
  onSendMessageClick: (message: string) => Promise<void>;
}> = ({ onSendMessageClick }) => {
  const [message, setMessage] = useState<string>("");

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendButtonClick: React.FormEventHandler<HTMLElement> = async (
    e
  ) => {
    e.preventDefault();
    await onSendMessageClick(message);
    setMessage("");
  };

  return (
    <Container onSubmit={handleSendButtonClick}>
      <TextField
        value={message}
        onChange={handleTextChange}
        placeholder="Send a message..."
      />
      <Button type="submit">
        <img src={sendSvg} alt="send icon" />
      </Button>
    </Container>
  );
};

export default TextInput;

// styles
const Container = styled.form`
  display: flex;
  background-color: ${colors.grayGreen};
  padding: 0.5rem 1rem;
  gap: 0.5rem;
`;

const TextField = styled.input`
  background-color: ${colors.gray};
  padding: 0.5rem 1.3rem;
  border-radius: 999px;
  outline: none;
  border: none;
  font-size: 1.1rem;
  flex-grow: 1;
  color: #eaeaea;
  min-width: 0px;
`;
const Button = styled.button`
  background-color: ${colors.greenTeal};
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  cursor: pointer;
  transition: 250ms;

  & > img {
    transform: translateX(2px);
  }

  &:hover {
    background-color: ${colors.greenTealDark};
  }
  &:active {
    transform: scale(0.9);
  }
`;
