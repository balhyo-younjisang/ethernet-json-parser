import styled from "styled-components";
import { ipcRenderer, IpcRenderer } from "electron";
import Logo from "/DAM+Logo-4.svg";
import min from "/window-minimize-solid.svg";
import max from "/window-maximize-regular.svg";
import close from "/rectangle-xmark-regular.svg";
import { BasicSetting } from "./basicSetting";
import { useState } from "react";

export const Titlebar = (props) => {
  const contorls = [min, max, close];
  const ipcMsg = ["minimizeApp", "maximizeApp", "closeApp"];

  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };

  const consoleLog = (enclosure, port) => {
    console.log(enclosure, port);
  };

  return (
    <Container>
      <Icon onClick={showModal}>
        <img src={Logo} alt="logo" width="60"></img>
      </Icon>

      <Title>Outdoor Projector Enclosure</Title>
      {modalOpen && (
        <BasicSetting setModalOpen={setModalOpen} consoleLog={consoleLog} />
      )}

      <Control>
        {contorls.map((icon, index) => (
          <ControlButton
            key={index}
            onClick={() => {
              ipcRenderer.send(ipcMsg[index]);
            }}
          >
            <img src={icon} width="25"></img>
          </ControlButton>
        ))}
      </Control>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 41px;
  padding: 0;
  display: flex;
  background: rgb(128, 128, 128);
  font-size: 15px;
  justify-content: space-between;

  * {
    user-select: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;

    -webkit-app-region: drag;
  }
`;

const Icon = styled.div`
  padding: 5px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Control = styled.div`
  padding: 5px;
  //   background: rgb(72, 72, 72);
  border-radius: 5px;
`;

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
