// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header (Bearer <token>)
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            console.log("DEBUG: JWT_SECRET exists?", !!process.env.JWT_SECRET);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token and attach to request (excluding password)
            req.user = await User.findById(decoded.id).select('-password');
            console.log(req.user);
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };