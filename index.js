const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const ipc = ipcMain;
const { exec } = require("child_process");

app.disableHardwareAcceleration();

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200, // Default width : 1600 -> 1000
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

  win.loadURL("http://localhost:5173");
  // win.loadFile("frontend/dist/index.html");

  // win.webContents.openDevTools();

  ipc.on("send_main_ping", (event, arg) => {
    console.log("Main received a ping!!!");
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
  });

  ipc.on("message-from-renderer", (event, arg) => {
    console.log(arg);
  });
};

app.whenReady().then(() => {
  exec("cd server/ && dir && node server.js", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    } else {
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    }
  });
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
