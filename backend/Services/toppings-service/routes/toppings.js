const express = require('express');
const router = express.Router();
const Toppings = require("../../../models/toppingSchema")

router.get('/', async (req, res) => {
  try {
    const toppings = await Toppings.find();
    res.json(toppings);
  } catch (err) {
    console.error('Error fetching toppings:', err);
    res.status(500).send({ message: 'Error fetching toppings.' });
  }
});

module.exports = router;
