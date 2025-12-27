const express = require('express');
const router = express.Router();
const Pizzas = require("../../../models/pizzaSchema")

router.get('/', async (req, res) => {
  try {
    const pizzas = await Pizzas.find();
    res.json(pizzas);
  } catch (err) {
    console.error('Error fetching pizzas:', err);
    res.status(500).send({ message: 'Error fetching pizzas' });
  }
});

module.exports = router;
