
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

// backend/routes/userRoutes.js
router.patch('/address', protect, async (req, res) => {
  console.log(`address api started`);
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.address = req.body.address || user.address;
      user.city = req.body.city || user.city;
      // You can even save Lat/Lng for precise delivery later
      user.location = {
        lat: req.body.lat,
        lng: req.body.lng
      };

      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        address: updatedUser.address,
        token: req.headers.authorization.split(' ')[1], // Send same token back
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error updating address' });
  }
});

module.exports = router;