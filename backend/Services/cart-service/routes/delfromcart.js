const express = require("express");
const cartModel = require("../../../models/cartlistSchema");
const router = express.Router();

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: "Item ID is required." });
    }
    const result = await cartModel.findOneAndDelete({ id });
    if (!result) {
      return res.status(404).json({ success: false, message: "Item not found." });
    }
    res.status(200).json({ success: true, message: "Item deleted successfully." });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ success: false, message: "Error deleting item." });
  }
});

module.exports = router;
