const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { sendPasswordResetEmail } = require("../utils/sendEmail");
const crypto = require("crypto");
require('dotenv').config();

// @desc    Register a new user
// @route   POST /api/user/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Check if all fields are provided
  if (!username || !email || !password) {
    return res.status(400).json({ 
      success: false, 
      error: "Please provide all fields" 
    });
  }

  // Check if user already exists (including deleted accounts)
  const userExists = await User.findOne({ email });
  
  if (userExists) {
    if (userExists.isDeleted) {
      // Reactivate the deleted account
      userExists.username = username;
      userExists.password = await bcrypt.hash(password, await bcrypt.genSalt(10));
      userExists.isDeleted = false; // Mark the user as not deleted
      await userExists.save();

      // Generate JWT
      const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return res.status(200).json({
        _id: userExists._id,
        username: userExists.username,
        email: userExists.email,
        token,
      });
    } else {
      return res.status(400).json({
        success: false,
        error: "Existing user found with the same email address",
      });
    }
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } else {
    return res.status(400).json({ 
      success: false, 
      error: "Invalid user data" 
    });
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/user/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });

  if (user) {

    if (user.isDeleted) {
      return res.status(400).json({ success: false, error: "User account is deleted. Please contact support." });
    }
    if((await bcrypt.compare(password, user.password))){
    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    let role1;
    if (user.isAdmin){
      role1='admin'
    }else {
      role1='user'
    }

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      imageUrl: user.imageUrl,
      token,
      role:role1
    });
  }else{
    res.status(400).json({success:false,error:"Wrong Password"})
  } 
}else{
  res.status(400).json({success:false,error:"Wrong email address"})
}
});

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      imageUrl:user.imageUrl,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.imageUrl = req.body.avatar || user.imageUrl;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    // Generate new JWT token
    const token = jwt.sign({ id: updatedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      imageUrl: updatedUser.imageUrl,
      token,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Request password reset link
// @route   POST /api/user/forgot-password
// @access  Public
const requestPasswordReset = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Please provide an email address");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.isDeleted) {
    res.status(403);
    throw new Error("Cannot reset password for a deleted user.");
  }
  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetToken = resetToken;
  user.resetTokenExpire = Date.now() + 3600000; // 1 hour expiration
  await user.save();

  const frontendUrl = req.headers.origin; // Get the request origin (domain)
  const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;
  await sendPasswordResetEmail(user.email, resetUrl);

  res.json({ success: true });
});

// @desc    Reset user password
// @route   POST /api/user/reset-password/:resetToken
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  try {
    const { resetToken } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
      resetToken,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired token' });
    }
    if (user.isDeleted) {
      return res.status(400).json({ success: false, message: 'User account is deleted. Please contact support.' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetToken = undefined; // Clear reset token
    user.resetTokenExpire = undefined; // Clear token expiration
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({
      success: true,
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error('Error in resetting password:', error); // Log the actual error
    res.status(500).json({ success: false, message: 'Server error while resetting password' });
  }
});

// @desc    Get all users (Admin only)
// @route   GET /api/user/all-users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password"); // Exclude password field

  if (users) {
    res.json(users);
  } else {
    res.status(404);
    throw new Error("No users found");
  }
});

// @desc    Update user by Admin
// @route   PUT /api/user/update-admin/:id
// @access  Private/Admin
const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { username, email, isAdmin, imageUrl } = req.body;

  // Find the user by id
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  // Update user fields
  user.username = username || user.username;
  user.email = email || user.email;
  user.isAdmin = isAdmin !== undefined ? isAdmin : user.isAdmin;
  user.imageUrl = imageUrl || user.imageUrl;
  
  const updatedUser = await user.save();

  res.json({
    success: true,
    message: 'User updated successfully',
    updatedUser,
  });
});

const deleteUserByAdmin = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Set isDeleted to true
    user.isDeleted = true;
    user.userStatus='Deactivated';

    await user.save();

    res.status(200).json({ message: 'User marked as deleted successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const restoreUserByAdmin = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Set isDeleted to false
    user.isDeleted = false;
    user.userStatus='Active';

    await user.save();

    res.status(200).json({ message: 'User restored successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  requestPasswordReset,
  resetPassword,getAllUsers,updateUserByAdmin,deleteUserByAdmin,restoreUserByAdmin,
};