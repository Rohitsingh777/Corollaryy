const mongoose = require('mongoose');
const express = require('express')
const router = express.Router(); 
const jwt = require('jsonwebtoken');
const  { USER ,PRODUCT } = require ('../dbmod/db.js') ;
const {SECRET} = require('../auth/index.js')
const {authJwt} = require('../auth/index.js')


///////signup
router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    USER.findOne({ username }).then(user =>{
if (user){
    res.status(403).json({message: 'user exists kindly try another username'})
}
else {
    const obj = {username,password};
    const newuser = new USER(obj);
    newuser.save();
    const token = jwt.sign({ username, role: 'user'},SECRET,{expiresIn : '1h'})
    res.json({
        message : 'user created '
        ,token}
        )}});
});
//////\\\\\\\\\\

///////login
  router.post('/login', async (req, res) => {
    const { username, password } = req.headers;
    const user = await USER.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });
/////\\\\\\\\\\


///allproducts 
router.get('/allproducts', authJwt, async (req, res) => {
    const Products = await PRODUCT.find({});
    console.log(`someone listed all products`)
    res.send(Products);
})

/////\\\\\\\\\\


//one_products
router.get('/product/:id', authJwt , async (req, res) => {
    const _id = req.params.id;
    const Products = await PRODUCT.findOne({ _id });
    console.log(`someone listed one product =>  ${_id} `)
    res.send(Products);
})

/////\\\\\\\\\\

// wishlist:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
// cart : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
// address : {type: String},
// phoneno : {type: String}


//wishlist 
router.get('/addwishlist/:id', authJwt , async (req, res) => {
    try {
        //
        console.log('inside try' )
        const _id = req.params.id;
        const username  = req.user.username
        const Product = await PRODUCT.findOne({ _id });
        const user = await USER.findOne({ username })
        // console.log(_id)
        // console.log(JSON.stringify(Product))
        // console.log(JSON.stringify(user))
        if (Product &&  user )
        {
            const wishlistcheck = user.wishlist.find(element => element == _id);
            if (wishlistcheck !== undefined )
            {
                res.json({message : `Product ${_id} already added to wishlist for user ${username}`})
            }
            else{
                user.wishlist.push(Product._id);
                await user.save();
                res.json({message : `Product ${_id} added to wishlist  for user ${username}`})
            }
        }
        else{
            return res.status(404).json({ error: 'User or product not found' });
        }
    }
    
    catch(error){
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
        
    }
   
    
})

//\\\\\\\\\\\





//cart 

router.get('/addcart/:id', authJwt , async (req, res) => {
    try {
          //
        console.log('inside try' )
        const _id = req.params.id;
        const username  = req.user.username
        const Product = await PRODUCT.findOne({ _id });
        const user = await USER.findOne({ username })
        if (Product &&  user ){
            const cartcheck = user.cart.find(element => element == _id);
            if (cartcheck !== undefined )
            {
                res.json({message : `Product ${_id} already added to cart for user ${username}`})
            }
            else{
                user.cart.push(Product._id);
                await user.save();
                res.json({message : `Product ${_id} added to cart  for user ${username}`})
            }
              }
        else{
            return res.status(404).json({ error: 'User or product not found' });
        }

    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
        
    }    
})

//\\\\\\\\\\\




//removcart 

router.get('/removecart/:id', authJwt , async (req, res) => {
    try {
          //
        console.log('inside try' )
        const _id = req.params.id;
        const username  = req.user.username
        const Product = await PRODUCT.findOne({ _id });
        const user = await USER.findOne({ username })
        if (Product &&  user ){
            const cartcheck = user.cart.find(element => element == _id);
            if (cartcheck !== undefined )
            {
            user.cart.pop(Product._id);
            await user.save();
            res.json({message : `Product ${_id} removed fro  cart  for user ${username}`})
            }
            else{
                res.json({message : `Product ${_id} not present in your cart `})
            }
        }
        else{
            return res.status(404).json({ error: 'User or product not found' });
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
        
    }    
})

//\\\\\\\\\\\

//removwishlist


router.get('/removewishlist/:id', authJwt , async (req, res) => {
    try {
          //
        console.log('inside try' )
        const _id = req.params.id;
        const username  = req.user.username
        const Product = await PRODUCT.findOne({ _id });
        const user = await USER.findOne({ username })
        if (Product &&  user ){
            const wishlistcheck = user.wishlist.find(element => element == _id);
            if (wishlistcheck !== undefined )
            {
            user.wishlist.pop(Product._id);
            await user.save();
            res.json({message : `Product ${_id} removed from wishlist for user ${username}`})
            }
            else{
                res.json({message : `Product ${_id} not present in your wishlist `})
            }
        }
        else{
            return res.status(404).json({ error: 'User or product not found' });
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
        
    }    
})



//\\\\\\\\\





















  module.exports = router