const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    id: {
        type: Number,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    text: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    
});

const comment = mongoose.model('comments', CommentSchema);

module.exports = comment;
