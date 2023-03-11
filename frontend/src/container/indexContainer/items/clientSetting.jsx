import React, { useState } from "react";
import styled from "styled-components";
import close from "/rectangle-xmark-regular.svg";

export const ClientSetting = ({ setModalOpen }) => {
  const hideSetModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Container>
        <Window>
          <Modal>
            <Button onClick={hideSetModal}>
              <img src={close} width="25"></img>
            </Button>
            <SettingContainer>
              <Button type="submit">Save</Button>
            </SettingContainer>
          </Modal>
        </Window>
      </Container>
    </>
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
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
  width: 50vw;
  height: 40vh;
  transform: translate(-50%, -40%);
`;

const SettingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: end;
`;

const Button = styled.button`
  background-color: #ffffff;
  border: 0px;
`;
