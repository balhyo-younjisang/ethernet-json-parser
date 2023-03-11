var net = require("net");
var express = require("express");
var app = express();
var tcpClient = new net.Socket();
tcpClient.connect(10001, "192.168.0.100", function () {
  console.log("Connected to Ethernet shield");
});

app.get("/", function (req, res) {
  tcpClient.write("GET / HTTP/1.1\r\n\r\n");
});

tcpClient.on("data", function (data) {
  console.log("Data received from Arduino: " + data);
  res.send(data);
});

app.listen(3001, function () {
  console.log("Server listening on port 3001");
});
