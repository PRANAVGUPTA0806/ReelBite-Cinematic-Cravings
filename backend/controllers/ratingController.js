const asyncHandler = require('express-async-handler');
const Rating = require('../models/ratingModel');


// @desc    Get user rating for a product
// @route   GET /api/rating/:userId/:productId
// @access  Public
const getUserRating = asyncHandler(async (req, res) => {
    const { userId, productId } = req.params;

    const rating = await Rating.findOne({ userId, productId });

    if (!rating) {
        return res.status(404).json({ success: false, message: 'No rating found for this user and product' });
    }

    res.status(200).json({
        success: true,
        rating: rating.rating, // Send the user's rating
    });
});

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
    saveRating,getUserRating,
};