const express = require("express");
const cartModel = require("../../../models/cartlistSchema");
const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const cart = await cartModel.find();
      res.json(cart);
    } catch (err) {
      console.error('Error fetching cartlist:', err);
      res.status(500).send({ message: 'Error fetching cartlist' });
    }
  });

module.exports=router;