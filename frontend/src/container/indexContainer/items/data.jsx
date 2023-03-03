import { useState } from "react";
import styled from "styled-components";

export const Data = () => {
  const [auto, setAuto] = useState(false);
  const [cooling, setCooling] = useState(false);
  const [heating, setHeating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

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

  return (
    <Item_list
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      isHovering={isHovering}
    >
      <Item width="25vw">
        <span>ELECTROSMITH</span>
      </Item>
      <Item width="11.2vw">
        <span>192.168.000.034</span>
      </Item>
      <Item width="8.5vw">
        <Green_text>7°C</Green_text>
      </Item>
      <Item width="13.5vw">
        <span>26.5°C</span>
        <Green_text>&nbsp;(28°C)</Green_text>
      </Item>
      <Item width="13.5vw">
        <span>58.2%</span>
        <Green_text>&nbsp;(60%)</Green_text>
      </Item>
      <Item width="8.5vw">
        <Switch alt="switch" onClick={ClickAuto} clicked={auto} />
      </Item>
      <Item width="8.5vw">
        <Switch alt="switch" onClick={ClickCooling} clicked={cooling} />
      </Item>
      <Item width="8.5vw">
        <Switch alt="switch" onClick={ClickHeating} clicked={heating} />
      </Item>
      <Item>
        <Img src="/setting.svg" alt="setting" imgSize="2.75vw" />
      </Item>
    </Item_list>
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
