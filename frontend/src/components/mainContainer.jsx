import { useQuery } from "react-query";
import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

export const MainContainer = () => {
  const [clientCount, setClientCount] = useState();

  // 서버에 값을 보내서 받아오는 함수
  // const { data } = useQuery(["data"], async () => {
  //   const { data } = await axios.post("서버주소", {
  //     headers: { "content-type": "application/x-www-form-urlencoded" },
  //   });
  // });

  //input의 값이 변할 때 숫자가 아니라면 값을 초기화 하는 함수
  const onChange = (e) => {
    let check = /^[0-9]+$/;
    if (!check.test(e.target.value)) {
      e.target.value = "";
    }
  };

  return (
    <Header>
      <input
        type="text"
        placeholder="클라이언트의 개수를 입력해주세요."
        onChange={onChange}
      />
    </Header>
  );
};

const Header = styled.header`
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  width: 50vw;
  height: 10vh;
  font-size: larger;
  background-color: #c0c0c0;
  border: 0;
  border-radius: 4px;
  color: #878484;
  text-align: center;

  & > input {
    width: 50vw;
    height: 10vh;
    font-size: larger;
    background-color: #c0c0c0;
    border: 0;
    border-radius: 4px;
    color: #878484;
    text-align: center;
  }
`;
