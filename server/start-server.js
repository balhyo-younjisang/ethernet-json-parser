// server/start-server.js

const { spawn } = require("child_process");
const path = require("path");

const expressScriptPath = path.join(__dirname, "app.js");

function startServer() {
  return new Promise((resolve, reject) => {
    const serverProcess = spawn("node", [expressScriptPath]);

    serverProcess.stdout.on("data", (data) => {
      console.log(data.toString());
      resolve(serverProcess);
    });

    serverProcess.stderr.on("data", (data) => {
      console.error(data.toString());
      reject();
    });
  });
}

module.exports = startServer;
