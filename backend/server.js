const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const crypto = require('crypto');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server on ${PORT}`));

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
console.log(`Attempting to connect to MongoDB at: ${process.env.MONGO_URI}`);
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes (Placeholder for now)
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Import Routes
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

// Mount Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);


app.post('/api/webhook/razorpay', express.raw({ type: 'application/json' }), async (req, res) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers['x-razorpay-signature'];

    const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(req.body) // req.body must be the RAW buffer
        .digest('hex');

    if (expectedSignature === signature) {
        const payload = JSON.parse(req.body);
        
        if (payload.event === 'order.paid') {
            const { id: razorpay_order_id } = payload.payload.order.entity;
            
            // Logged-in user logic:
            // Find the order by razorpay_order_id and mark as paid
            const order = await Order.findOne({ 'paymentResult.order_id': razorpay_order_id });
            if (order) {
                order.isPaid = true;
                order.paidAt = Date.now();
                await order.save();
            }
        }
        res.status(200).send('OK');
    } else {
        res.status(400).send('Invalid signature');
    }
});
