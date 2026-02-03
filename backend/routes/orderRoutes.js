const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/orders
router.post('/', async (req, res) => {
    const {
        orderItems,
        customerInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400).json({ message: 'No order items' });
        return;
    } else {
        const order = new Order({
            customerInfo,
            orderItems,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            user: "guest_user" // Or req.user._id if auth implemented
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});

module.exports = router;
