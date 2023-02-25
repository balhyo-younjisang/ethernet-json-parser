"use strict";

const express = require("express");
const morgan = require("morgan");

// 상수
const PORT = 3000;

// 앱
const app = express();

//로깅
app.use(morgan("common"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, console.log(`Running on http://localhost:${PORT}`));
