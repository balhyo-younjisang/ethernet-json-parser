// const { ipcRenderer } = require("electron");
// // import { IpcRenderer } from "electron";
// const ipc = ipcRenderer;

const btnMin = document.getElementById("min");
const btnMax = document.getElementById("max");
const btnClose = document.getElementById("close");

btnMin.addEventListener("click", () => {
  ipc.send("minimizeApp");
});
btnMax.addEventListener("click", () => {
  ipc.send("maximizeApp");
});
btnClose.addEventListener("click", () => {
  ipc.send("closeApp");
});
// const btnMin = document.getElementById("min");
// const btnMax = document.getElementById("max");
// const btnClose = document.getElementById("close");
// const damLogo = document.querySelector(".prevent-select .icon");

// btnMin.addEventListener("click", () => {
//   ipc.send("minimizeApp");
// });
// btnMax.addEventListener("click", () => {
//   ipc.send("maximizeApp");
// });
// btnClose.addEventListener("click", () => {
//   ipc.send("closeApp");
// });
// damLogo.addEventListener("click", () => {});
