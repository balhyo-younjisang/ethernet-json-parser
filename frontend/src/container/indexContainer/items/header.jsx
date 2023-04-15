import styled from "styled-components";
import { useState } from "react";

export const Header = () => {
  const Name = "000"; // get Name data
  const [locationName, setLocationName] = useState(""); // get LocationName & setting locationName

  const changeLocationValue = (e) => {
    if (e.target.value.length > 20) return;
    setLocationName(e.target.value);
  };

  return (
    <nav>
      <Main_list>
        <Item width="29.4vw">
          <ItemWrap>
            <p>Q'ty : {Name}</p>
            <LocationNameWrap>
              <p>Name :</p>
              <input
                type="text"
                value={locationName || ""}
                onChange={changeLocationValue}
              />
            </LocationNameWrap>
          </ItemWrap>
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
  }
`;
