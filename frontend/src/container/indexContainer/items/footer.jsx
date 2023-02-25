import styled from "styled-components";
import { Table } from "./table";

export const Footer = () => {
  return (
    <FooterSection>
      <BasicSection>
        <Img src="setting.svg"></Img>
        <BasicSpan className="BasicSpan">Basic Setting</BasicSpan>
      </BasicSection>
      <MainSection>
        <Img src="ES_LOGO.svg"></Img>
      </MainSection>
    </FooterSection>
  );
};

const FooterSection = styled.footer`
  display: flex;
  flex-direction: row;
`;

const BasicSection = styled.div`
  &:hover .BasicSpan {
    visibility: visible;
  }
`;

const BasicSpan = styled.span`
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
`;

const Img = styled.img`
  width: 45px;
  height: 45px;
`;

const MainSection = styled.div`
  text-align: center;
  flex-grow: 1;
`;
