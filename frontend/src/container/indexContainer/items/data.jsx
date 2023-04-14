import { useEffect, useState } from "react";
import { arduinoControl, addClient } from "../api/apis";
import { portState } from "../../../data/atoms";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { useLocalStorage } from "../../../data/useLocalstorage";
import { ClientSetting } from "./clientSetting";

export const Data = (props) => {
  const { data, index } = props;
  const { NAME, TEMPOUT, HUMOUT, HEATING, COOLING, AUTO, TLHVL, TLLVL, HUMOP } =
    data;
  const [isHovering, setIsHovering] = useState(false);
  const [Modalopen, setModalOpen] = useState(false);
  // const [ip, setIp] = useState(() => JSON.parse(window.localStorage.getItem()) || "");
  const [ip, setIp] = useLocalStorage(index, "ip", "");
  const [name, setName] = useState(NAME);

  console.log(data);

  // const [port] = useRecoilState(portState);
  const [port, setPort] = useLocalStorage(
    "unique",
    "port",
    useRecoilState(portState)[0]
  );

  const ClickAuto = () => {
    arduinoControl("<S00AUTO1>");
  };

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const showSetModal = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.body.style.overflow = "hidden";
    setModalOpen(true);
  };

  const settingIp = ({ target: { value } }) => {
    const reg = new RegExp("^[0-9.]+$");
    if (reg.test(value)) setIp(value);
  };

  const settingName = ({ target: { value } }) => {
    setName(value);
  };

  useEffect(() => {
    if (ip.length >= 11) {
      addClient(ip, port, index);
    }
  }, [ip, port, index]);

  return (
    <>
      {Modalopen && (
        <ClientSetting
          setModalOpen={setModalOpen}
          data={props.data}
          clientIndex={index}
        />
      )}
      <Item_list
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        isHovering={isHovering}
        className="ItemList"
      >
        <Name width="29.5vw">
          <Input
            onChange={settingName}
            value={NAME || ""}
            name="Name"
            placeholder="Name"
          ></Input>
          <Img src="button update.svg" alt="setting" imgSize="1.5vw" />
        </Name>

        <Item width="12vw">
          <Input
            onChange={settingIp}
            maxLength={15}
            value={ip || ""}
            name="ip"
            placeholder="IP Address"
          ></Input>
        </Item>
        <Item width="2.43vw">
          <StatusImg
            isAuto={AUTO}
            onClick={() => arduinoControl("<S00AUTO>", clientIndex)}
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
            imgSize="1.5vw"
            onClick={() => arduinoControl("<S00TLHIC>", clientIndex)}
          />
          <Green_text>{TLHVL !== undefined ? TLHVL + "°C" : null}</Green_text>
          <Img
            src="button-down-solid.svg"
            alt="setting"
            imgSize="1.5vw"
            onClick={() => arduinoControl("<S00TLHDC>", clientIndex)}
          />
          <Img
            src="button runNstop2.svg"
            alt="setting"
            imgSize="1.5vw"
            onClick={() => arduinoControl("<S00COOLT>", clientIndex)}
          />
        </ControlPannel>
        <ControlPannel isActive={HEATING} width="13.22vw">
          <Img
            src="button-up-solid.svg"
            alt="setting"
            imgSize="1.5vw"
            onClick={() => arduinoControl("<S00TLHIC>", clientIndex)}
          />
          <Green_text>{TLLVL !== undefined ? TLLVL + "°C" : null}</Green_text>
          <Img
            src="button-down-solid.svg"
            alt="setting"
            imgSize="1.5vw"
            onClick={() => arduinoControl("<S00TLHDC>", clientIndex)}
          />
          <Img
            src="button runNstop2.svg"
            alt="setting"
            imgSize="1.5vw"
            onClick={() => arduinoControl("<S00HEATT>", clientIndex)}
          />
        </ControlPannel>
        <ControlPannel width="9.75vw">
          <Img
            src="button-up-solid.svg"
            alt="setting"
            imgSize="1.5vw"
            onClick={() => arduinoControl("<S00HOPIC>", clientIndex)}
          />
          <Green_text>{HUMOP !== undefined ? HUMOP + "°C" : null}</Green_text>
          <Img
            src="button-down-solid.svg"
            alt="setting"
            imgSize="1.5vw"
            onClick={() => arduinoControl("<S00HOPDC>", clientIndex)}
          />
        </ControlPannel>
        <Item width="2.43vw">
          <Img
            src="button repeat.svg"
            alt="setting"
            imgSize="1.75vw"
            onClick={() => arduinoControl("<S00SWRST>", clientIndex)}
          />
        </Item>
        <Item onClick={showSetModal} setModalOpen={setModalOpen} width="2.43vw">
          <Img src="setting.svg" alt="setting" imgSize="2.75vw" />
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
