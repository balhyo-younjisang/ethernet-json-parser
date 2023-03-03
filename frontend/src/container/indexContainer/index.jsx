import { Header } from "./items/header";
import { Data } from "./items/data";
import { useEffect } from "react";
import axios from "axios";

export const MainContainer = () => {
  useEffect(() => {
    async function fetchData() {
      const data = await axios.get("http://localhost:3000/");
      console.log(data);
    }
    fetchData();
  }, []);
  return (
    <>
      <Header></Header>
      {[...Array(parseInt(5))].map((n, index) => {
        return <Data key={index} />;
      })}
    </>
  );
};
