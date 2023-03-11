import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { counterState } from "../../../data/atoms";
import close from "/rectangle-xmark-regular.svg";

export const BasicSetting = ({ setModalOpen, consoleLog }) => {
  const hideModal = () => {
    setModalOpen(false);
  };

  const [count, setCount] = useRecoilState(counterState);

  const handleChangeNumber = (e) => setCount(e.target.value);
  console.log(count);

  const [port, setPort] = useState(10001);
  const handleChangePort = ({ target: { value } }) => setPort(value);

  return (
    <Container>
      <Window>
        <Modal>
          <Header>
            <TextBox>
              <Img src="/setting.svg" alt="setting" imgSize="2.75vw" />
              <span>Basic Setting</span>
            </TextBox>
            <Button onClick={hideModal}>
              <Img src={close} imgSize="1.75vw" ba></Img>
            </Button>
          </Header>
          <SettingContainer>
            <Item_list>
              <Item width="14.5vw">
                <span>Number of Enclosure</span>
              </Item>
              <Item width="14.5vw">
                <Input
                  placeholder="Network port number"
                  name="port"
                  value={count}
                  onChange={handleChangeNumber}
                />
              </Item>
            </Item_list>
            <Item_list>
              <Item width="14.5vw">
                <span>Network port number</span>
              </Item>
              <Item width="14.5vw">
                <Input
                  placeholder="Network port number"
                  name="port"
                  value={port}
                  onChange={handleChangePort}
                  readOnly
                />
              </Item>
            </Item_list>
          </SettingContainer>
        </Modal>
      </Window>
    </Container>
  );
};

const Container = styled.div`
  font-size: 1.3rem;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Window = styled.div`
  position: relative;
  width: 100%;
  height: 90%;
  display: flex;
`;

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
  width: 30vw;
  height: 22vh;
  transform: translate(-50%, -40%);
`;

const SettingContainer = styled.div`
  display: flex;
  flex-directon: column;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;

  & > input {
    height: 3vh;
  }

  & > button {
    height: 5vh;
  }
`;

const Button = styled.button`
  background-color: rgb(179, 179, 179);
  border: 0px;
  margin-right: 5px;
`;

const Header = styled.div`
  height: 18%;
  display: flex;
  justify-content: space-between;
  background-color: rgb(179, 179, 179);
`;

const Img = styled.img`
  width: ${(props) => props.imgSize};
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
`;

const Item = styled.div`
  background-color: rgb(230, 230, 230);
  border-right: 2px solid white;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width};
`;

const Item_list = styled.div`
  display: flex;
  border-top: 5px solid ${(props) => (props.isHovering ? "black" : "white")};
  border-bottom: 5px solid ${(props) => (props.isHovering ? "black" : "white")};
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: inherit;
  height: inherit;
  outline: none;
  border: none;
  background: transparent;
  text-align: center;
  font-size: 1.3rem;
`;
