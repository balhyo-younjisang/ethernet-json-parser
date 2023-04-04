import { Header } from "./items/header";
import { Titlebar } from "./items/titlebar";
import { Data } from "./items/data";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { counterState } from "../../data/atoms";
import { useLocalStorage } from "../../data/useLocalstorage";

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
  const [count, setCount] = useRecoilState(counterState);
  console.log(count);
  // const [count, setCount] = useLocalStorage(
  //   "unique", // key
  //   "count", // type
  //   useRecoilState(counterState)[0] // init
  // );

  async function settingData() {
    // console.log("settingData");
    try {
      await axios.get("http://localhost:51983/setting");
      setTimeout(settingData, 1000);

      if (window.localStorage.getItem("count"))
        setCount(Number(window.localStorage.getItem("count")));
    } catch (error) {
      setTimeout(settingData, 1000);
    }
  }

  async function fetchData() {
    // console.log("fetchData");
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

  // const rendering = () => {
  //   //push data for render Data
  //   const result = [];
  //   for (let i = 0; i < count; i++) {
  //     result.push(<Data key={i} data={data[i]} index={i} />);
  //   }
  //   return result;
  // };

  return (
    <>
      <Titlebar></Titlebar>
      <Header></Header>
      {count === ""
        ? null
        : [...Array(count)].map((n, index) => {
            return <Data key={index} data={data[index]} index={index} />;
          })}
      {/* {count === "" ? null : rendering()} */}
    </>
  );
};
