const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const crypto = require('crypto');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// const allowedOrigins = process.env.CORS_ORIGIN.split(",");

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };

const allowedOrigins = process.env.CORS_ORIGIN.split(",");

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow server-to-server

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString()
    });
});

// Database Connection
if (!process.env.MONGO_URI) {
    console.error('❌ MONGO_URI is not defined in environment variables');
    process.exit(1);
}

console.log(`Attempting to connect to MongoDB...`);
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch(err => {
        console.error('❌ MongoDB Connection Error:', err);
        process.exit(1);
    });

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
    
    if (!secret) {
        console.error('❌ RAZORPAY_WEBHOOK_SECRET not configured');
        return res.status(500).send('Webhook secret not configured');
    }
    
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
            const Order = require('./models/Order');
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

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
