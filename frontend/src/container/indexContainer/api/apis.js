import axios from "axios";

export const arduinoControl = async (method, target) => {
  const { data } = await axios.get(
    `http://localhost:51983/message?msg=${method}&target=${target}`
  );
  // console.log(data);
};

export const changeName = async (name, target) => {
  const { data } = await axios.get(
    `http://localhost:51983/change_name?name=${name}&target=${target}`
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
  // console.log(data);
};
