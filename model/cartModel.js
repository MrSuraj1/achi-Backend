
// const UserCart = new mongoose.Schema({
//     userId : {type: string, unique:true },
//    productId : {type: String, required: true} ,
//    name : {type: String, required: true} ,  
//    price : {} ,
//    image : {type: String, required: true},
//  }  , {
//     timestamps : true
//  });

// module.exports = mongoose.model('cart' , UserCart)

// const mongoose = require('mongoose');

const mongoose = require('mongoose');

const UserCart = new mongoose.Schema({
   productId: { type: String, required: true },
   name: { type: String, required: true },
   price: { type: Number, required: true },
   image: { type: String, required: true },
//    Description : { type: String , required: true },
   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // link to the user
}, {
    timestamps: true
});

module.exports = mongoose.model('Cart', UserCart);
