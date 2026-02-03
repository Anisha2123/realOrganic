const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');

// @desc    Get user wishlist
// @route   GET /api/wishlist/:userId
router.get('/:userId', async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ userId: req.params.userId }).populate('products');
        res.json(wishlist ? wishlist.products : []);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Add/Remove item from wishlist
// @route   POST /api/wishlist/toggle
router.post('/toggle', async (req, res) => {
    const { userId, productId } = req.body;

    try {
        let wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            wishlist = new Wishlist({ userId, products: [] });
        }

        const index = wishlist.products.indexOf(productId);
        if (index > -1) {
            // Remove
            wishlist.products.splice(index, 1);
        } else {
            // Add
            wishlist.products.push(productId);
        }

        await wishlist.save();
        
        // Return updated list populated
        const updatedWishlist = await Wishlist.findOne({ userId }).populate('products');
        res.json(updatedWishlist.products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
