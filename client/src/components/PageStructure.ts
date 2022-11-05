import styled from "styled-components";
import colors from "./color";

export const Scaffold = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const TopBar = styled.nav`
  width: 100%;
  background-color: ${colors.gray};
  color: gray;
  padding: 1rem 1.5rem;
  z-index: 20;
  box-shadow: 0 0 2px black, inset 0 0 4px #071015;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const MessagesArea = styled.section`
  background-color: ${colors.grayGreen};
  flex-grow: 1;
  overflow: auto;
  display: flex;
  flex-direction: column-reverse;
  padding: 0 1rem;
`;

export const BottomBar = styled.div`
  background-color: ${colors.grayGreen};
`;
