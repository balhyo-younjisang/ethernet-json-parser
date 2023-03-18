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

  // win.loadURL("http://localhost:5174"); --> electron: Failed to load URL: http://localhost:5174/ with error: ERR_CONNECTION_REFUSED
  // win.loadURL("http://localhost:5173");
  // win.loadFile("public/index.html");
  win.loadFile("frontend/dist/index.html");

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
    app.quit();
  });

  ipc.on("message-from-renderer", (event, arg) => {
    console.log(arg);
  });
};

// app.dock.setIcon(path.join(__dirname, "/assets/icons/electrosmith.png")); --> TypeError: Cannot read properties of undefined (reading 'setIcon')

app.whenReady().then(() => {
  exec("cd server/ && node server.js", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    } else {
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    }
  });

  // exec("cd frontend/ && npm run dev", (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`exec error: ${error}`);
  //     return;
  //   } else {
  //     console.log(`stdout: ${stdout}`);
  //     console.error(`stderr: ${stderr}`);
  //   }
  // });

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
