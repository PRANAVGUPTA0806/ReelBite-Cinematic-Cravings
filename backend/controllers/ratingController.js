const asyncHandler = require('express-async-handler');
const Rating = require('../models/ratingModel');

// @desc    Save user rating
// @route   POST /api/rating/save-rating
// @access  Public
const saveRating = asyncHandler(async (req, res) => {
    const { userId, productId, rating } = req.body;

    if (!userId || !productId || rating == null) {
        return res.status(400).json({ success: false, message: 'Missing fields' });
    }

    // Save rating in the database
    const newRating = new Rating({
        userId,
        productId,
        rating,
    });

    await newRating.save();

    res.status(200).json({
        success: true,
        message: 'Rating saved successfully',
        rating: newRating,
    });
});

module.exports = {
    saveRating,
};