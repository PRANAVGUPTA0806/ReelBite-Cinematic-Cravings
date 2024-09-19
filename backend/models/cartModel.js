const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    sessionId: {
        type: String,
        required: false
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            productName: { type: String, required: true },
            productDescription:{type:String},
            image: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true, default: 1 },
            totalPrice: { type: Number, required: true }
        }
    ],
    totalPrice: { type: Number, required: true, default: 0 },
    totalQuantity: { type: Number, default: 0 },
    taxAmount: { type: Number, default: 0 },
    couponCode: { type: String },
    discountAmount: { type: Number, default: 0 },
    expiresAt: { type: Date },
    isExpired: { type: Boolean, default: false }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Cart', cartSchema);

