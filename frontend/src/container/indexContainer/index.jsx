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
      TEMPOUT: null,
      HUMOUT: null,
      HEATING: false,
      COOLING: false,
      AUTO: false,
      TLHVL: null,
      TLLVL: null,
      HUMOP: null,
    },
  ]);

  const [count] = useRecoilState(counterState);

  async function settingData() {
    try {
      await axios.get("http://localhost:51983/setting");
      setTimeout(settingData, 1000);
    } catch (error) {
      setTimeout(settingData, 1000);
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
