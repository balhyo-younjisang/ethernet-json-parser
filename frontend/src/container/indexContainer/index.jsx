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
      await axios.get("http://localhost:51983/");
      setTimeout(settingData, 5000);
    } catch (error) {
      // console.error(error);
      setTimeout(settingData, 5000);
    }
  }

  async function fetchData() {
    try {
      const { data } = await axios.get("http://localhost:51983/fetch");
      setData(data);
      setTimeout(fetchData, 1000);
    } catch (error) {
      // console.error(error);
      setTimeout(fetchData, 1000);
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
            return <Data key={index} data={data[index]} index={index} />;
          })}
    </>
  );
};
