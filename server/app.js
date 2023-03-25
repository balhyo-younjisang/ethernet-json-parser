"use strict";

const express = require("express");
const cors = require("cors");
const net = require("net");
const app = express();

const port = 3000;

app.use(cors());

let clients = [];

const addClient = (ip, port, index) => {
  clients[index] = { ip, port };
  console.log(index);
  console.log(`Client connected: ${ip}:${port} / index : ${index}`);
};

const removeClient = (ip, port) => {
  clients = clients.filter(
    (client) => client.ip !== ip || client.port !== port
  );
  console.log(`Client disconnected: ${ip}:${port}`);
};

let data = [];

app.get("/", (req, res) => {
  // const data = [];
  clients.forEach((client, index) => {
    const tcpClient = net.createConnection(
      { host: client.ip, port: client.port },
      () => {
        tcpClient.on("data", (chunk) => {
          data[index] = chunk.toString();
        });
      }
    );
    tcpClient.on("error", () => {});
  });
  res.send(data);
});

app.get("/check", (req, res) => {
  res.send(clients);
});

app.get("client/cleanup", (req, res) => {
  data = [];
  res.send(data);
});

app.get("/connect/:ip/:port/:index", (req, res) => {
  const { ip, port, index } = req.params;
  addClient(ip, port, index);
  res.send(`Client connected: ${ip}:${port}`);
});

app.get("/:method", (req, res) => {
  const method = req.params.method;
  console.log(method);
  clients.forEach((client) => {
    const tcpClient = net.createConnection(
      { host: client.ip, port: client.port },
      () => {
        tcpClient.write(method, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log(
              `Sent ${method} command to ${client.ip}:${client.port}`
            );
          }
          tcpClient.end();
        });
      }
    );
  });
  res.send(`Sent ${method} command to all clients`);
});

app.get("/name/:name", (req, res) => {
  const name = req.params.name + " ";
  clients.forEach((client) => {
    const tcpClient = net.createConnection(
      { host: client.ip, port: client.port },
      () => {
        tcpClient.write("<CHIFNAME>", (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log(
              `Sent <CHIFNAME> command to ${client.ip}:${client.port}`
            );
          }
        });
        setTimeout(() => {
          tcpClient.write(name, (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log(
                `Sent name ${name.trim()} to ${client.ip}:${client.port}`
              );
            }
            tcpClient.end();
          });
        }, 1000);
      }
    );
  });
  res.send(`Sent name ${name.trim()} to all clients`);
});

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.log(`Port ${port} is already in use`);
  }
});
