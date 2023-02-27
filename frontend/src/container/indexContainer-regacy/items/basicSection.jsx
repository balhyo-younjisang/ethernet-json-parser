import React from "react";
import styled from "styled-components";
import Close from "../../../assets/ic_close.svg";

export const BasicSection = (props) => {
  const { open, close } = props; // Received from parents
  return (
    // When open modal, show class is created
    <Section
      isOpen={open}
      // className={open ? "client_setting_tab show" : "client_setting_tab"}
    >
      {open ? (
        <Window>
          <Popup>
            <CloseImg src={Close} onClick={close}></CloseImg>
            <SettingContainer>
              <div>
                <span>Number of Enclosure</span>
                <br />
                <input placeholder="Number of Enclosure" />
              </div>
              <div>
                <span>Network port number</span>
                <br />
                <input placeholder="Network port number" />
              </div>
              <button type="submit">Save</button>
            </SettingContainer>
          </Popup>
        </Window>
      ) : null}
    </Section>
  );
};

const Section = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: ${(props) => (props.isOpen ? "1000" : "-1")};
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
`;

const Window = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Popup = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
  width: 50vw;
  height: 20vh;
  transform: translate(-50%, -40%);
`;

const SettingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: end;

  & > input {
    height: 3vh;
  }

  & > button {
    height: 5vh;
  }
`;

const CloseImg = styled.img`
  width: 25px;
  height: 25px;
`;
