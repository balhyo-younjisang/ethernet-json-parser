const express = require("express");
const cors = require("cors");
const net = require("net");

const app = express();

app.use(cors());

let clients = [];
// const dataArr = [];
const dataArr = Array.from({ length: 99 }, () => ({
  NAME: null,
  TEMPOUT: null,
  HUMOUT: null,
  HEATING: false,
  COOLING: false,
  AUTO: false,
  TLHVL: null,
  TLLVL: null,
  HUMOP: null,
}));
let sockets = null;

const addClient = (host, port, index) => {
  clients[index] = { host, port };
};

app.get("/fetch", (req, res) => {
  res.send(dataArr);
});

app.get("/connect/:ip/:port/:index", (req, res) => {
  const { ip, port, index } = req.params;
  addClient(ip, port, index);
  res.send(`Client connected: ${ip}:${port}`);
});

app.get("/setting", (req, res) => {
  sockets = clients.map((server, index) => {
    const socket = net.createConnection(server, () => {
      console.log(`Connected to ${server.host}:${server.port}`);
      console.log(index);
    });

    // 데이터 수신 이벤트 처리
    socket.on("data", (data) => {
      // console.log(`Received data from ${server.host}:${server.port}`);
      dataArr[index] = JSON.parse(data.toString());
    });

    // 연결 종료 이벤트 처리
    socket.on("end", () => {
      console.log(`Disconnected from ${server.host}:${server.port}`);
    });

    // 에러 발생 이벤트 처리
    socket.on("error", (err) => {
      console.log(`Error occurred in ${server.host}:${server.port}: ${err}`);
    });

    return socket;
  });
  res.send("");
});

// HTTP 서버 연결
app.get("/message", (req, res) => {
  const message = req.query.msg;
  if (!message) {
    return res.status(400).send("Message is missing");
  }

  const target = req.query.target;
  if (!target) {
    return res.status(400).send("Target is missing");
  }

  console.log(message, target);

  const socket = sockets[target];
  if (!socket) {
    return res.status(400).send(`Target ${target} is not found`);
  }

  // 문자열 전송
  socket.write(message);

  res.send(`send ${message} command to Arduino`);
});

app.listen(51983, () => {
  console.log("HTTP server listening on port 51983");
});
