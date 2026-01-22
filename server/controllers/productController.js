import Product from '../models/Product.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const keyword = req.query.keyword ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i'
            }
        } : {};

        // Filter by category if provided
        const category = req.query.category && req.query.category !== 'All'
            ? { category: req.query.category }
            : {};

        const products = await Product.find({ ...keyword, ...category });
        res.json(products);
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Fetch single product by ID or slug
// @route   GET /api/products/:identifier
// @access  Public
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        let product = null;

        // First try to find by slug
        product = await Product.findOne({ slug: id });

        // If not found by slug, try by MongoDB _id
        if (!product) {
            // Check if it's a valid MongoDB ObjectId
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                product = await Product.findById(id);
            }
        }

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Get product by ID error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export {
    getProducts,
    getProductById
};
