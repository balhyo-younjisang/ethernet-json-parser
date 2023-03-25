"use strict";

const express = require("express");
const cors = require("cors");
const net = require("net");
const app = express();

const port = 3000;

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

const removeClient = (ip, port) => {
  clients = clients.filter(
    (client) => client.ip !== ip || client.port !== port
  );
  console.log(`Client disconnected: ${ip}:${port}`);
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
    tcpClient.on("error", () => {});
  });
  res.send(data);
});

app.get("/fetch", (req, res) => {
  res.send(data);
});

app.get("/client/check", (req, res) => {
  res.send(clients);
});

app.get("/client/cleanup", (req, res) => {
  for (let i = 0; i < data.length; i++) {
    data[i] = null;
  }
  res.send(data);
});

app.get("/connect/:ip/:port/:index", (req, res) => {
  const { ip, port, index } = req.params;
  addClient(ip, port, index);
  res.send(`Client connected: ${ip}:${port}`);
});

app.get("/:ip/:port/:method", (req, res) => {
  const { ip, port, method } = req.params;
  console.log(req.params);
  // console.log(method);

  let client = net.createConnection({ host: ip, port: port }, () => {
    console.log("Connected to TCP server");
  });

  client.on("error", (err) => {
    console.error(err);
    res.status(500).send("Error connecting to Arduino");
  });

  client.write(method, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error sending data to Arduino");
    } else {
      res.send(`send ${method} command to Arduino`);
    }
  });
});

app.get("/:ip/:port/name/:name", (req, res) => {
  const { ip, port } = req.params;
  const name = req.params.name + " ";

  let client = net.createConnection({ host: ip, port: port }, () => {
    console.log("Connected to TCP server");
  });

  client.write("<CHIFNAME>", (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error sending data to Arduino");
    } else {
      setTimeout(() => console.log(""), 1000);
      client.write(name);
    }
  });
});

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.log(`Port ${port} is already in use`);
  }
});
