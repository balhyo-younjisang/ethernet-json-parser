const express = require("express");
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("asd");
});

app.listen(PORT, () => {
  console.log(`server open at http://localhost:3000`);
});
