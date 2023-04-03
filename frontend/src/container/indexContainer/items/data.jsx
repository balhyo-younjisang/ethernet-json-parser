import { useEffect, useState } from "react";
import { arduinoControl, addClient } from "../api/apis";
import { ClientSetting } from "./clientSetting";
import { portState } from "../../../data/atoms";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { useLocalStorage } from "../../../data/useLocalstorage";

export const Data = (props) => {
  const { data, index } = props;
  // console.log(data, index);
  const { NAME, TEMPOUT, HUMOUT, HEATING, COOLING, AUTO, TLHVL, TLLVL, HUMOP } =
    data;
  const [isHovering, setIsHovering] = useState(false);
  const [Modalopen, setModalOpen] = useState(false);
  // const [ip, setIp] = useState(() => JSON.parse(window.localStorage.getItem()) || "");
  const [ip, setIp] = useLocalStorage(index, "ip", "");

  // const [port] = useRecoilState(portState);
  const [port] = useRecoilState(portState);

  console.log(port);
  // console.log(index);

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
          index={index}
        />
      )}
      <Item_list
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        isHovering={isHovering}
        className="ItemList"
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
