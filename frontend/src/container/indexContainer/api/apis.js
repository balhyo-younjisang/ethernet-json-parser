import axios from "axios";

export const arduinoControl = async (method, target) => {
  const { data } = await axios.get(
    `http://localhost:51983/message?msg=${method}&target=${target}`
  );
  console.log(data);
};

export const changeName = async (ip, port, name) => {
  const { data } = await axios.get(
    `http://localhost:51983/${ip}/${port}/name/${name}`
  );
  // console.log(data);
};

export const addClient = async (ip, port, index) => {
  // console.log(ip, port, index);
  const { data } = await axios.get(
    `http://localhost:51983/connect/${ip}/${port}/${index}`
  );
  // console.log(data);
};

export const cleanClientList = async () => {
  const { data } = await axios.get(`http://localhost:51983/cleanup`);
  console.log(data);
};
