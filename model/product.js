const mongoose = require('mongoose');

const ProductsChild = new mongoose.Schema({
  productId: { type: Number, required: true }, // custom product ID
  name: { type: String, required: true },
  price: { type: String, required: true },
  Description: { type: String, required: true },
  star : {type:Number , required: true},
  image: { type: String, required: true },
}, {
createdAt: Date ,
updatedAt: Date
});

module.exports = mongoose.model('product', ProductsChild, 'ProductsChild');

