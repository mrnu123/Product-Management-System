const express = require("express");
const app = express();
const port = 30000;

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", (req, res) => {
  res.send("List of products");
});

app.post("/products", (req, res) => {
  res.send("Add a new product");
});

app.put("/products/:id", (req, res) => {
  res.send(`Update product with ID: ${req.params.id}`);
});

app.delete("products/:id", (req, res) => {
  res.send(`Delete product with ID: ${req.params.id}`);
});

app.listen(port, () => {
  console.log(`Server runing at <http://localhost>:${port}/`);
});
