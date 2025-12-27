const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/pizzeria")
.then(()=>{
    console.log("CartList Database connected.")
})
.catch((err)=>{
    console.log("Error Connecting to Database...", err.message)
})

const cartlistSchema = new mongoose.Schema({
  id: String,
  type: String,
  price: Number,
  name: String,
  image: String,
  description: String,
  ingredients: [{
    id: String,
    iname: String,
  }],
  topping: [{
    id: String,
    tname: String,
    price: String,
  }],
  quantity: Number,
  selectedTopping: [{
    id: String,
    tname: String,
    price: Number,
    image: String,
  }]
});

const cartModel = mongoose.model("cart", cartlistSchema, "cart")

module.exports = cartModel;