import styled from "styled-components";
import { useState } from "react";
import { BasicSetting } from "./basicSetting";

export const Titlebar = (props) => {
  const contorls = [
    "window-minimize-solid.svg",
    "window-maximize-regular.svg",
    "rectangle-xmark-regular.svg",
  ];
  const ipcMsg = ["minimizeApp", "maximizeApp", "closeApp"];

  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  const sendWindowSignal = (ipcMsg) => {
    ipcRenderer.send(ipcMsg, "send");
    // console.log(ipcMsg);
  };

  return (
    <Container>
      <Icon onClick={showModal}>
        <img src="logo.png" alt="logo" width="60"></img>
      </Icon>

      <Title>Outdoor Projector Enclosure</Title>
      {modalOpen && <BasicSetting setModalOpen={setModalOpen} />}

      <Control>
        {contorls.map((icon, index) => (
          <ControlButton
            key={index}
            onClick={() => {
              sendWindowSignal(ipcMsg[index]);
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

  user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
`;

const Icon = styled.div`
  padding: 5px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  -webkit-app-region: drag;
`;

const Control = styled.div`
  padding: 5px;
  //   background: rgb(72, 72, 72);
  border-radius: 5px;

  user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
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
