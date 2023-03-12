import styled from "styled-components";

export const TitlebarButton = ({ message }) => (
  <ControlButton
    onClick={() => window.Electron.ipcRenderer.postMessage(message)}
  ></ControlButton>
);

const ControlButton = styled.button`
  outline: none;
  background: transparent;
  border: 1px solid transparent;

  &:focus {
    outline: none;
    background: transparent;
    border: 1px solid transparent;
  }

  &:active {
    outline: none;
    background: transparent;
    border: 1px solid grey;
  }
`;
