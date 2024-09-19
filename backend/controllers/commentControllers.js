// controllers/todoController.js
const Todo = require('../models/commentModel'); // Adjust the path as necessary

// @desc    Get all tasks
// @route   GET /tasks
const getcomment = async (req, res) => {
  try {
    const tasks = await Todo.find({ productId: req.params.productId }); // Use req.params for productId
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Add a new task
// @route   POST /add
const addcomment = async (req, res) => {
  try {
    let todos = await Todo.find();
    let id;
    if (todos.length > 0) {
      let last = todos[todos.length - 1];
      id = last.id + 1;
    } else {
      id = 1;
    }

    const newTodo = new Todo({
      id: id,
      text: req.body.text,
      productId:req.body.productId,
    });

    await newTodo.save();
    res.status(200).json({
      success: true,
      message: 'comment added successfully',
      todo: newTodo,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Update a task
// @route   PUT /update
const updatecomment = async (req, res) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { id: req.body.id, productId: req.body.productId }, // Include productId in the filter
      { text: req.body.text },
      { new: true }
    );

    if (updatedTodo) {
      res.status(200).json({
        success: true,
        message: 'Comment updated successfully',
        todo: updatedTodo,
      });
    } else {
      res.status(404).json({ success: false, error: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Delete a task
// @route   DELETE /delete
const deletecomment = async (req, res) => {
  try {
    const deletedTodo = await Todo.findOneAndDelete({ productId:req.body.productId,id: req.body.id });

    if (deletedTodo) {
      res.status(200).json({
        success: true,
        message: 'comment deleted successfully',
        todo: deletedTodo,
      });
    } else {
      res.status(404).json({ success: false, error: 'comment not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

module.exports = {
  getcomment,
  addcomment,
  updatecomment,
  deletecomment,
};
