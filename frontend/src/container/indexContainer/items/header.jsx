import styled from "styled-components";
// import { useState } from "react";
import { counterState } from "../../../data/atoms";
import { useRecoilState } from "recoil";

export const Header = () => {
  const Name = "000"; // get Name data
  const [count, setCount] = useRecoilState(counterState);

  const handleChangeNumber = ({ target: { value } }) => {
    const reg = new RegExp("^[0-9]+$");
    if (reg.test(value)) {
      if (value !== "") {
        // console.log("setCount", value);
        setCount(Number(value));
        // window.localStorage.setItem("count", Number(value)); // when count value is change, save the count in the localstorage
      }
      // setCount(Number(value));
    }
  };

  return (
    <nav>
      <Main_list>
        <Item width="29.4vw">
          <LocationNameWrap>
            <p>Q'ty : </p>{" "}
            <input
              type="text"
              value={count || ""}
              onChange={handleChangeNumber}
              maxLength={3}
            />
            <LocationNameWrap>
              <p>Name</p>
              <input type="text" disabled />
            </LocationNameWrap>
          </LocationNameWrap>
        </Item>
        <Item width="12.3vw">IP Address</Item>
        <Item width="2.43vw">AT</Item>
        <Item width="7.39vw">TEMP</Item>
        <Item width="7.39vw">HUM</Item>
        <Item width="13.22vw">Colling set</Item>
        <Item width="13.22vw">Heating set</Item>
        <Item width="9.75vw">Dehum set</Item>
        <Item width="2.43vw">BOOT</Item>
        <Item width="2.43vw">SET</Item>
      </Main_list>
    </nav>
  );
};

const Main_list = styled.ul`
  display: flex;
  height: 28px;
  background-color: rgb(179, 179, 179);
  list-style: none;
  line-height: 28px;
  text-align: center;
  font-weight: 600;
  font-size: 1em;

  @media screen and (max-width: 1000px) {
    font-size: 0.8rem;
  }

  @media screen and (max-width: 800px) {
    font-size: 0.5rem;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width};
`;

const Name = styled.li`
  width: 25vw;
`;

const Ip = styled.li`
  width: 11.2vw;
`;

const Heater = styled.li`
  width: 8.5vw;
`;

const Cooler = styled.li`
  width: 13.5vw;
`;

const Humi = styled.li`
  width: 13.5vw;
`;

const Auto = styled.li`
  width: 8.5vw;
`;

const ItemWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: start;

  & :nth-child(2) {
    padding-left: 60px;
  }
`;

const LocationNameWrap = styled.div`
  display: flex;
  & input {
    background: none;
    border: none;
    outline: none;
    text-align: center;
    font-size: 1em;
    font-weight: 500;
    width: 5vw;
    margin-right: 5vw;
  }
`;
