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

  @media (max-width: 400px) {
    font-size: 1rem;
  }
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

export const UserChip = styled.button`
  background-color: ${colors.greenTeal};
  padding: 0.2rem 0.8rem;
  border-radius: 99px;
  outline: none;
  border: none;
  font-size: 1rem;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: auto;
  cursor: pointer;
  transition: 250ms;

  &:hover {
    background-color: ${colors.greenTealDark};
    color: #bbb;
  }
  &:active {
    transform: scale(0.9);
  }
  @media (max-width: 800px) {
    font-size: 0.9rem;
  }
`;
