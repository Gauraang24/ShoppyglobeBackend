const Product = require("../models/productModel");

//get all products
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.find();
        res.json(product);
    } catch (error) {
        console.log("Error :", error.message);
        res
            .status(500)
            .json({ message: "Error fetching data", error: error.message });
    }
};

//get all product by ID
exports.getProductById = async (req, res) => {
    const id = req.params.id;

    try {
        const allProducts = await Product.findById(id);

        if (!allProducts) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(allProducts);
    } catch (error) {
        console.log("Error :", error.message);
        res
            .status(500)
            .json({ message: "Error fetching data", error: error.message });
    }
};

//add product in db
exports.addProduct = async (req, res) => {
    const { name, price, description, stock } = req.body;

    try {
        const product = new Product({ name, price, description, stock });

        await product.save();
        res.status(200).json({ message: "Product added successfully" });
    } catch (error) {
        console.log("Error :", error.message);
        res
            .status(500)
            .json({ message: "Error Adding product", error: error.message });
    }
};

exports.editProduct = async (req, res) => {
    const id = req.params.id;

    try {
        const { name, price, description, stockQuantity } = req.body;

        const product = await Product.findByIdAndUpdate(
            id,
            { name, price, description, stockQuantity },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
        console.log("Error :", error);
        res
            .status(500)
            .json({ message: "Error editing product", error: error.message });
    }
};

//delete product
exports.deleteProduct = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404), json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.log("Error :", error.message);
        res
            .status(500)
            .json({ message: "Error deleting product", error: error.message });
    }
};
