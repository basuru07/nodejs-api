const express = require('express');
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

const router = express.Router();

// GET /api/products - Get all products
router.get('/', getAllProducts);

// GET /api/products/:id - Get product by ID
router.get('/:id', getProductById);

// POST /api/products - Create new product
router.post('/', createProduct);

// PUT /api/products/:id - Update product
router.put('/:id', updateProduct);

// DELETE /api/products/:id - Delete product
router.delete('/:id', deleteProduct);

module.exports = router;