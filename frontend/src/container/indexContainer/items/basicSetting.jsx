import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { counterState, portState } from "../../../data/atoms";
import { dataLengthSet } from "../api/apis";

export const BasicSetting = ({ setModalOpen }) => {
  const hideModal = () => {
    setModalOpen(false);
  };

  const [count, setCount] = useRecoilState(counterState);

  // const handleChangeNumber = (e) => setCount(e.target.value);

  const handleChangeNumber = ({ target: { value } }) => {
    let stat = null;
    const reg = new RegExp("^[0-9]+$");
    if (reg.test(value)) {
      console.log(value);
      if (value !== "") stat = dataLengthSet(value);
      setCount(value);
    }
  };
  // console.log(count);

  const [port, setPort] = useRecoilState(portState);
  const handleChangePort = ({ target: { value } }) => setPort(value);

  return (
    <Container>
      <Window>
        <Modal>
          <Header>
            <TextBox>
              <Img src="setting.svg" alt="setting" imgSize="2.75vw" />
              <Label>Basic Setting</Label>
            </TextBox>
            <Button onClick={hideModal}>
              <Img src="rectangle-xmark-regular.svg" imgSize="1.75vw" ba></Img>
            </Button>
          </Header>
          <SettingContainer>
            <Item_list>
              <Item width="14.5vw">
                <Label>Number of Enclosure</Label>
              </Item>
              <Item width="14.5vw">
                <Input
                  placeholder="Number of Enclosure"
                  name="port"
                  value={count}
                  onChange={handleChangeNumber}
                  maxLength={2}
                />
              </Item>
            </Item_list>
            <Item_list>
              <Item width="14.5vw">
                <Label>Network port number</Label>
              </Item>
              <Item width="14.5vw">
                <Input
                  placeholder="Network port number"
                  name="port"
                  value={port}
                  onChange={handleChangePort}
                  // readOnly
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
  margin-top: 41px;
`;

const Window = styled.div`
  position: relative;
  width: 100%;
  height: 80%;
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
  height: 34vh;
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
  height: 12vh;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width};

  @media screen and (max-height: 200px) {
    height: 5vh;
    width: ${(props) => (props.width / 2) * 10};
  }

  @media screen and (max-height: 350px) {
    height: 11vh;
    width: ${(props) => (props.width / 2) * 10};
  }

  @media screen and (max-width: 800px) {
    height: 11vh;
    width: ${(props) => (props.width / 2) * 10};
  }
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

  @media screen and (max-width: 800px) {
    font-size: large;
  }
`;

const Label = styled.span`
  @media screen and (max-width: 800px) {
    font-size: large;
  }

  @media screen and (max-width: 620px) {
    font-size: small;
  }

  @media screen and (max-height: 350px) {
    font-size: small;
  }

  @media screen and (max-height: 300px) {
    font-size: 2px;
  }
`;
