const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('./routes/signup');
const cart = require('./routes/cart');
const home = require('./routes/home');
const login = require('./routes/login');
const productchild = require('./routes/productchild');
const orderapi  = require('./routes/order')
console.log(auth);

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

app.use('/' , home);
app.use('/api/product', productchild) ;
app.use('/api/auth' , login);
app.use('/api/auth' , auth);
app.use('/api/cart' , cart);
app.use('/api/order' , orderapi);


const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI).then(() =>{
 console.log("mongo db connect");
 app.listen(PORT , ()=>{
    console.log(`server running on http://localhost:${PORT}`);
 })
}).catch(err => {
    console.log("mongo not connect erro is" ,err );
 })
