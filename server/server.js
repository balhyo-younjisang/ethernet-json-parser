"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const { dataList } = require("./testData");

// 상수
const PORT = 3000;

// 앱
const app = express();

//로깅
app.use(morgan("common"));
app.use(cors());

app.get("/build", (req, res) => {
  res.sendFile("../frontend/dist/index.html");
});

app.get("/", (req, res) => {
  let random = Math.floor(Math.random() * dataList.length);
  res.send(dataList[random]);
  // console.log(dataList[random]);
});

app.get("/:method", (req, res) => {
  res.send(req.params.method);
});

app.listen(PORT, console.log(`Running on http://localhost:${PORT}`));
