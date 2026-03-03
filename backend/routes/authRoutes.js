const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/authMiddleware');
const sendEmailOtp = require('../utils/sendEmail')
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '30d',
    });
};
const rateLimit = require("express-rate-limit");

// Allow only 3 OTP requests per 5 minutes per IP
const otpLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 5 minutes
  max: 3,
  message: {
    message: "Too many OTP requests. Try again after 5 minutes."
  }
});

router.post('/send-email-otp', otpLimiter, async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        let user;
        // 🔥 Check if email OR phone already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { phone }]
        });

        if (existingUser) {
            if (existingUser.isEmailVerified) {
                return res.status(400).json({
                    message: "User already exists. Please login."
                });
            }

            // If not verified → allow OTP resend
            const timeLeft = existingUser.emailOtpExpiry - new Date();

            if (timeLeft > 4 * 60 * 1000) {
                return res.status(400).json({
                    message: "Please wait before requesting new OTP"
                });
            }

            user = existingUser;
        } else {
            user = new User({ name, email, phone, password });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.emailOtp = otp;
        user.emailOtpExpiry = new Date(Date.now() + 5 * 60 * 1000);

        await user.save();
        await sendEmailOtp(email, otp);

        res.json({ message: "OTP sent to email" });

    } catch (error) {
        console.error(error);

        // 🔥 Special handling for duplicate error
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Email or phone already registered."
            });
        }

        res.status(500).json({ message: "Server error" });
    }
});

router.post('/verify-email-otp', async (req, res) => {
    console.log(`verify otp came`);
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || user.emailOtp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (user.emailOtpExpiry < new Date()) {
            return res.status(400).json({ message: "OTP expired" });
        }

        user.isEmailVerified = true;
        user.emailOtp = undefined;
        user.emailOtpExpiry = undefined;

        await user.save();

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });

    } catch (error) {
        res.status(500).json({ message: "Verification failed" });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 🔹 1. Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required."
            });
        }

        const user = await User.findOne({ email });

        // 🔹 2. User not found
        if (!user) {
            return res.status(401).json({
                message: "No account found with this email."
            });
        }

        // 🔹 3. Email not verified
        if (!user.isEmailVerified) {
            return res.status(403).json({
                message: "Please verify your email before logging in."
            });
        }

        // 🔹 4. Wrong password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        // 🔹 5. Success
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error. Please try again later."
        });
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





module.exports = router;
