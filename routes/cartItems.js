const express = require("express");
const { auth } = require("../middlewares/auth");



const router = express.Router();

// GET - מציג את כל הפריטים שמשוייכים למשתמש המחובר
router.get("/", auth, async (req, res) => {
  try {
    const cartItems = await CartItem.find({ user: req.tokenData._id })
      .populate("jewelryId", "-createdAt -updatedAt");
    res.json(cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// POST - מוסיף פריט חדש לסל הקניות
router.post("/", auth, async (req, res) => {
  try {
    const { jewelryId, quantity } = req.body;
    const existingItem = await CartItem.findOne({
      user: req.tokenData._id,
      jewelryId,
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      res.json(existingItem);
    } else {
      const newItem = new CartItem({
        user: req.tokenData._id,
        jewelryId,
        quantity,
      });
      await newItem.save();
      res.json(newItem);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// DELETE - מסיר פריט מסל הקניות לפי המזהה שלו
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    // בודקים שהפריט בסל הקניות באמת שייך למשתמש המחובר
    const itemToRemove = await CartItem.findOneAndRemove({
      _id: id,
      user: req.tokenData._id,
    });

    if (itemToRemove) {
      res.json(itemToRemove);
    } else {
      res.status(404).json({ error: "Item not found in the user's cart" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
