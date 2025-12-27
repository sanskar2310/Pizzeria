const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/pizzeria")
.then(()=>{
  console.log("Toppings Database Connected.")
})
.catch((err)=>{
  console.log("Error Connecting to Toppings Database..", err.message)
})

const toppingSchema = new mongoose.Schema({
    id: Number,
    tname: String,
    price: Number,
    image: String,
    
  });

const toppingsModel = mongoose.model("toppingsandingredients", toppingSchema, "toppingsandingredients")
module.exports = toppingsModel;