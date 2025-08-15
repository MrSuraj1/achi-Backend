const express = require('express');
const home = express.Router();

home.get("/", (req, res) => {
    res.send(`<h1 className='bg-black justify-center'>server of achi creation</h1>
        <ul>
    <a href="admin/login">    <li>Home</li>  </a>
        <li>order</li>
        <li>list</li>
        </ul>`);
});

module.exports = home;
