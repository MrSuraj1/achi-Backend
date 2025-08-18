const express = require("express");
const Product = require("../model/product"); // model you shared
const productchild = express.Router();

// ➝ Get all products
productchild.get("/", async (req, res) => {
  try {
    const response = await Product.find().sort({ createdAt: -1 });
    return res.json(response);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Error fetching all data" });
  }
});

// ➝ Get single product
productchild.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product" });
  }
});

// ➝ Add new product
productchild.post("/add", async (req, res) => {
  try {
    const { name, price, Description, star, image, image1, image2, image3 } = req.body;

    // validate
    if (!name || !price || !Description || !star || !image || !image1 || !image2 || !image3) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Product({
      productId: Date.now(),
      name,
      price,
      Description,
      star,
      image,
      image1,
      image2,
      image3,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newProduct.save();
    res.status(200).json({ message: "Product added successfully", product: newProduct });
  } catch (err) {
    console.error("Error saving product:", err);
    res.status(500).json({ message: "Error saving product", error: err.message });
  }
});

module.exports = productchild;
