const express = require('express')
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const { json } = require('body-parser')
const port = 3000;
const  {PRODUCT, ADMIN,USER }=  require('./dbmod/db.js' ) 
  
//MIDDLE WARE FOR PARSING DATA 
//for cross connection 
app.use(cors());
//for parsing body to body.json
app.use(express.json());
/////////////////////////////////
const pass = `YamApwQ3R7UqPTIb`;
const dburl = `mongodb+srv://09420613901r:${pass}@Corollary.otpxpwl.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(dburl, {dbName: "Corollary" });




app.get('/allproducts' ,auth,  async (req,res) =>{
    const Products = await PRODUCT.find({});
    console.log(`someone listed all products `)
    res.send(Products);
})


app.get('/product/:id' , async (req,res) =>{
    const _id = req.params.id; 
    const Products = await PRODUCT.findOne({_id});
    console.log(`someone listed one product =>  ${_id} `)
    res.send(Products);
})



app.post('/newproduct' , (req,res)=>{
    let newproduct  = new PRODUCT(req.body);
    newproduct.save().then(
        (response)=>{
        console.log(`saved a new product ${JSON.stringify(response)} with id${JSON.stringify(response._id)} `) ;
        res.send(`the product is saved with id ${JSON.stringify(response._id)} `)
    }).catch((error)=>{
        console.log(error)
        res.status(400).json(error)
    })
})


app.delete('/delete/:id' , async (req,res) =>{

    const ID = req.params.id;
     let m = await PRODUCT.deleteOne({_id : ID})
    if (m.deletedCount > 0 ){
        console.log(`your id ${ID} was deleted sucessfully `)
        res.send(`your id ${ID} was deleted sucessfully `)
    }
    else{
        console.log(` NOT FOUND ID => ${ID}  `)
        res.send(` NOT FOUND ID => ${ID}  `)
    }
})



app.listen(port, () => {console.log(`litening on ${port}`)  });