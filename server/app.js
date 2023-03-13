"use strict";

const express = require("express");
const cors = require("cors");
const net = require("net");
const app = express();


app.use(cors());

let data = "";

let client = net.createConnection(
  { host: "192.168.0.100", port: 10001 },
  () => {
    console.log("Connected to TCP server");
  }
);

const changeName = (name) => client.write(name);

client.on("data", (chunk) => {
  data = chunk.toString();
});

client.on("error", (err) => {
  console.log(err);
});

app.get("/", (req, res) => {
  client.on("data", (chunk) => {
    data = chunk.toString();
  });
  res.send(data);
});

app.get("/:method", (req, res) => {
  const method = req.params.method;
  console.log(method);
  client.write(method, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error sending data to Arduino");
    } else {
      res.send(`send ${method} command to Arduino`);
    }
  });
});

app.get("/name/:name", (req, res) => {
  const name = req.params.name + " ";
  client.write("<CHIFNAME>", (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error sending data to Arduino");
    } else {
      setTimeout(() => console.log(""), 1000);
      changeName(name);
    }
  });
});

const port = 3000;

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.log(`Port ${port} is already in use, trying another port...`);
    server.listen(0); // 0 을 사용하면 무작위 포트가 할당됩니다.
  }
});
