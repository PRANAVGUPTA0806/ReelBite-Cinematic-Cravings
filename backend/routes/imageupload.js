// uploadRoutes.js
const express = require('express');
const multer = require('multer');
const { uploadImage } = require('../controllers/saveimageController');

const router = express.Router();

// Multer Configuration (Memory storage)
const storage = multer.memoryStorage();  // Store files in memory
const upload = multer({ storage });

// POST route for image upload
router.post('/image', upload.single('product'), uploadImage);

module.exports = router;






// const express = require("express");
// const { saveimage } = require('../controllers/saveimageController');
// const router = express.Router();


// router.post('/image', saveimage);

// module.exports = router;