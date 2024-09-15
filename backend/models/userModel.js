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
    isAdmin: {
      type: Boolean,
      default: false,
    },
    resetToken: String,
  resetTokenExpire: Date,
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("User", userSchema);
