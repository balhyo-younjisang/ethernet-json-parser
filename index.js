const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const ipc = ipcMain;
const { spawn } = require("child_process");

let serverProcess;

app.disableHardwareAcceleration();

const logFilePath = path.join(__dirname, "./log/mylog.txt");

function log(message) {
  const now = new Date();
  const formatted = `[${now.toLocaleString()}] ${message}\n`;
  fs.appendFileSync(logFilePath, formatted);
}

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
  // win.loadURL("http://localhost:5173");

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
  serverProcess = spawn("node", ["./app.js"], { stdio: "inherit" });

  serverProcess.on("data", (data) => {
    console.log(`stdout: ${data}`);
    log(data);
  });

  serverProcess.on("data", (data) => {
    // console.error(`stderr: ${data}`);
    log(data);
  });

  serverProcess.on("close", (code) => {
    console.log(`server process exited with code ${code}`);
    log(code);
  });

  createWindow();

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
