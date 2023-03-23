import { useState } from "react";
import { arduinoControl } from "../api/apis";
import styled from "styled-components";
import { ClientSetting } from "./clientSetting";

export const Data = (props) => {
  const { NAME, TEMPOUT, HUMOUT, HEATING, COOLING, AUTO, TLHVL, TLLVL, HUMOP } =
    props.data;
  const [isHovering, setIsHovering] = useState(false);
  const [Modalopen, setModalOpen] = useState(false);
  const [ip, setIp] = useState("192.168.000.100");

  const ClickAuto = () => {
    arduinoControl("<S00AUTO1>");
  };

  // const ClickCooling = () => {
  //   arduinoControl("<S00COOLT>"); // 배기팬 동작 상태 반전
  // };

  // const ClickHeating = () => {
  //   arduinoControl("<S00HEATT>"); // 히터 동작 상태 반전
  // };

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const showSetModal = () => {
    setModalOpen(true);
  };

  const settingIp = ({ target: { value } }) => {
    const reg = new RegExp("^[0-9.]+$");
    if (reg.test(value)) setIp(value);
  };

  return (
    <>
      {Modalopen && (
        <ClientSetting
          setModalOpen={setModalOpen}
          data={props.data}
          heating={HEATING}
          cooling={COOLING}
          auto={AUTO}
        />
      )}
      <Item_list
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        isHovering={isHovering}
      >
        <Item width="25vw">
          <span>{NAME}</span>
        </Item>
        <Item width="11.2vw">
          <Input
            onChange={settingIp}
            maxLength={15}
            value={ip}
            name="ip"
            placeholder="IP Address"
          ></Input>
        </Item>
        <Item width="8.5vw">
          <Green_text>
            &nbsp;
            {typeof HUMOP === "number" ? `${HUMOP}%` : null}
          </Green_text>
        </Item>
        <Item width="13.5vw">
          <span>
            {typeof TEMPOUT === "number"
              ? (Math.round(TEMPOUT * 10) / 10).toFixed(1)
              : ""}
          </span>
          <Green_text>
            &nbsp;
            {typeof TLHVL === "number" ? `(${TLHVL}°C)` : null}
          </Green_text>
        </Item>
        <Item width="13.5vw">
          <span>
            {typeof HUMOUT === "number"
              ? (Math.round(HUMOUT * 10) / 10).toFixed(1)
              : ""}
          </span>
          <Green_text>
            &nbsp;
            {typeof TLLVL === "number" ? `(${TLLVL}°C)` : null}
          </Green_text>
        </Item>
        <Item width="8.5vw">
          <Switch alt="switch" onClick={ClickAuto} isActive={AUTO} />
        </Item>
        <Item width="8.5vw">
          {/* <Switch alt="switch" onClick={ClickCooling} isActive={COOLING} /> */}
          <Switch alt="switch" isActive={COOLING} />
        </Item>
        <Item width="8.5vw">
          {/* <Switch alt="switch" onClick={ClickHeating} isActive={HEATING} /> */}
          <Switch alt="switch" isActive={HEATING} />
        </Item>
        <Item onClick={showSetModal} setModalOpen={setModalOpen}>
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

const Item = styled.div`
  background-color: rgb(230, 230, 230);
  border-right: 2px solid ${(props) => (props.isHovering ? "black" : "white")};
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width};
`;

const Switch = styled.img`
  content: url(${(props) =>
    props.isActive ? "togle_on.svg" : "togle_off.svg"});
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  width: 5vw;
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
