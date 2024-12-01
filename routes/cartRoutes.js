const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
    getProductsInCart,
    addToCart,
    updateCart,
    removeFromCart
} = require("../controllers/cartController");

// Routes
router.get("/", authMiddleware, getProductsInCart); // Get cart items
router.post("/", authMiddleware, addToCart); // Add to cart
router.put("/:cartId", authMiddleware, updateCart); // Update cart
router.delete("/:cartId", authMiddleware, removeFromCart); // Remove from cart

module.exports = router;
