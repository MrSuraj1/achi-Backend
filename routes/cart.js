const express = require('express');
const cartModel = require('../model/cartModel');
const jwt = require('jsonwebtoken');

const cart = express.Router();

cart.post('/item', async (req, res) => {
    const { productId, name, price, image } = req.body;

    if (!req.headers.authorization) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = req.headers.authorization.split(" ")[1];
    let userId;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }

    try {
        const existingItem = await cartModel.findOne({ productId, userId });
        if (existingItem) {
            return res.status(400).json({ message: 'Item already in cart' });
        }

        await cartModel.create({
            productId,
            name,
            price,
            image,
            userId
        });

        return res.status(200).json({ message: 'Item added to cart' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

cart.get('/item', async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = req.headers.authorization.split(" ")[1];
    let userId;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }

    try {
        const items = await cartModel.find({ userId }); // use decoded userId
        res.json(items);
    } catch (err) {
        console.error("Error fetching cart:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});


cart.post('/item/remove', async (req, res) => {
    const { productId } = req.body;

    if (!req.headers.authorization) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = req.headers.authorization.split(" ")[1];
    let userId;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }

    try {
        const existingItem = await cartModel.findOne({ productId, userId });
        if (!existingItem) {
            return res.status(400).json({ message: 'Item already deleted from cart' });
        }

        await cartModel.deleteOne({ productId, userId });

        return res.status(200).json({ message: 'Item removed from cart' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = cart;













// const express = require('express');
// const cartModel = require('../model/cartModel');
// const cart = express.Router();
// const jwt = require('jsonwebtoken');


// cart.post('/item', async (req, res) => {
   
//         const { productId, name, price,
//             image } = req.body;

      

//         const token = req.headers.authorization.split(" ")[1];


//         try {
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             userId = decoded.id;
//         } catch (err) {
//             return res.status(401).json({ message: "Invalid token" });
//         }

//    try {
      
//      const existingItem = cartModel.findOne({productId , userId});
//      if(existingItem) {
//         return res.status(404).json({message : 'invalid'});
//      } 
//      cartModel.create({
//         productId,
//             name,
//             price,
//             image,
//             userId
//      });
//      return res.status(200).json({message : 'item add into cart'});
//     }
//     catch (err) {
//         console.log(err);
//         return res.status(400).json({ message: 'none item save' });
//     }

// })

// module.exports = cart;