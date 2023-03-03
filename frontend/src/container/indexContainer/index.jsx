import { Header } from "./items/header";
import { Data } from "./items/data";

export const MainContainer = () => {
  return (
    <>
      <Header></Header>
      {[...Array(parseInt(5))].map((n, index) => {
        return <Data key={index} />;
      })}
    </>
  );
};
