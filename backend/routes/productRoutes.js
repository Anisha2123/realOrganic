const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
router.get('/', async (req, res) => {
    try {
        const category = req.query.category;
        const query = category ? { category } : {};
        const products = await Product.find(query);
        console.log(`📦 Fetched ${products.length} products. Filter: ${category || 'None'}`);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Fetch single product
// @route   GET /api/products/:id
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Seed Products
// @route   POST /api/products/seed
router.post('/seed', async (req, res) => {
    try {
        const sampleProducts = [
            {
                name: 'Organic Red Bell Pepper',
                category: 'Vegetables',
                price: 4.99,
                rating: 4.8,
                badge: 'Fresh',
                image: 'https://images.unsplash.com/photo-1563565375-f3fdf5ca2e87?q=80&w=2574&auto=format&fit=crop',
                description: 'Grown without pesticides, these red bell peppers are sweet, crunchy, and packed with vitamins.',
                stock: 20
            },
            {
                name: 'Fresh Avocados',
                category: 'Fruits',
                price: 6.50,
                rating: 4.9,
                badge: 'Best Seller',
                image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=2575&auto=format&fit=crop',
                description: 'Creamy, rich, and perfect for guacamole or toast. Sourced from organic farms.',
                stock: 15
            },
            {
                name: 'Organic Strawberries',
                category: 'Berries',
                price: 5.99,
                rating: 4.7,
                badge: 'Seasonal',
                image: 'https://images.unsplash.com/photo-1464965911861-746a04b4b0a2?q=80&w=2671&auto=format&fit=crop',
                description: 'Sweet, juicy, and 100% organic strawberries. Perfect for desserts or healthy snacking.',
                stock: 30
            },
            {
                name: 'Raw Honey Jar',
                category: 'Pantry',
                price: 12.99,
                rating: 5.0,
                badge: 'Limited',
                image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=2680&auto=format&fit=crop',
                description: 'Pure, unfiltered raw honey. A natural sweetener with potent antioxidant properties.',
                stock: 10
            },
            {
              name: 'Organic Kale',
              category: 'Vegetables',
              price: 3.50,
              rating: 4.5,
              badge: 'Superfood',
              image: 'https://images.unsplash.com/photo-1524179091875-bf99a9a6daaf?q=80&w=2574&auto=format&fit=crop',
              description: 'Nutrient-dense organic kale. Perfect for salads, smoothies, or baking into chips.',
              stock: 25
            },
            {
              name: 'Organic Bananas',
              category: 'Fruits',
              price: 1.99,
              rating: 4.6,
              badge: '',
              image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=2574&auto=format&fit=crop',
              description: 'Sweet and nutritious organic bananas. A great source of potassium and energy.',
              stock: 50
            }
        ];

        await Product.deleteMany({}); // Clear existing
        const createdProducts = await Product.insertMany(sampleProducts);
        res.json(createdProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
