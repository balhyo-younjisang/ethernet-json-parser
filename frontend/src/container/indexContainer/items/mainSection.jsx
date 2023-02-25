import styled from "styled-components";
import { Table } from "./table";

export const MainSection = () => {
  return (
    <section>
      <Div>
        <Table></Table>
      </Div>
    </section>
  );
};

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  text-align: center;
`;
