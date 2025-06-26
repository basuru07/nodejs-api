const Product = require('../models/Product');

const createProduct = async (req, res) => {
    try {
        const { name, price, quantity } = req.body;
        
        // Validation
        if (!name || !price || quantity === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, price, and quantity'
            });
        }
        
        if (price < 0 || quantity < 0) {
            return res.status(400).json({
                success: false,
                message: 'Price and quantity must be non-negative'
            });
        }
        
        const productId = await Product.create({ name, price, quantity });
        const product = await Product.findById(productId);
        
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: product
        });
        
    } catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        
        res.json({
            success: true,
            message: 'Products retrieved successfully',
            data: products
        });
        
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Product retrieved successfully',
            data: product
        });
        
    } catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, quantity } = req.body;
        
        // Check if product exists
        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        // Validation
        if (!name || !price || quantity === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, price, and quantity'
            });
        }
        
        if (price < 0 || quantity < 0) {
            return res.status(400).json({
                success: false,
                message: 'Price and quantity must be non-negative'
            });
        }
        
        const updated = await Product.update(id, { name, price, quantity });
        if (!updated) {
            return res.status(500).json({
                success: false,
                message: 'Failed to update product'
            });
        }
        
        const updatedProduct = await Product.findById(id);
        
        res.json({
            success: true,
            message: 'Product updated successfully',
            data: updatedProduct
        });
        
    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Check if product exists
        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        const deleted = await Product.delete(id);
        if (!deleted) {
            return res.status(500).json({
                success: false,
                message: 'Failed to delete product'
            });
        }
        
        res.json({
            success: true,
            message: 'Product deleted successfully'
        });
        
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};