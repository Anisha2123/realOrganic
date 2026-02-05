const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    // Proper relationship: Link to the User model
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }, 
    customerInfo: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        zip: { type: String, required: true },
    },
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true }, // Snapshotted image
            price: { type: Number, required: true }, // Snapshotted price (crucial!)
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
        },
    ],
    itemsPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: Number, required: true, default: 5.0 },
    totalPrice: { type: Number, required: true },
    
    // Enhanced Razorpay Tracking
    paymentResult: {
        id: { type: String },           // razorpay_payment_id
        order_id: { type: String },     // razorpay_order_id (from Razorpay API)
        signature: { type: String },    // razorpay_signature (for verification)
        status: { type: String },
        update_time: { type: String },
    },
    
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);