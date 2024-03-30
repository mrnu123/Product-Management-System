const express = require("express");
const app = express();
const port = 30000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server runing at <http://localhost>:${port}/`);
});
