const express = require("express");
const Product = require("../model/product");

const productchild = express.Router();

productchild.get("/", async (req, res) => {
  try {
    const response = await Product.find().sort({ createdAt: -1 });
    return res.json(response);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Error fetching all data" });
  }
});

productchild.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product" });
  }
});


productchild.post("/add", async (req, res) => {
  const { product, price, star, description, image, image1, image2, image3 } = req.body;

  try {
    const newProduct = new Product({
      productId: Date.now(),
      name: product,
      price,
      star,
      description,
      image,
      image1,
      image2,
      image3,
    });

    await newProduct.save();
    res.status(200).json({ message: "Product added successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error saving product" });
  }
});

module.exports = productchild;
