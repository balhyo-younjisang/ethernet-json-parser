import axios from "axios";

export const arduinoControl = async (ip, port, method) => {
  const { data } = await axios.get(
    `http://localhost:3000/${ip}/${port}/${method}`
  );
  console.log(data);
};

export const dataQuery = axios.create({
  baseURL: "http://localhost:3000",
  retry: {
    retry: true,
    retryDelay: 1000,
    retryCount: 10,
    shouldRetry: (error) => {
      // 요청이 실패한 경우 5xx 상태 코드나 네트워크 오류일 경우 다시 시도합니다.
      return (
        error.response.status >= 500 ||
        error.response.status <= 599 ||
        error.code === "ECONNABORTED" ||
        error.code === "ERR_NETWORK"
      );
    },
  },
});

export const changeName = async (name) => {
  const { data } = await axios.get(`http://localhost:3000/name/${name}`);
  // console.log(data);
};

export const addClient = async (ip, port, index) => {
  // console.log(ip, port, index);
  const { data } = await axios.get(
    `http://localhost:3000/connect/${ip}/${port}/${index}`
  );
  // console.log(data);
};

export const cleanClientList = async () => {
  const { data } = await axios.get(`http://localhost:3000/cleanup`);
  console.log(data);
};

export const dataLengthSet = async (num) => {
  const { data } = await axios.get(
    `http://localhost:3000/client/dataList/${num}`
  );
  console.log(data);
};
