import axios from "axios";

export const arduinoControl = async (method) => {
  const { data } = await axios.get(`http://localhost:3000/${method}`);
  console.log(data);
};

export const dataQuery = axios.create({
  baseURL: "http://localhost:3000/",
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
