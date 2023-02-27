import styled from "styled-components";
import { TableData } from "./tableData";

export const Table = (props) => {
  return (
    <table width="80%">
      <thead>
        <tr>
          <ColoredTh>Name</ColoredTh>
          <ColoredTh>IP Adress</ColoredTh>
          <ColoredTh>Auto</ColoredTh>
          <ColoredTh>Heater set</ColoredTh>
          <ColoredTh>Cooler OP(set)</ColoredTh>
          <ColoredTh>Humi OP(set)</ColoredTh>
          <ColoredTh>Cooling</ColoredTh>
          <ColoredTh>Heating</ColoredTh>
          <ColoredTh>Setting</ColoredTh>
        </tr>
      </thead>
      {[...Array(parseInt(3))].map((n, index) => {
        return <TableData />;
      })}
    </table>
  );
};

const ColoredTh = styled.th`
  background-color: aqua;
`;
