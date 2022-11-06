import styled from "styled-components";
import colors from "./color";
import DialogInput from "./DialogInput";
import { useState } from "react";

const OverlayUserForm: React.FC<{
  onSubmit?: (name: string, room: string) => void;
}> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (onSubmit) onSubmit(name, room);
  };
  return (
    <BackDrop>
      <DialogContainer onSubmit={handleSubmit}>
        <DialogTitle>Enter Details</DialogTitle>
        <DialogInput
          label="Name"
          value={name}
          onChange={(updated) => setName(updated)}
        />
        <DialogInput
          label="Room"
          value={room}
          onChange={(updated) => setRoom(updated)}
        />

        <DialogButton
          style={{ marginTop: "1rem" }}
          disabled={name === "" || room === ""}
        >
          Join
        </DialogButton>
      </DialogContainer>
    </BackDrop>
  );
};

// styles
const BackDrop = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  display: block;
  background-color: rgb(0 0 0 / 50%);
  z-index: 20;
`;

const DialogContainer = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(95%, 370px);
  transform: translate(-50%, -50%);
  background-color: ${colors.gray};
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
`;

const DialogTitle = styled.h1`
  font-size: 1.3rem;
  color: #cecece;
  font-weight: 200;
  align-self: flex-start;
  margin-bottom: 0.5rem;
`;

const DialogButton = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  color: ${(props) => (props.disabled ? "gray" : colors.greenTeal)};
  font-size: 1.15rem;
  padding: 0.2rem 0.7rem;
  cursor: pointer;
  transition: 250ms;
  align-self: flex-end;

  &:hover {
    background-color: rgba(255 255 255 / 5%);
  }
`;

export default OverlayUserForm;
