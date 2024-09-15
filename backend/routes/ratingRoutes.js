const express = require('express');
const { saveRating } = require('../controllers/ratingController');

const router = express.Router();

// POST request to save a rating
router.post('/save-rating', saveRating);

module.exports = router;