const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/pizzeria")
.then(()=>{
  console.log("Pizza Database Connected.")
})
.catch((err)=>{
  console.log("Error Connecting to Pizza Database..", err.message)
})
const pizzaSchema = new mongoose.Schema({
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
    price: Number,
  }],
  selectedTopping: [{
    id: String,
    tname: String,
    price: Number,
    image: String,
  }]
});

const pizzaModel = mongoose.model("pizza", pizzaSchema, "pizza")
module.exports = pizzaModel;