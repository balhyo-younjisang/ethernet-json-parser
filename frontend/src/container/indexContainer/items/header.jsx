import styled from "styled-components";

export const Header = () => {
  return (
    <nav>
      <Main_list>
        <Name>Name</Name>
        <Ip>IP Address</Ip>
        <Heater>Heater set</Heater>
        <Cooler>Cooler OP (set)</Cooler>
        <Humi>Humi OP (set)</Humi>
        <Auto>Auto</Auto>
        <Auto>Cooling</Auto>
        <Auto>Heating</Auto>
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
