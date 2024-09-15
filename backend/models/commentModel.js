const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    id: {
        type: Number,
    },
    text: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,  // Assuming you're using MongoDB ObjectId for the product
        ref: 'Product',  // Reference to another collection (e.g., 'Product')
        // required: true   // Optional: You can make it required if necessary
    }
});

const comment = mongoose.model('comments', CommentSchema);

module.exports = comment;
