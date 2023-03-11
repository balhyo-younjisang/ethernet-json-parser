"use strict";

const express = require("express");
const cors = require("cors");
const net = require("net");
const app = express();

app.use(cors());

let data = "";

const client = net.createConnection(
  { host: "192.168.0.100", port: 10001 },
  () => {
    console.log("Connected to TCP server");
  }
);

client.on("data", (chunk) => {
  data = chunk.toString();
});

client.on("error", (err) => {
  console.log(err);
});

setInterval(() => {
  client.write("Data request");
}, 1000);

app.get("/", (req, res) => {
  client.on("data", (chunk) => {
    data = chunk.toString();
  });
  res.send(data);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

if (err.code === "EADDRINUSE") {
  console.log(`Port ${port} is already in use, trying another port...`);
  port++;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
} else {
  console.error(err);
}
