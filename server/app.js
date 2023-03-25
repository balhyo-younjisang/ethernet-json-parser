"use strict";

const express = require("express");
const cors = require("cors");
const net = require("net");
const app = express();

const port = 3000;

app.use(cors());

let clients = [];
let data = Array.from({ length: 1 }, () => ({
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
  console.log(index);
  console.log(`Client connected: ${ip}:${port} / index : ${index}`);
};

const removeClient = (ip, port) => {
  clients = clients.filter(
    (client) => client.ip !== ip || client.port !== port
  );
  console.log(`Client disconnected: ${ip}:${port}`);
};

const extendArrayTo = (arr, n) => {
  if (arr.length >= n) {
    return true;
  }

  const newArr = Array.from(arr);

  while (newArr.length < n) {
    newArr.push({
      NAME: null,
      TEMPOUT: null,
      HUMOUT: null,
      HEATING: false,
      COOLING: false,
      AUTO: false,
      TLHVL: null,
      TLLVL: null,
      HUMOP: null,
    });
  }

  arr.length = 0;
  arr.push(...newArr);
  return true;
};

// app.get("/", (req, res) => {
//   let a = 0;
//   clients.forEach((client, index) => {
//     const tcpClient = net.createConnection(
//       { host: client.ip, port: client.port },
//       () => {
//         tcpClient.on("data", (chunk) => {
//           try {
//             const parsedData = JSON.parse(chunk.toString());
//             // console.log(client.ip, client.port, parsedData);
//             data[index] = parsedData;
//             console.log(a);
//             a++;
//           } catch (e) {
//             console.error(e);
//           }
//         });
//       }
//     );
//     tcpClient.on("error", () => {});
//   });
//   console.log("roop end");
//   res.send(data);
// });

app.get("/", async (req, res) => {
  let a = 0;
  for (const [index, client] of clients.entries()) {
    const tcpClient = net.createConnection(
      { host: client.ip, port: client.port },
      () => {
        tcpClient.on("data", (chunk) => {
          try {
            const parsedData = JSON.parse(chunk.toString());
            data[index] = parsedData;
            console.log(a);
            a++;
            if (a === clients.length) {
              res.send(data);
            }
          } catch (e) {
            console.error(e);
          }
        });
      }
    );
    tcpClient.on("error", () => {});
  }
  console.log("roop end");
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

app.get("/client/dataList/:number", (req, res) => {
  const { number } = req.params;
  // 배열을 10개로 확장
  const status = extendArrayTo(data, parseInt(number));
  // 확장된 배열을 클라이언트에게 전송
  // res.json(data);
  res.send(status);
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
