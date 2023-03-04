const { app, BrowserWindow, ipcMain } = require("electron");
const ipc = ipcMain;

app.disableHardwareAcceleration();

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000, // Default width : 1600 -> 1000
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    frame: false, // Remove the frame of the window
  });
  //win.setMenu(null); // Delete line

  win.loadURL("http://localhost:5173/");

  // win.webContents.openDevTools();

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
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
