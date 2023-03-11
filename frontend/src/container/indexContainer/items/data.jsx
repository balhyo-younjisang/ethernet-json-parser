import { useState } from "react";
import { arduinoControl } from "../api/arduino";
import styled from "styled-components";
import { ClientSetting } from "./clientSetting";

export const Data = (props) => {
  const [auto, setAuto] = useState(false);
  const [cooling, setCooling] = useState(false);
  const [heating, setHeating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [Modalopen, setModalOpen] = useState(false);

  const { NAME, TEMPOUT, HUMOUT, HEATING, COOLING, AUTO, TLHVL, TLLVL, HUMOP } =
    props.data;

  // console.log(props);

  const ClickAuto = () => {
    setAuto(!auto);
  };
  const ClickCooling = () => {
    setCooling(!cooling);
  };
  const ClickHeating = () => {
    setHeating(!heating);
  };
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const showSetModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      {Modalopen && <ClientSetting setModalOpen={setModalOpen} />}
      <Item_list
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        isHovering={isHovering}
      >
        <Item width="25vw">
          <span>{NAME}</span>
        </Item>
        <Item width="11.2vw">
          <span>192.168.000.034</span>
        </Item>
        <Item width="8.5vw">
          <Green_text>{TLLVL}°C</Green_text>
        </Item>
        <Item width="13.5vw">
          <span>{TEMPOUT}</span>
          <Green_text>&nbsp;({TLHVL}°C)</Green_text>
        </Item>
        <Item width="13.5vw">
          <span>{HUMOUT}</span>
          <Green_text>&nbsp;({HUMOP}°C)</Green_text>
        </Item>
        <Item width="8.5vw">
          <Switch alt="switch" onClick={ClickAuto} clicked={AUTO} />
        </Item>
        <Item width="8.5vw">
          <Switch alt="switch" onClick={ClickCooling} clicked={COOLING} />
        </Item>
        <Item width="8.5vw">
          <Switch alt="switch" onClick={ClickHeating} clicked={HEATING} />
        </Item>
        <Item onClick={showSetModal}>
          <Img src="/setting.svg" alt="setting" imgSize="2.75vw" />
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
    props.clicked ? "togle_on.svg" : "togle_off.svg"});
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
