const express = require('express');
const { createContactSubmission } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware'); // Authentication middleware

const router = express.Router();

// POST /api/contact
// Protected route (user must be authenticated)
router.post('/contact', createContactSubmission);

module.exports = router;
