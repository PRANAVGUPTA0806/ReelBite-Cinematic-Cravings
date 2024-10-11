const mongoose = require("mongoose");


const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add your name"],
    },
    email: {
      type: String,
      required: [true, "Please add your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add your password"],
    },
    userStatus: {
      type: String,
      enum: ['Active', 'Suspended', 'Deactivated'], // Enum for user status
      default: 'Active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    imageUrl:{
      type: String,
      default:"https://res.cloudinary.com/dwprhpk9r/image/upload/v1728546051/uploads/product_1728546048771.png.png",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    resetToken: String,
  resetTokenExpire: Date,
  carts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart'
}],
currentCart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart'
}
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("User", userSchema);
