"use strict";

const express = require("express");
const cors = require("cors");
const net = require("net");

const app = express();

const PORT = 51984;

app.use(cors());

let clients = [];
let data = Array.from({ length: 99 }, () => ({
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

const addClient = (ip, port, index) => {
  clients[index] = { ip, port };
  // console.log(index);
  // console.log(`Client connected: ${ip}:${port} / index : ${index}`);
};

app.get("/", (req, res) => {
  clients.forEach((client, index) => {
    const tcpClient = net.createConnection(
      { host: client.ip, port: client.port },
      () => {
        tcpClient.on("data", (chunk) => {
          try {
            const parsedData = JSON.parse(chunk.toString());
            data[index] = parsedData;
          } catch (e) {
            console.error(e);
          }
        });
      }
    );
    tcpClient.on("error", () => {
      console.log("asd");
    });
  });
  res.send(data);
});

app.get("/client/check", (req, res) => {
  console.log("check");
  res.send(clients);
});

app.get("/client/cleanup", (req, res) => {
  clients = [];
  for (let i = 0; i < data.length; i++) {
    data[i] = {
      NAME: null,
      TEMPOUT: null,
      HUMOUT: null,
      HEATING: false,
      COOLING: false,
      AUTO: false,
      TLHVL: null,
      TLLVL: null,
      HUMOP: null,
    };
  }
  res.send(data);
});

app.get("/connect/:ip/:port/:index", (req, res) => {
  const { ip, port, index } = req.params;
  addClient(ip, port, index);
  res.send(`Client connected: ${ip}:${port}`);
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.log(`Port ${PORT} is already in use`);
  }
});
