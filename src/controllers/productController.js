import Product from '../models/product.js';

// Get a single product by ID
const getSingleProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all products with pagination
const getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Product.findAndCountAll({
            limit,
            offset
        });

        const totalPages = Math.ceil(count / limit);

        res.json({
            page,
            limit,
            totalItems: count,
            totalPages,
            items: rows // Ensure this is an array of products
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new product
const createProduct = async (req, res) => {
    const { name, price, description } = req.body;

    try {
        const product = await Product.create({ name, price, description });
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;

    try {
        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        await product.save();

        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        await product.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export {
    createProduct,
    getAllProducts,
    getSingleProduct,
    deleteProduct,
    updateProduct
};
