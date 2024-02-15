const mongoose = require('mongoose');
const express = require('express')
const router = express.Router(); 
const jwt = require('jsonwebtoken');
const  { USER ,PRODUCT } = require ('../dbmod/db.js') ;

///allproducts 
router.get('/allproducts', async (req, res) => {
    const Products = await PRODUCT.find({});
    console.log(`someone listed all products`)
    res.send(Products);
})

/////\\\\\\\\\\
//one_products
router.get('/product/:id' , async (req, res) => {
    const _id = req.params.id;
    const Products = await PRODUCT.findOne({ _id });
    console.log(`someone listed one product =>  ${_id} `)
    res.send(Products);
})

/////\\\\\\\\\\

module.exports = router