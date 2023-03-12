// frontend/start-client.js

const path = require("path");
const serve = require("serve");

// import path from "path";
// import serve from "serve";

const reactBuildPath = path.join(__dirname, "dist");
const port = 3000;

export function startClient() {
  return serve(reactBuildPath, {
    port,
    open: false,
    ignore: ["node_modules"],
  });
}

module.exports = startClient;
