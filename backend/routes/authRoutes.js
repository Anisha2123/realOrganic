const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/authMiddleware');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '30d',
    });
};

// 1. Pre-Registration Check (Call this before sending OTP)
router.post('/check-user', async (req, res) => {
    console.log("check-user api called");
    const { email, phone } = req.body;
    try {
        const userExists = await User.findOne({ $or: [{ email }, { phone }] });
        if (userExists) {
            return res.status(400).json({ message: 'Email or Phone already registered' });
        }
        console.log(`proceeding to otp`);
        res.status(200).json({ message: 'Proceed to OTP' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// 2. Final Registration (Call this after Firebase OTP is verified)
router.post('/register', async (req, res) => {
    console.log(`registr api called`);
    const { name, email, password, phone, firebaseUid } = req.body;

    try {
        // Final security check
        const userExists = await User.findOne({ $or: [{ email }, { phone }] });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        // Create the user
        const user = await User.create({
            name,
            email,
            password, // Password will be hashed by your User Model middleware
            phone,
            firebaseUid // Optional: Store for future login/security
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});
// @desc    Auth user & get token
// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Get user profile
// @route   GET /api/auth/profile
router.get('/profile', protect, async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

const nodemailer = require('nodemailer');

// Temporary store for OTPs (In production, use Redis or a DB collection with TTL)
let otpStore = {}; 

router.post('/send-otp', async (req, res) => {
    console.log(`send-otp api called`);
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = { otp, expires: Date.now() + 300000 }; // 5 mins expiry

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });

    try {
        await transporter.sendMail({
            from: '"RealOrganic" <no-reply@realorganic.com>',
            to: email,
            subject: "Your Registration OTP",
            text: `Your OTP is ${otp}. It expires in 5 minutes.`
        });
        res.status(200).json({ success: true, message: 'OTP sent to email' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Email failed to send' });
    }
});



module.exports = router;
