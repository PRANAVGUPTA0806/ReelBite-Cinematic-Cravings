const express = require("express");
const { saveimage } = require('../controllers/saveimageController');
const router = express.Router();


router.post('/image', saveimage);

module.exports = router;