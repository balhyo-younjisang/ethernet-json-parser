const express = require("express");
const cors = require("cors");
const net = require("net");

const app = express();

app.use(cors());

let clients = [];
// const dataArr = [];
const dataArr = Array.from({ length: 99 }, () => ({
  NAME: null,
  TEMPOUT: 0,
  HUMOUT: 0,
  HEATING: false,
  COOLING: false,
  AUTO: false,
  TLHVL: 0,
  TLLVL: 0,
  HUMOP: 0,
}));
let sockets = [];

const addClient = (host, port, index) => {
  console.log(host, port, index);
  clients[index] = { host, port };
};

app.get("/client", (req, res) => {
  res.send(clients);
});

app.get("/fetch", (req, res) => {
  res.send(dataArr);
});

app.get("/connect/:ip/:port/:index", (req, res) => {
  const { ip, port, index } = req.params;
  addClient(ip, port, index);
  // res.send(`Client connected: ${ip}:${port}`);
});

app.get("/setting", (req, res) => {
  if (sockets.length <= 1) {
    sockets.forEach((socket, index) => {
      socket.end();
    });
  }

  sockets = clients.map((server, index) => {
    const socket = net.createConnection(server, () => {
      // console.log(`Connected to ${server.host}:${server.port}`);
      // console.log(index);
    });

    // 데이터 수신 이벤트 처리
    socket.on("data", (data) => {
      // console.log(`Received data from ${server.host}:${server.port}`);
      // console.log(data.toString());
      // dataArr[index] = JSON.parse(data.toString());

      try {
        const jsonData = JSON.parse(data.toString());
        dataArr[index] = jsonData;
      } catch (err) {
        // console.error("Received invalid JSON data:", err);
      }
    });

    // 연결 종료 이벤트 처리
    socket.on("end", () => {
      // console.log(`Disconnected from ${server.host}:${server.port}`);
    });

    // 에러 발생 이벤트 처리
    socket.on("error", (err) => {
      // console.log(`Error occurred in ${server.host}:${server.port}: ${err}`);
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

  // console.log(message, target);

  const socket = sockets[target];
  if (!socket) {
    return res.status(400).send(`Target ${target} is not found`);
  }

  socket.write(message);

  res.send(`send ${message} command to Arduino`);
  // res.send(`${message}, ${target}`);
});

app.get("/change_name", (req, res) => {
  let socket;
  const name = req.query.name + " ";
  if (!name) {
    return res.status(400).send("Name is missing");
  }

  const target = req.query.target;
  if (!target) {
    return res.status(400).send("Target is missing");
  } else {
    const { host, port } = clients[target];
    socket = net.createConnection({ host: host, port: port });
  }

  socket.write("<CHIFNAME>", (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error sending data to Arduino");
    } else {
      setTimeout(() => console.log(""), 1000);
      socket.write(name);

      socket.end();
    }
  });

  // socket.end();
});

app.listen(51983, () => {
  console.log("HTTP server listening on port 51983");
});
