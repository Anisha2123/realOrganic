const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Razorpay = require('razorpay');
const crypto = require('crypto'); // Built-in Node.js module for security
const { protect } = require('../middleware/authMiddleware');
const sendOrderEmail = require("../utils/sendOrderEmail");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Step 1: Create Razorpay Order ID (Server-side)
// @route   POST /api/orders/payment
router.post('/payment', async (req, res) => {
    const { amount } = req.body;

    const options = {
        amount: Math.round(amount * 100), // Amount in paise
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error("Razorpay Order Error:", error);
        res.status(500).json({ message: "Could not create payment intent" });
    }
});

// @desc    Step 2: Verify Payment & Save Final Order
// @route   POST /api/orders
router.post('/', protect, async (req, res) => {
    console.log("DEBUG: User from middleware:", req.user); // Should not be undefined
    console.log("DEBUG: Auth Header:", req.headers.authorization);

    if (!req.user) {
        return res.status(401).json({ message: "User context lost. Please re-login." });
    }
    const {
        orderItems,
        customerInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentResult, // Contains razorpay_order_id, razorpay_payment_id, razorpay_signature
    } = req.body;

    try {
        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        // --- 1. SIGNATURE VERIFICATION ---
        // We verify that the signature matches the order and payment ID
        const { id: payment_id, order_id, signature } = paymentResult;
        
        const generated_signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${order_id}|${payment_id}`)
            .digest('hex');

        if (generated_signature !== signature) {
            return res.status(400).json({ message: 'Transaction is not authentic!' });
        }

        // --- 2. CREATE THE ORDER ---
        const order = new Order({
            user: req.user._id, // SECURE: Comes from the verified JWT, not the frontend body
            customerInfo,
            orderItems,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paymentResult: {
                id: payment_id,
                order_id: order_id,
                signature: signature,
                status: 'paid',
                update_time: new Date().toISOString()
            },
            isPaid: true,
            paidAt: Date.now(),
        });
        console.log("customer info:", customerInfo);

        const createdOrder = await order.save();
        await sendOrderEmail(createdOrder, req.user.email);
        res.status(201).json(createdOrder);

    } catch (error) {
        console.error("Order Creation Error:", error);
        res.status(500).json({ message: "Server error during order creation" });
    }
});

router.get('/myorders', protect, async (req, res) => {
    try {
        // req.user._id comes from the 'protect' middleware!
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server Error fetching orders" });
    }
});
module.exports = router;