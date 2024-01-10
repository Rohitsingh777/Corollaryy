const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {type: String},
    password: {type: String},
    purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
    wishlist:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],

  });



  const adminSchema = new mongoose.Schema({
    username: String,
    password: String
  });
  


// Define mongoose schemas
const productSchema = new mongoose.Schema(
  {
      name:
      {
          type: String,
          required: true,
      },
      description: {
          type: String,
          required: true,
      },
      price: {
          type: Number,
          required: true,
      },
      discount: {
          type: Number,
          required: true,
      },
      sellingPrice: Number,
      variants: [
          {
              color: {type: String},
              images: [{type:String }],
              code: { type: String, required: true },
              sizes: [
                  {
                      name: String,
                      stock: { type: Number, default: 0 },
                  }
              ]
          },
      ],
  }
);

productSchema.pre('save', function (next) {
  this.sellingPrice = this.price - ((this.price * this.discount )/100); 
  next();
});

//Define mongoose model 

const PRODUCT = mongoose.model('Products', productSchema);
const ADMIN = mongoose.model('Admins', adminSchema);
const USER = mongoose.model('Users', userSchema);


module.exports = {
  PRODUCT,
  ADMIN,
  USER
} 
