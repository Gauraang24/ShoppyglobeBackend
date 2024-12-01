const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// Get all products in the cart for the logged-in user
exports.getProductsInCart = async (req, res) => {
    const userId = req.user.userId;
    try {
        const cartItems = await Cart.find({ userId }).populate('productId', "name price");
        if (!cartItems.length) {
            return res.status(404).json({ message: "No items in cart" });
        }
        res.status(200).json(cartItems);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Failed to fetch products in cart", error: error.message });
    }
};

// Add a product to the cart
exports.addToCart = async (req, res) => {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let cartItem = await Cart.findOne({ userId, productId });
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cartItem = new Cart({ userId, productId, quantity });
        }

        await cartItem.save();
        res.status(200).json({ message: "Product added to cart", cartItem });
    } catch (error) {
        console.error("Error adding to cart:", error.message);
        res.status(500).json({ message: "Error adding to cart", error: error.message });
    }
};

// Update the quantity of a product in the cart
exports.updateCart = async (req, res) => {
    const userId = req.user.userId;
    const { cartId } = req.params;
    const { quantity } = req.body;

    try {
        const cartItem = await Cart.findOne({ _id: cartId, userId });
        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        cartItem.quantity = quantity;
        await cartItem.save();
        res.status(200).json({ message: "Cart item updated", cartItem });
    } catch (error) {
        console.error("Error updating cart item:", error.message);
        res.status(500).json({ message: "Failed to update cart item", error: error.message });
    }
};

// Remove a product from the cart
exports.removeFromCart = async (req, res) => {
    const userId = req.user.userId;
    const { cartId } = req.params;

    try {
        const cartItem = await Cart.findOneAndDelete({ _id: cartId, userId });
        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        res.status(200).json({ message: "Product removed from cart" });
    } catch (error) {
        console.error("Error removing from cart:", error.message);
        res.status(500).json({ message: "Failed to remove product from cart", error: error.message });
    }
};
