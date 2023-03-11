import React, { useState } from "react";
import styled from "styled-components";
import close from "/rectangle-xmark-regular.svg";
import upload from "/upload-svgrepo-com.svg";
import increase from "/Increase.svg";
import decrease from "/decrease.svg";
import { arduinoControl, changeName } from "../api/apis";

export const ClientSetting = (props, { setModalOpen }) => {
  const [name, setName] = useState(props.data.NAME);

  const hideSetModal = () => {
    setModalOpen(false);
  };

  const changeNameValue = (e) => {
    setName(e.target.value);
  };

  const settingLabels = [
    "Heater Operation value",
    "Cooler Operation value",
    "Dehumidification value",
  ];

  const settingValues = [props.data.TLLVL, props.data.TLHVL, props.data.HUMOP];

  const upCommand = ["<S00TLLIC>", "<S00TLHIC>", "<S00HOPIC>"];
  const downCommand = ["<S00TLLDC>", "<S00TLHDC>", "<S00HOPDC>"];

  return (
    <>
      <Container>
        <Window>
          <Modal>
            <Button onClick={hideSetModal}>
              <img src={close} width="25"></img>
            </Button>
            <SettingContainer>
              <CommandSetting>
                <Wrap>
                  <div>
                    <Font>Name setting</Font>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={name}
                      onChange={changeNameValue}
                    />
                    <img
                      src={upload}
                      width="20"
                      height="20"
                      onClick={() => changeName(name)}
                    />
                  </div>
                </Wrap>
                {settingLabels.map((label, index) => (
                  <Wrap key={index}>
                    <div>
                      <Font>{label}</Font>
                    </div>
                    <div>
                      <img
                        src={increase}
                        width="20"
                        height="20"
                        onClick={() => arduinoControl(upCommand[index])}
                      />
                      <input
                        type="text"
                        value={settingValues[index]}
                        disabled
                      />
                      <img
                        src={decrease}
                        width="20"
                        height="20"
                        onClick={() => arduinoControl(downCommand[index])}
                      />
                    </div>
                  </Wrap>
                ))}
              </CommandSetting>
              <ButtonSetting>
                <ButtonWrap>
                  <RebootBtn>REBOOT SYSTEM</RebootBtn>
                </ButtonWrap>
                <ManualControlWrap>
                  <Font>Manual Control</Font>
                  <SwitchWrap>
                    <Font>Heater</Font>
                    <Switch alt="switch" />
                  </SwitchWrap>
                  <SwitchWrap>
                    <Font>Cooler</Font>
                    <Switch alt="switch" />
                  </SwitchWrap>
                </ManualControlWrap>
              </ButtonSetting>
            </SettingContainer>
            <SaveButton type="submit">Save</SaveButton>
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
  height: 30vh;
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const Button = styled.button`
  background-color: #ffffff;
  border: 0px;
`;

const SaveButton = styled.button`
  background-color: #ffffff;
  border: 0px;
  margin-left: 45%;
`;

const CommandSetting = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
`;

const ButtonSetting = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-item: center;
  justify-content: space-around;
`;

const Font = styled.p`
  font-size: x-small;
`;

const Switch = styled.img`
  content: url(${(props) =>
    props.clicked ? "togle_on.svg" : "togle_off.svg"});
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  width: 3vw;
`;

const SwitchWrap = styled.div`
  width: 5vw;
`;

const ManualControlWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ButtonWrap = styled.div`
  text-align: center;
`;

const RebootBtn = styled.button`
  border-radius: 10px;
  border: 1px;
  padding: 10px;
`;
