const express = require("express");
const cors = require("cors");
const net = require("net");

const app = express();

app.use(cors());

// 클라이언트 데이터를 저장할 변수
const clientData = Array.from({ length: 99 }, () => ({
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
let clientList = [];
let clientOptions = Array.from({ length: 99 }, () => ({
  host: "",
  port: 0,
}));

app.get("/connect/:host/:clientPort/:index", (req, res) => {
  // 클라이언트 옵션에 데이터 삽입
  const { host, clientPort, index } = req.params;
  port = Number(clientPort);
  clientOptions[index] = { host, port };
  // res.send(`addclient ${host} , ${port}`);

  // 소켓으로 구현해 클라이언트 데이터 배열에 삽입
  const client = new net.Socket();

  client.connect(clientOptions[index], () => {
    console.log("Connected to TCP client");
    res.send("success");
    clientList[index] = client;
  });

  client.on("data", (data) => {
    try {
      const jsonData = JSON.parse(data.toString());
      clientData[index] = jsonData;
    } catch (err) {
      // console.error("Received invalid JSON data:", err);
    }
  });

  // 오류 처리
  client.on("error", (err) => {
    console.error("Error connecting to TCP client:", err.message);
    res.send(`failed by "${err.message}" error`);
    // 이 부분에 적절한 오류 처리 로직을 추가할 수 있습니다.
  });
});

app.get("/setting", (req, res) => {
  let returnValue = [];
  clientOptions.forEach((clientOptions) => {
    returnValue.push(clientOptions);
  });
  res.json(returnValue);
});

app.get("/message", (req, res) => {
  const message = req.query.msg;
  if (!message) {
    return res.status(400).send("Message is missing");
  }

  const target = req.query.target;
  if (!target) {
    return res.status(400).send("Target is missing");
  }

  const socket = clientList[target];
  if (!socket) {
    return res.status(400).send(`Target ${target} is not found`);
  }

  socket.write(message);

  res.send(`send ${message} command to Arduino`);
});

app.get("/change_name", (req, res) => {
  let socket;
  console.log(req.query);

  if (req.query !== undefined) {
    const name = req.query.name + " ";
    if (!name) {
      return res.status(400).send("Name is missing");
    }

    const target = req.query.target;
    if (!target) {
      return res.status(400).send("Target is missing");
    }

    const socket = clientList[target];
    if (!socket) {
      return res.status(400).send(`Target ${target} is not found`);
    }

    socket.write("<CHIFNAME>", (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error sending data to Arduino");
      } else {
        setTimeout(() => socket.write(name), 400);

        res.send(`change name to  '${req.query.name}'`);
      }
    });
  }
});

// /fetch 핸들러
app.get("/fetch", (req, res) => {
  // 현재 클라이언트 데이터를 리턴
  res.json(clientData);
});

app.get("/client", (req, res) => {
  res.send(clientList);
});

app.listen(51983, () => {
  console.log("Server is listening on port 3000");
});
