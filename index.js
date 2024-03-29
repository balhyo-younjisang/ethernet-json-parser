const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const ipc = ipcMain;
const express = require("express");
const cors = require("cors");
const net = require("net");

const appExpress = express();

appExpress.use(cors());

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

appExpress.get("/connect/:host/:clientPort/:index", (req, res) => {
  const { host, clientPort, index } = req.params;
  port = Number(clientPort);
  clientOptions[index] = { host, port };

  const client = new net.Socket();

  client.connect(clientOptions[index], () => {
    res.send("success");
    clientList[index] = client;
  });

  client.on("data", (data) => {
    try {
      const jsonData = JSON.parse(data.toString());
      clientData[index] = jsonData;
    } catch (err) {}
  });

  client.on("error", (err) => {
    console.error("Error connecting to TCP client:", err.message);
    res.send(`failed by "${err.message}" error`);
  });
});

appExpress.get("/setting", (req, res) => {
  let returnValue = [];
  clientOptions.forEach((clientOptions) => {
    returnValue.push(clientOptions);
  });
  res.json(returnValue);
});

appExpress.get("/message", (req, res) => {
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

appExpress.get("/change_name", (req, res) => {
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

appExpress.get("/fetch", (req, res) => {
  res.json(clientData);
});

appExpress.get("/client", (req, res) => {
  res.send(clientList);
});

appExpress.listen(51983, () => {});

app.disableHardwareAcceleration();

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1500, // Default width : 1600 -> 1000
    height: 600,
    frame: false,
    icon: path.join(__dirname, "assets/icons/electrosmith.png"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: __dirname + "/preload.js",
    },
  });
  win.setMenu(null); // Delete line

  win.loadFile("public/index.html");

  win.webContents.session.webRequest.onBeforeSendHeaders(
    (details, callback) => {
      callback({ requestHeaders: { Origin: "*", ...details.requestHeaders } });
    }
  );

  win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        "Access-Control-Allow-Origin": ["*"],
        ...details.responseHeaders,
      },
    });
  });

  ipc.on("minimizeApp", () => {
    win.minimize();
  });
  ipc.on("maximizeApp", () => {
    if (win.isMaximized()) {
      win.restore();
    } else {
      win.maximize();
    }
  });
  ipc.on("closeApp", () => {
    win.close();
    app.quit();
  });

  ipc.on("message-from-renderer", (event, arg) => {});
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    win = null;
    app.quit();
  }
});
