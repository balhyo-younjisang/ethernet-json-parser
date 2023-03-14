import React, { useState } from "react";
import styled from "styled-components";
import close from "/rectangle-xmark-regular.svg";
import upload from "/upload-svgrepo-com.svg";
import increase from "/Increase.svg";
import decrease from "/decrease.svg";
import { arduinoControl, changeName } from "../api/apis";

export const ClientSetting = (props, cooling, heating) => {
  const [name, setName] = useState(props.data.NAME);
  // const [heating, setHeating] = useState(props.data.HEATING);
  // const [cooling, setCooling] = useState(props.data.COOLING);

  console.log(props);

  const hideModal = () => {
    props.setModalOpen(false);
  };

  const changeNameValue = (e) => {
    setName(e.target.value);
  };

  const settingLabels = [
    "Heater Operation value",
    "Cooler Operation value",
    "Dehumidification value",
  ];

  const settingValues = [
    props.data.TLLVL + "°C",
    props.data.TLHVL + "°C",
    props.data.HUMOP + "%",
  ];

  const upCommand = ["<S00TLLIC>", "<S00TLHIC>", "<S00HOPIC>"];
  const downCommand = ["<S00TLLDC>", "<S00TLHDC>", "<S00HOPDC>"];

  return (
    <>
      <Container>
        <Window>
          <Modal>
            <Header>
              <TextBox>
                <Img src="/setting.svg" alt="setting" imgSize="2.75vw" />
                <span>Client Setting</span>
              </TextBox>
              <Button onClick={hideModal}>
                <Img src={close} imgSize="1.75vw"></Img>
              </Button>
            </Header>
            <SettingContainer>
              <CommandSetting>
                <Wrap>
                  <Item_list>
                    <Item width="9vw">
                      <Font>Name setting</Font>
                    </Item>

                    <Item width="19.5vw">
                      <Input
                        type="text"
                        value={name}
                        onChange={changeNameValue}
                      />
                    </Item>
                    <img
                      src={upload}
                      width="30"
                      height="30"
                      onClick={() => changeName(name)}
                    />
                  </Item_list>
                </Wrap>
                {settingLabels.map((label, index) => (
                  <Item_list key={index}>
                    <Item width="18.5vw">
                      <Font>{label}</Font>
                    </Item>
                    <img
                      src={increase}
                      width="25"
                      height="25"
                      onClick={() => arduinoControl(upCommand[index])}
                    />
                    <Item width="8vw">
                      <Green_text>{settingValues[index]}</Green_text>
                    </Item>
                    <img
                      src={decrease}
                      width="25"
                      height="25"
                      onClick={() => arduinoControl(downCommand[index])}
                    />
                  </Item_list>
                ))}
              </CommandSetting>
              <ButtonWrap onClick={() => arduinoControl("<S00SWRST>")}>
                <RebootBtn>REBOOT SYSTEM</RebootBtn>
              </ButtonWrap>
              <ButtonWrap>
                <RebootBtn>
                  <Font>Manual Control</Font>
                  <div>
                    <WhiteLine>
                      <SwitchWrap
                        onClick={() =>
                          props.data.heating === true
                            ? arduinoControl("<S00HEAT0>")
                            : arduinoControl("<S00HEAT1>")
                        }
                      >
                        <Font>Heater</Font>
                        <Switch alt="switch" clicked={props.heating} />
                      </SwitchWrap>
                    </WhiteLine>
                    <WhiteLine>
                      <SwitchWrap
                        onClick={() =>
                          props.data.cooling === true
                            ? arduinoControl("<S00COOL0>")
                            : arduinoControl("<S00COOL1>")
                        }
                      >
                        <Font>Cooler</Font>
                        <Switch alt="switch" clicked={props.cooling} />
                      </SwitchWrap>
                    </WhiteLine>
                  </div>
                </RebootBtn>
              </ButtonWrap>
            </SettingContainer>
          </Modal>
        </Window>
      </Container>
    </>
  );
};

const TextBox = styled.div`
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  font-size: 1.25rem;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Img = styled.img`
  width: ${(props) => props.imgSize};
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
`;

const Window = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
`;

const Header = styled.div`
  height: 15%;
  display: flex;
  justify-content: space-between;
  background-color: rgb(179, 179, 179);
`;

const Modal = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
  width: 60vw;
  height: 50vh;
  transform: translate(-50%, -40%);
`;

const SettingContainer = styled.div`
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Button = styled.button`
  background-color: rgb(179, 179, 179);
  border: 0px;
  margin-right: 5px;
`;

const CommandSetting = styled.div`
  width: 30vw;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-item: center;
  justify-content: space-around;
`;

const Font = styled.p`
  font-size: 1rem;
`;

const Switch = styled.img`
  content: url(${(props) =>
    props.clicked ? "togle_on.svg" : "togle_off.svg"});
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  margin-right: 10px;
  width: 3.75vw;
`;

const SwitchWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  width: 9vw;
`;

const ButtonWrap = styled.div`
  display: flex;
  text-align: center;
  padding-top: 3px;
  width: 25vh;
  height: 38vh;
`;

const RebootBtn = styled.button`
  border-radius: 40px;
  border: 1px;
  padding: 10px;
  width: inherit;
  height: inherit;
  align-items: center;
  font-size: 1.25rem;
`;

const Item = styled.div`
  background-color: rgb(230, 230, 230);
  border-right: 2px solid white;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width};
`;

const Item_list = styled.div`
  display: flex;
  align-items: center;
  border-top: 5px solid ${(props) => (props.isHovering ? "black" : "white")};
  border-bottom: 5px solid ${(props) => (props.isHovering ? "black" : "white")};
`;

const WhiteLine = styled.div`
  border: 2px solid white;
  border-radius: 40px;
  margin-top: 10px;
  padding: 5px;
`;

const Green_text = styled.span`
  color: rgb(35, 152, 32);
`;

const Input = styled.input`
  width: inherit;
  height: inherit;
  outline: none;
  border: none;
  background: transparent;
  text-align: center;
  font-size: 1.25rem;
`;
