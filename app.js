const validator = require("validator");

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
    stock: req.body.stock ?? 0,
  };
  const isBadRequest = req.body.price === undefined;
  if (isBadRequest) return res.status(400).send("Bad request");
  const isValidated = validateProduct(newProduct);
  if (!isValidated) return res.status(404);
  newProduct.price = Number.parseFloat(newProduct.price);
  newProduct.stock = Number.parseInt(newProduct.stock);
  products.push(newProduct);
  res.json(newProduct);
});

app.get("/products/:id", (req, res) => {
  const product = products.find((item) => item.id === parseInt(req.params.id));
  if (!product) return res.status(404).send("Product not found");
  res.json(product);
});

app.put("/products/:id", (req, res) => {
  //   res.send(`Update product with ID: ${req.params.id};`);
  const product = products.find((item) => item.id === parseInt(req.params.id));
  if (!product) return res.status(404).send("Product not found");
  const isValidated = validateProduct(req.body);
  if (!isValidated) return res.status(400).send("Data type is incorrect.");
  product.name = req.body.name;
  product.category = req.body.category;
  product.price =
    req.body.price != undefined ? Number.parseFloat(req.body.price) : null;
  product.stock =
    req.body.stock != undefined ? Number.parseInt(req.body.stock) : null;
  res.json(product);
});
app.patch("/products/:id", (req, res) => {
  //   res.send(`Update product with ID: ${req.params.id};`);
  const product = products.find((item) => item.id === parseInt(req.params.id));
  if (!product) return res.status(404).send("Product not found");
  const isValidated = validateProduct(req.body);
  if (!isValidated) return res.status(400).send("Data type is incorrect.");
  product.name = req.body.name ?? product.name;
  product.category = req.body.category ?? product.category;
  product.price = Number.parseFloat(req.body.price ?? product.price);
  product.stock = Number.parseInt(req.body.stock ?? product.stock);
  res.json(product);
});

app.delete("/products/:id", (req, res) => {
  res.send(`Delete product with ID: ${req.params.id}`);
  const idxProduct = products.findIndex(
    (item) => item.id === parseInt(req.body.id)
  );
  const productNotFound = idxProduct === -1;
  if (productNotFound) return res.status(404).send("Product not found");
  const deletedProduct = products.splice(idx, 1);
  res.json(deletedProduct);
});

const validateProduct = (product) => {
  const validatedPrice =
    product.price != undefined
      ? validator.isDecimal(product.price.toString(), {
          decimal_digits: "1,2",
        })
      : true;
  const validatedStock =
    product.stock != undefined
      ? validator.isInt(product.stock.toString())
      : true;
  return validatedPrice && validatedStock;
};

app.listen(port, () => {
  console.log(`Server runing at <http://localhost>:${port}/`);
});
