import { useEffect, useState } from "react";
import { arduinoControl, addClient, changeName } from "../api/apis";
import { portState } from "../../../data/atoms";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { useLocalStorage } from "../../../data/useLocalstorage";
// import { ClientSetting } from "./clientSetting";

export const Data = (props) => {
  const { data, index } = props;
  const { NAME, TEMPOUT, HUMOUT, HEATING, COOLING, AUTO, TLHVL, TLLVL, HUMOP } =
    data;
  const [isHovering, setIsHovering] = useState(false);
  const [Modalopen, setModalOpen] = useState(false);
  const [ip, setIp] = useLocalStorage(index, "ip", "");
  const [localIp, setLocalIp] = useState("");
  const [name, setName] = useState(NAME);
  const [nameChange, setNameChange] = useState(false);
  const [settingMode, setSettingMode] = useState(false);

  // console.log(data);

  const [port, setPort] = useLocalStorage(
    "unique",
    "port",
    useRecoilState(portState)[0]
  );

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const sendNameToServer = (name, clientIndex) => {
    console.log(name, clientIndex);
    changeName(name, clientIndex);
    setName("");
    setTimeout(() => {
      setNameChange(false);
    });
  };

  // const showSetModal = () => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  //   document.body.style.overflow = "hidden";
  //   setModalOpen(true);
  // };

  const reg = new RegExp("^[0-9.]+$");

  const settingIp = ({ target: { value } }) => {
    if (reg.test(value)) setLocalIp(value);
  };

  const submitClientIp = (e) => {
    console.log(localIp);
    if (e.key === "Enter") {
      if (reg.test(e.target.value)) setIp(localIp);
    }
  };

  const settingName = ({ target: { value } }) => {
    setName(value);
  };

  useEffect(() => {
    if (ip.length >= 11) {
      setLocalIp(ip);
      // addClient(ip, port, index);
      addClient(ip, 10001, index);
    }
  }, [ip, port, index]);

  return (
    <>
      {/* {Modalopen && (
        <ClientSetting
          setModalOpen={setModalOpen}
          data={props.data}
          clientIndex={index}
        />
      )} */}
      <Item_list
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        isHovering={isHovering}
        className="ItemList"
      >
        <Name width="29.5vw">
          {nameChange ? (
            <Input
              onChange={settingName}
              value={name || ""}
              name="Name"
              placeholder="Please enter the device name"
              maxLength={20}
            />
          ) : (
            <Input value={NAME || ""} placeholder="Name" disabled />
          )}

          <Img
            src="button update.svg"
            alt="setting"
            imgSize="1.3vw"
            settingMode={settingMode}
            onClick={
              nameChange
                ? () => {
                    if (name !== "") sendNameToServer(name, index);
                  }
                : () => {
                    if (settingMode) setNameChange(!nameChange);
                  }
            }
          />
        </Name>

        <Item width="12vw">
          <Input
            onChange={settingIp}
            onKeyUp={submitClientIp}
            maxLength={15}
            value={localIp || ""}
            name="ip"
            placeholder="IP Address"
          />
        </Item>
        <Item width="2.43vw">
          <StatusImg
            isAuto={AUTO}
            onClick={() => arduinoControl("<S00AUTO1>", index)}
          />
        </Item>
        <Item width="7.39vw">
          <span>
            {TEMPOUT !== undefined
              ? (Math.round(TEMPOUT * 10) / 10).toFixed(1) + "°C"
              : null}
          </span>
          <Green_text></Green_text>
        </Item>
        <Item width="7.39vw">
          <span>
            {HUMOUT !== undefined
              ? (Math.round(HUMOUT * 10) / 10).toFixed(1) + "%"
              : null}
          </span>
        </Item>
        <ControlPannel isActive={COOLING} width="13.22vw">
          <Img
            src="button-up-solid.svg"
            alt="setting"
            imgSize="1.3vw"
            settingMode={settingMode}
            onClick={() => {
              if (settingMode) arduinoControl("<S00TLHIC>", index);
            }}
          />
          <Green_text>{TLHVL !== undefined ? TLHVL + "°C" : null}</Green_text>
          <Img
            src="button-down-solid.svg"
            alt="setting"
            imgSize="1.3vw"
            settingMode={settingMode}
            onClick={() => {
              if (settingMode) arduinoControl("<S00TLHDC>", index);
            }}
          />
          <Img
            src="button runNstop2.svg"
            alt="setting"
            imgSize="1.3vw"
            settingMode={settingMode}
            onClick={() => {
              if (settingMode) arduinoControl("<S00COOLT>", index);
            }}
          />
        </ControlPannel>
        <ControlPannel isActive={HEATING} width="13.22vw">
          <Img
            src="button-up-solid.svg"
            alt="setting"
            imgSize="1.3vw"
            settingMode={settingMode}
            onClick={() => {
              if (settingMode) arduinoControl("<S00TLLIC>", index);
            }}
          />
          <Green_text>{TLLVL !== undefined ? TLLVL + "°C" : null}</Green_text>
          <Img
            src="button-down-solid.svg"
            alt="setting"
            imgSize="1.3vw"
            settingMode={settingMode}
            onClick={() => {
              if (settingMode) arduinoControl("<S00TLLDC>", index);
            }}
          />
          <Img
            src="button runNstop2.svg"
            alt="setting"
            imgSize="1.3vw"
            settingMode={settingMode}
            onClick={() => {
              if (settingMode) arduinoControl("<S00HEATT>", index);
            }}
          />
        </ControlPannel>
        <ControlPannel width="9.75vw">
          <Img
            src="button-up-solid.svg"
            alt="setting"
            imgSize="1.3vw"
            settingMode={settingMode}
            onClick={() => {
              if (settingMode) arduinoControl("<S00HOPIC>", index);
            }}
          />
          <Green_text>{HUMOP !== undefined ? HUMOP + "°C" : null}</Green_text>
          <Img
            src="button-down-solid.svg"
            alt="setting"
            imgSize="1.3vw"
            settingMode={settingMode}
            onClick={() => {
              if (settingMode) arduinoControl("<S00HOPDC>", index);
            }}
          />
        </ControlPannel>
        <Item width="2.43vw">
          <Img
            src="button repeat.svg"
            alt="setting"
            imgSize="1.75vw"
            settingMode={true}
            onClick={() => {
              if (settingMode) arduinoControl("<S00SWRST>", index);
            }}
          />
        </Item>
        {/* <Item onClick={showSetModal} setModalOpen={setModalOpen} width="2.43vw"> */}
        <Item width="2.43vw">
          <SettingImg
            src="setting.svg"
            alt="setting"
            imgSize="3.5rem"
            settingMode={settingMode}
            onClick={() => setSettingMode(!settingMode)}
          />
        </Item>
      </Item_list>
    </>
  );
};

const Item_list = styled.div`
  display: flex;
  border-top: 3px solid ${(props) => (props.isHovering ? "black" : "white")};
  border-bottom: 3px solid ${(props) => (props.isHovering ? "black" : "white")};
`;

const Name = styled.div`
  background-color: rgb(230, 230, 230);
  border-right: 2px solid ${(props) => (props.isHovering ? "black" : "white")};
  height: 2.5vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${(props) => props.width};
`;

const Item = styled.div`
  background-color: rgb(230, 230, 230);
  border-right: 2px solid ${(props) => (props.isHovering ? "black" : "white")};
  height: 2.5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width};
`;

const ControlPannel = styled.div`
  background-color: ${(props) =>
    props.isActive ? "rgb(0,255,0)" : "rgb(230, 230, 230)"};
  border-right: 2px solid ${(props) => (props.isHovering ? "black" : "white")};
  height: 2.5vw;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: ${(props) => props.width};
`;

const StatusImg = styled.img`
  content: url(${(props) =>
    props.isAuto ? "status-auto.svg" : "status-manual.svg"});
  width: 2.1vw;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
`;

const Img = styled.img`
  width: ${(props) => props.imgSize};
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  filter: ${(props) =>
    props.settingMode
      ? "invert(0%) sepia(2%) saturate(0%) hue-rotate(219deg) brightness(97%) contrast(100%)"
      : "invert(67%) sepia(12%) saturate(0%) hue-rotate(190deg) brightness(96%) contrast(81%)"};
`;

const SettingImg = styled.img`
  width: ${(props) => props.imgSize};
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  filter: ${(props) =>
    props.settingMode
      ? "invert(67%) sepia(12%) saturate(0%) hue-rotate(190deg) brightness(96%) contrast(81%)"
      : "invert(0%) sepia(2%) saturate(0%) hue-rotate(219deg) brightness(97%) contrast(100%)"};
`;

const DefaultImg = styled.img`
  width: ${(props) => props.imgSize};
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
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
  font-size: 0.9rem;
  font-weight: bold;
`;
