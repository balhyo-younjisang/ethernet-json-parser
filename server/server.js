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

app.get("/", (req, res) => {
  let random = Math.floor(Math.random() * dataList.length);
  res.send(dataList[random]);
  console.log(dataList[random]);
});

app.listen(PORT, console.log(`Running on http://localhost:${PORT}`));

if (err.code === "EADDRINUSE") {
  console.log(`Port ${port} is already in use, trying another port...`);
  port++;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
} else {
  console.error(err);
}
