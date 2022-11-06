import styled from "styled-components";
import { ChangeEventHandler, FocusEventHandler, useState } from "react";
import colors from "./color";

interface propTypes {
  label: string;
  value: string;
  onChange?: (value: string) => void;
}

const DialogInput: React.FC<propTypes> = ({ label, onChange }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const handleTextChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const input = event.target.value;
    setText(input);
    if (onChange) onChange(input);
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = () => {
    setIsFocused(true);
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = () => {
    setIsFocused(false);
  };

  return (
    <Wrapper>
      <Label float={isFocused || text !== ""}>{label}</Label>
      <Input
        focused={isFocused}
        hastext={text !== ""}
        onChange={handleTextChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        type="text"
      />
    </Wrapper>
  );
};

// styles
const Wrapper = styled.div`
  width: 100%;
  position: relative;
  padding-top: 13px;
  margin-top: 0.5rem;
`;

const Label = styled.span<{ float: boolean; children: string }>`
  position: absolute;
  transition: 250ms;
  pointer-events: none;

  font-size: ${(props) => (props.float ? "0.8rem" : "1rem")};
  top: ${(props) => (props.float ? "0px" : "14px")};
  left: ${(props) => (props.float ? "-1px" : "0px")};
  color: ${(props) => (props.float ? colors.greenTeal : "gray")};
`;

const Input = styled.input<{ focused: boolean; hastext: boolean }>`
  background-color: transparent;
  outline: none;
  border: none;
  width: 100%;

  transition: 250ms;

  border-bottom: 2px solid
    ${(props) => (props.focused || props.hastext ? colors.greenTeal : "gray")};
  color: white;
  font-size: 1.05rem;
`;

export default DialogInput;
