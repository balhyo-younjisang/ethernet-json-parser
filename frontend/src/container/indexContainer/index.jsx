import { Header } from "./items/header";
import { Titlebar } from "./items/titlebar";
import { Data } from "./items/data";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { counterState } from "../../data/atoms";

export const MainContainer = () => {
  const [data, setData] = useState([
    {
      NAME: null,
      TEMPOUT: 0,
      HUMOUT: 0,
      HEATING: false,
      COOLING: false,
      AUTO: false,
      TLHVL: 0,
      TLLVL: 0,
      HUMOP: 0,
    },
  ]);

  const [count] = useRecoilState(counterState);

  async function settingData() {
    try {
      await axios.get("http://localhost:51983/setting");
      setTimeout(settingData, 400);
    } catch (error) {
      setTimeout(settingData, 400);
    }
  }

  async function fetchData() {
    try {
      const { data } = await axios.get("http://localhost:51983/fetch");
      // console.log(data);
      setData(data);
      setTimeout(fetchData, 400);
    } catch (error) {
      setTimeout(fetchData, 400);
    }
  }

  useEffect(() => {
    settingData();
    fetchData();
  }, []);

  return (
    <>
      <Titlebar></Titlebar>
      <Header></Header>
      {count === ""
        ? null
        : [...Array(parseInt(count))].map((n, index) => {
            if (!data[index]) {
              return;
            }
            return <Data key={index} data={data[index]} index={index} />;
          })}
    </>
  );
};
