"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// 상수
const PORT = 3000;

// 앱
const app = express();

//로깅
app.use(morgan("common"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("test data");
});

app.listen(PORT, console.log(`Running on http://localhost:${PORT}`));
