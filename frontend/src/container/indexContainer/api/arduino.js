import axios from "axios";

export const arduinoControl = async (method) => {
  const { data } = await axios.get(`http://localhost:3000/${method}`);
  console.log(data);
};
