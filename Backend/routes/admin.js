const mongoose = require('mongoose');
const express = require('express')
const router = express.Router(); 
const jwt = require('jsonwebtoken');
const  { ADMIN,PRODUCT } = require ('../dbmod/db.js') ;
const {SECRET} = require('../auth/index.js')
const {authJwt} = require('../auth/index.js')


//me 

router.get('/me', authJwt, async (req, res) => {
    let admin = await ADMIN.findOne({username:req.user.username})
    if (admin){
        res.json({ username  : admin.username })
        return
    }
    res.status(403).json({"message" : "user doesnot exist"})

    
})

////\\\\

///////signup
router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    ADMIN.findOne({ username }).then(admin =>{
if (admin){
    res.status(403).json({message: 'admin exists kindly try another username'})
}
else {
    const obj = {username,password};
    const newadmin = new ADMIN(obj);
    newadmin.save();
    const token = jwt.sign({ username, role: 'admin'},SECRET,{expiresIn : '1h'})
    res.json({
        message : 'admin created '
        ,token}
        )}});
});
//////\\\\\\\\\\

///////login
  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(username + password )
    const admin = await ADMIN.findOne({ username, password });
    if (admin) {
      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
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




///newproduct 

router.post('/newproduct', authJwt ,(req, res) => {
    let newproduct = new PRODUCT(req.body);
    newproduct.save().then(
        (response) => {
            console.log(`saved a new product ${JSON.stringify(response)} with id${JSON.stringify(response._id)} `);
            res.send(`the product is saved with id ${JSON.stringify(response._id)} `)
        }).catch((error) => {
            console.log(error)
            res.status(400).json(error)
        })
})


/////\\\\\\\\\\



///delete_product 

router.delete('/delete/:id', authJwt ,async (req, res) => {
    const ID = req.params.id;
    let m = await PRODUCT.deleteOne({ _id: ID })
    if (m.deletedCount > 0) {
        console.log(`your id ${ID} was deleted sucessfully `)
        res.send(`your id ${ID} was deleted sucessfully `)
    }
    else {
        console.log(` NOT FOUND ID => ${ID}  `)
        res.send(` NOT FOUND ID => ${ID}  `)
    }
})

/////\\\\\\\\\\



///patch_product 

router.patch('/patch/:id', authJwt ,async (req, res) => {
  const _id = req.params.id;
  let m = await PRODUCT.findOne({ _id })
  let updatedData  = req.body
  if (m) {
      console.log(`your id ${_id} was found now patching  `)
      const updatedItem = await PRODUCT.findByIdAndUpdate( _id ,updatedData, { new: true });
      res.send(JSON.stringify(updatedData))
  }
  else {
      console.log(` NOT FOUND ID => ${_id}  `)
      res.send(` NOT FOUND ID => ${_id}  `)
  }
})

/////\\\\\\\\\\





  module.exports = router