const express = require("express");
const app = express();
const port = 30000;

const products = [];

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/products", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock,
  };
  products.push(newProduct);
  res.json(newProduct);
});

app.get("/product/:id", (req, res) => {
  const product = products.find((item) => item.id === parseInt(req.params.id));
  if (!product) return res.status(404).send("Product not found");
  res.json(product);
});

app.put("/products/:id", (req, res) => {
  //   res.send(`Update product with ID: ${req.params.id};`);
});

app.delete("products/:id", (req, res) => {
  res.send(`Delete product with ID: ${req.params.id}`);
});

app.listen(port, () => {
  console.log(`Server runing at <http://localhost>:${port}/`);
});
