const { app, BrowserWindow } = require("electron");
const path = require("path");
const express = require("express");
const { spawn } = require("child_process");

// Express API 서버 실행 스크립트 경로
const expressScriptPath = path.join(__dirname, "server", "app.js");
// React 클라이언트 앱 빌드된 정적 파일 경로
const reactBuildPath = path.join(__dirname, "frontend/dist", "index.html");

// Express 서버 실행 함수
function startExpressServer() {
  return new Promise((resolve, reject) => {
    const expressProcess = spawn("node", [expressScriptPath]);

    expressProcess.stdout.on("data", (data) => {
      console.log(data.toString());
      resolve(expressProcess);
    });

    expressProcess.stderr.on("data", (data) => {
      console.error(data.toString());
      reject();
    });
  });
}

function startReactServer() {
  return new Promise((resolve, reject) => {
    const reactProcess = spawn("node", [reactBuildPath]);

    reactProcess.stdout.on("data", (data) => {
      console.log(data.toString());
      resolve(reactProcess);
    });

    reactProcess.stderr.on("data", (data) => {
      console.error(data.toString());
      reject();
    });
  });
}

// Electron 앱 시작
app.whenReady().then(async () => {
  // Express 서버 실행
  const expressProcess = await startExpressServer();

  // React 앱을 띄울 브라우저 창 생성
  const reactWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      worldSafeExecuteJavaScript: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // React 앱 번들링 파일 로드
  //   reactWindow.loadFile(path.join(reactBuildPath, "index.html"));
  reactWindow.loadURL("http://localhost:5173");
  reactWindow.webContents.openDevTools();

  // Electron 앱 종료 이벤트 핸들링
  app.on("window-all-closed", () => {
    // Express 서버 프로세스 종료
    expressProcess.kill();

    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  // React 앱 창 닫을 때 이벤트 핸들링
  reactWindow.on("closed", () => {
    reactWindow = null;
  });
});
