// const { app, BrowserWindow, ipcMain } = require("electron");
// const path = require("path");
// const ipc = ipcMain;
// const { spawn } = require("child_process");

// let serverProcess;

// app.disableHardwareAcceleration();

// const createWindow = () => {
//   const win = new BrowserWindow({
//     width: 1500, // Default width : 1600 -> 1000
//     height: 600,
//     frame: false,
//     icon: path.join(__dirname, "assets/icons/electrosmith.png"),
//     webPreferences: {
//       nodeIntegration: true,
//       contextIsolation: false,
//       enableRemoteModule: true,
//       preload: __dirname + "/preload.js",
//     },
//   });
//   win.setMenu(null); // Delete line

//   win.loadFile("public/index.html");

//   win.webContents.openDevTools();

//   win.webContents.session.webRequest.onBeforeSendHeaders(
//     (details, callback) => {
//       callback({ requestHeaders: { Origin: "*", ...details.requestHeaders } });
//     }
//   );

//   win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
//     callback({
//       responseHeaders: {
//         "Access-Control-Allow-Origin": ["*"],
//         ...details.responseHeaders,
//       },
//     });
//   });

//   ipc.on("send_main_ping", (event, arg) => {
//     // console.log("Main received a ping!!!");
//   });

//   ipc.on("minimizeApp", () => {
//     win.minimize();
//   });
//   ipc.on("maximizeApp", () => {
//     if (win.isMaximized()) {
//       win.restore();
//     } else {
//       win.maximize();
//     }
//   });
//   ipc.on("closeApp", () => {
//     win.close();
//     app.quit();
//   });

//   ipc.on("message-from-renderer", (event, arg) => {
//     // console.log(arg);
//   });


// };

// app.whenReady().then(() => {

//   createWindow();
//   // serverProcess = spawn("node", ["app.js"], { cwd: "./server/app.js" });
//   serverProcess = spawn("node", ["app.js"], { cwd: "." });

//   serverProcess.stdout.on("data", (data) => {
//     console.log(`stdout: ${data}`);
//   });

//   serverProcess.stderr.on("data", (data) => {
//     // console.error(`stderr: ${data}`);
//   });

//   serverProcess.on("close", (code) => {
//     console.log(`server process exited with code ${code}`);
//   });


//   app.on("activate", () => {
//     if (BrowserWindow.getAllWindows().length === 0) createWindow();
//   });

//   app.on("will-quit", () => {
//     serverProcess.kill();
//   });
// });

// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") {
//     win = null;
//     app.quit();
//   }

// });

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const ipc = ipcMain;
const { spawn } = require("child_process");
const express = require("express");
const cors = require("cors");
const net = require("net");

const appExpress = express();

appExpress.use(cors());
let clients = [];

const dataArr = Array.from({ length: 99 }, () => ({
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
let sockets = [];

const addClient = (host, port, index) => {
  console.log(host, port, index);
  clients[index] = { host, port };
};

appExpress.get("/client", (req, res) => {
  res.send(clients);
});

appExpress.get("/fetch", (req, res) => {
  res.send(dataArr);
});

appExpress.get("/connect/:ip/:port/:index", (req, res) => {
  const { ip, port, index } = req.params;
  addClient(ip, port, index);
});

appExpress.get("/setting", (req, res) => {
  if (sockets.length <= 1) {
    sockets.forEach((socket, index) => {
      socket.end();
    });
  }

  sockets = clients.map((server, index) => {
    const socket = net.createConnection(server, () => {
    });
    socket.on("data", (data) => {
      try {
        const jsonData = JSON.parse(data.toString());
        dataArr[index] = jsonData;
      } catch (err) {

      }
    });
    socket.on("end", () => {
    });
    socket.on("error", (err) => {
    });

    return socket;
  });
  res.send("");
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
  const socket = sockets[target];
  if (!socket) {
    return res.status(400).send(`Target ${target} is not found`);
  }
  socket.write(message);

  res.send(`send ${message} command to Arduino`);
});

appExpress.get("/change_name", (req, res) => {
  let socket;
  const name = req.query.name + " ";
  if (!name) {
    return res.status(400).send("Name is missing");
  }

  const target = req.query.target;
  if (!target) {
    return res.status(400).send("Target is missing");
  } else {
    const { host, port } = clients[target];
    socket = net.createConnection({ host: host, port: port });
  }

  socket.write("<CHIFNAME>", (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error sending data to Arduino");
    } else {
      setTimeout(() => console.log(""), 1000);
      socket.write(name);

      socket.end();
    }
  });
});

appExpress.listen(51983, () => {
  console.log("HTTP server listening on port 51983");
});

let serverProcess;

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

  win.webContents.openDevTools();

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

  ipc.on("send_main_ping", (event, arg) => {
    // console.log("Main received a ping!!!");
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

  ipc.on("message-from-renderer", (event, arg) => {
    // console.log(arg);
  });


};

app.whenReady().then(() => {

  createWindow();
  // serverProcess = spawn("node", ["app.js"], { cwd: "./server/app.js" });
  serverProcess = spawn("node", ["app.js"], { cwd: "." });

  serverProcess.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  serverProcess.stderr.on("data", (data) => {
    // console.error(`stderr: ${data}`);
  });

  serverProcess.on("close", (code) => {
    console.log(`server process exited with code ${code}`);
  });


  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  app.on("will-quit", () => {
    serverProcess.kill();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    win = null;
    app.quit();
  }

});