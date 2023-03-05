import { Header } from "./items/header";
import { Data } from "./items/data";
import { useEffect, useState } from "react";
import axios from "axios";

export const MainContainer = () => {
  const [data, setData] = useState();

  async function fetchData() {
    const { data } = await axios.get("http://localhost:3000/");
    console.log(data);
    setData(data);
    setTimeout(fetchData, 1000); // 1초 후에 fetchData 함수를 다시 호출합니다.
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header></Header>
      {[...Array(parseInt(1))].map((n, index) => {
        return <Data key={index} data={data} />;
      })}
    </>
  );
};
