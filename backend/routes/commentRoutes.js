const express = require('express');
const router = express.Router();
const {
  getcomment,
  addcomment,
  updatecomment,
  deletecomment,
} = require('../controllers/commentControllers');

// Route to get all tasks
router.get('/tasks/:productId', getcomment);

// Route to add a new task
router.post('/add', addcomment);

// Route to update a comment
router.put('/update', updatecomment);

// Route to delete a comment
router.delete('/delete', deletecomment);

module.exports = router;