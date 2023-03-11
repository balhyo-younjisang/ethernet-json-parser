const { app, BrowserWindow, ipcMain } = require("electron");
const { spawn } = require("child_process");
const path = require("path");
const ipc = ipcMain;

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
    },
    frame: false, // Remove the frame of the window
  });
  //win.setMenu(null); // Delete line

  win.loadFile(__dirname + "\\frontend\\index.html");

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

function runScript(scriptName) {
  const child = spawn(
    /^win/.test(process.platform) ? "npm.cmd" : "npm",
    ["run", scriptName],
    {
      cwd: __dirname,
      stdio: "inherit",
      shell: true,
    }
  );

  child.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

app.whenReady().then(() => {
  createWindow();
  runScript("start");

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
