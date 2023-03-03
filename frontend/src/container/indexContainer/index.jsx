import { Header } from "./items/header";
import { Data } from "./items/data";
import { useEffect } from "react";
import fetchData from "../../api/fetchData";
import axios from "axios";

export const MainContainer = () => {
  useEffect(() => {
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
