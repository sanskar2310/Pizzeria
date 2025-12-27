const express = require("express");
const cartModel = require("../../../models/cartlistSchema");
const router = express.Router();

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, action } = req.body;
    if (quantity < 1) {
      return res.status(400).send("Quantity must be at least 1.");
    }
    let updatedItem;
    if (action === "increment") {
      updatedItem = await cartModel.findOneAndUpdate(
        { id },
        { $inc: { quantity: 1 } },
        { new: true }
      );
    } else if (action === "decrement") {
      updatedItem = await cartModel.findOneAndUpdate(
        { id },
        { $inc: { quantity: -1 } },
        { new: true }
      );
    } else {
      return res.status(400).send("Invalid action. Use 'increment' or 'decrement'.");
    }
    if (!updatedItem) {
      return res.status(404).send("Item not found.");
    }
    res.json(updatedItem);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).send("Error updating item.");
  }
});

module.exports = router;
