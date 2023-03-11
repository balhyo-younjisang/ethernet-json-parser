const net = require("net");

function sendData() {
  const client = new net.Socket();
  client.connect(10001, "192.168.55.214", function () {
    console.log("Connected");
    client.write("Hello World");
    client.destroy();
  });

  client.on("close", function () {
    console.log("Connection closed");
    setTimeout(sendData, 3000);
  });

  client.on("error", function (err) {
    console.error("Error occurred:", err);
    setTimeout(sendData, 3000);
  });
}

sendData();
