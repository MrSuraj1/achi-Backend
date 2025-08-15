// routes/order.js
const express = require("express");
const router = express.Router();
const Order = require("../model/order"); // Mongoose Order model
const authMiddleware = require("../routes/auth"); // for JWT

// Place order
router.post("/place", authMiddleware, async (req, res) => {
  console.log("Incoming order data:", req.body);

  const { name, address, pincode, phone, paymentMethod, items, totalAmount } = req.body;

  // Validation
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }
  if (!name || !address || !pincode || !phone || !paymentMethod) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newOrder = new Order({
      userId: req.user._id, // from auth middleware
      items: items.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
      })),
      totalAmount,
      status: "Pending",
      shipping: {
        name,
        address,
        pincode,
        phone,
        paymentMethod,
      },
      createdAt: new Date(),
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/get", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});






module.exports = router;
