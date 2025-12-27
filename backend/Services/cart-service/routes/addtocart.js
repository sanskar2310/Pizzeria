const express = require("express");
const cartModel = require("../../../models/cartlistSchema");
const router = express.Router();

router.post("/", (req, res) => {
    console.log("add to cart request.");
    const item = req.body;
    console.log("Incoming Request Body: ", item.name);
    cartModel.findOne({ id: item.id })
        .then((itemstoadd) => {
            if (itemstoadd) {
                console.log("Item already in cart.");
                itemstoadd.quantity = (itemstoadd.quantity || 1) + 1;
                return itemstoadd.save()
                    .then(() => {
                        console.log("Product quantity updated.");
                        res.send("Product Quantity Updated in Cart.");
                    });
            } else {
                console.log("Item not found in cart, adding new item.");
                let newitem = new cartModel(item)
                newitem.quantity = 1;
                newitem.save()
                .then(()=>res.send("Product Added to card Successfully."))
                .catch((err)=>{
                    console.log(err.message)
                    res.status(500).send("Error in adding the product to the cart.")
                })
            }
        })
        .catch((err) => {
            console.error("Error processing cart operation: ", err.message);
            res.status(500).send("Internal Server Error.");
        });
});

module.exports = router;
