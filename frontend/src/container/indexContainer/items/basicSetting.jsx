import React, { useState } from "react";
import styled from "styled-components";
import close from "/rectangle-xmark-regular.svg";

export const BasicSetting = ({ setModalOpen, consoleLog }) => {
  const hideModal = () => {
    setModalOpen(false);
  };

  const [numOfEnclosure, setNumOfEnclosure] = useState(5);
  const handleChangeEnclosure = ({ target: { value } }) => {
    setNumOfEnclosure(value);
  };

  const [port, setPort] = useState(10001);
  const handleChangePort = ({ target: { value } }) => setPort(value);

  return (
    <Container>
      <Window>
        <Modal>
          <Button onClick={hideModal}>
            <img src={close} width="25"></img>
          </Button>
          <SettingContainer>
            <div>
              <span>Number of Enclosure</span>
              <br />
              <input
                placeholder="Number of Enclosure"
                name="numOfEnclosure"
                value={numOfEnclosure}
                onChange={handleChangeEnclosure}
              />
            </div>
            <div>
              <span>Network port number</span>
              <br />
              <input
                placeholder="Network port number"
                name="port"
                value={port}
                onChange={handleChangePort}
              />
            </div>
            <Button type="submit" onClick={consoleLog(numOfEnclosure, port)}>
              Save
            </Button>
          </SettingContainer>
        </Modal>
      </Window>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Window = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
`;

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
  width: 50vw;
  height: 20vh;
  transform: translate(-50%, -40%);
`;

const SettingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: end;

  & > input {
    height: 3vh;
  }

  & > button {
    height: 5vh;
  }
`;

const Button = styled.button`
  background-color: #ffffff;
  border: 0px;
`;
