const express = require('express');
const { getProductById, getProduct, addProduct, deleteProduct, editProduct } = require('../controllers/productController');
const router = express.Router()

router.get("/", getProduct)
router.get("/:id", getProductById)
router.put("/:id", editProduct)
router.post("/", addProduct)
router.delete("/:id", deleteProduct)

module.exports = router