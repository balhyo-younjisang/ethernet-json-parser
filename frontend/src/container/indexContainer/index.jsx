import React, { useEffect, useState } from "react";
import { Header } from "./items/header";
import { Footer } from "./items/footer";
import { MainSection } from "./items/mainSection";
import { BasicSection } from "./items/basicSection";

export const MainContainer = () => {
  // const [clientCount, setClientCount] = useState(0);

  // 서버에 값을 보내서 받아오는 함수
  // const { data } = useQuery(["data"], async () => {
  //   const { data } = await axios.post("서버주소", {
  //     headers: { "content-type": "application/x-www-form-urlencoded" },
  //   });
  // });

  //input의 값이 변할 때 숫자가 아니라면 값을 초기화 하는 함수
  // const onChange = (e) => {
  //   let check = /^[0-9]+$/;
  //   if (!check.test(e.target.value) || e.target.value.length >= 4) {
  //     e.target.value = "";
  //     setClientCount(e.target.value);
  //   } else {
  //     setClientCount(e.target.value);
  //     // console.log(clientCount);
  //   }

  //   console.log(e.target.value.length);
  // };

  // when state value is open, setModalOpen changed true
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Header />
      <MainSection />
      <BasicSection open={modalOpen} close={closeModal}></BasicSection>
      <Footer event={openModal} />
    </>
  );
};
