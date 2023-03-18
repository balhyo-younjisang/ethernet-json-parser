import React, { useState } from "react";
import styled from "styled-components";
import { arduinoControl, changeName } from "../api/apis";

export const ClientSetting = (props) => {
  const [name, setName] = useState(props.data.NAME);
  // const [heating, setHeating] = useState(props.data.HEATING);
  // const [cooling, setCooling] = useState(props.data.COOLING);

  // console.log(props);

  // const ClickCooler = () => {
  //   props.setCooling(!props.cooling);
  // };

  // const ClickHeater = () => {
  //   props.setHeating(!props.heating);
  // };

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
                <Img src="setting.svg" alt="setting" imgSize="2.75vw" />
                <span>Client Setting</span>
              </TextBox>
              <Button onClick={hideModal}>
                <Img src="rectangle-xmark-regular.svg" imgSize="1.75vw"></Img>
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
                    <ControlImg
                      src="upload-svgrepo-com.svg"
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
                    <ControlImg
                      src="Increase.svg"
                      width="25"
                      height="25"
                      onClick={() => arduinoControl(upCommand[index])}
                    />
                    <Item width="8vw">
                      <Green_text>{settingValues[index]}</Green_text>
                    </Item>
                    <ControlImg
                      src="decrease.svg"
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
                  <FontControl>Manual Control</FontControl>
                  <div>
                    <WhiteLine>
                      <SwitchWrap
                        onClick={() =>
                          props.heating === true
                            ? arduinoControl("<S00HEAT0>")
                            : arduinoControl("<S00HEAT1>")
                        }
                      >
                        <FontControl>Heater</FontControl>
                        <Switch
                          alt="switch"
                          clicked={props.heating}
                          // onClick={ClickHeater}
                        />
                      </SwitchWrap>
                    </WhiteLine>
                    <WhiteLine>
                      <SwitchWrap
                        onClick={() =>
                          props.cooling === true
                            ? arduinoControl("<S00COOL0>")
                            : arduinoControl("<S00COOL1>")
                        }
                      >
                        <FontControl>Cooler</FontControl>
                        <Switch
                          alt="switch"
                          clicked={props.cooling}
                          // onClick={ClickCooler}
                        />
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

  @media screen and (max-height: 300px) {
    font-size: small;
  }
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

  @media screen and (max-width: 800px) {
    width: 5vw;
    height: 5vh;
  }
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

  @media screen and (max-width: 1200px) {
    font-size: small;
  }

  @media screen and (max-width: 800px) {
    font-size: x-small;
  }
`;

const FontControl = styled.p`
  font-size: 1rem;

  @media screen and (max-width: 1200px) {
    font-size: small;
  }
  @media screen and (max-width: 800px) {
    display: none;
  }
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
  width: 12vw;
  height: 40vh;
`;

const RebootBtn = styled.button`
  border-radius: 40px;
  border: 1px;
  padding: 10px;
  width: inherit;
  height: inherit;
  align-items: center;
  font-size: 1.25rem;

  @media screen and (max-width: 1200px) {
    font-size: 0.8rem;
  }

  @media screen and (max-width: 600px) {
    font-size: 3px;
  }
`;

const Item = styled.div`
  background-color: rgb(230, 230, 230);
  border-right: 2px solid white;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width};

  @media screen and (max-height: 600px) {
    height: 8vh;
  }
`;

const Item_list = styled.div`
  display: flex;
  align-items: center;
  border-top: 3px solid ${(props) => (props.isHovering ? "black" : "white")};
  border-bottom: 3px solid ${(props) => (props.isHovering ? "black" : "white")};
`;

const WhiteLine = styled.div`
  border: 2px solid white;
  border-radius: 40px;
  width: 8.5vw;
  margin-top: 10px;
  padding: 5px;

  @media screen and (max-width: 600px) {
    width: 6vw;
  }
`;

const Green_text = styled.span`
  color: rgb(35, 152, 32);

  @media screen and (max-width: 800px) {
    font-size: large;
  }

  @media screen and (max-width: 600px) {
    font-size: small;
  }

  @media screen and (max-width: 600px) {
    font-size: x-small;
  }
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

const ControlImg = styled.img`
  @media screen and (max-width: 1000px) {
    width: 3vw;
    height: 5vh;
  }
`;
