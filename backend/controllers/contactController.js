const Contact = require('../models/contactModel');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,  // SMTP server from .env
    port: process.env.EMAIL_PORT || 587,  // SMTP port from .env
    secure: process.env.SMTP_PORT == 465,  // True for port 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,  // Your email address from .env
        pass: process.env.EMAIL_PASS,  // Your email password from .env
    },
});

// @desc    Create a new contact submission
// @route   POST /api/contact
// @access  Private (linked to a user)
const createContactSubmission = async (req, res) => {
    const { fullName, email, message } = req.body;

    // Validate request body
    if (!fullName || !email || !message) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Find the logged-in user from the request (assuming user info is attached to req.user after authentication)
        const user = req.user; 

     

        // Create a new contact instance linked to the user
        const newSubmission = new Contact({
            fullName,
            email,
            message,
            user: user ? user.id : undefined, // Associate the submission with the logged-in user if present
        });


        // Save the new contact submission
        await newSubmission.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,  // Sender address from .env
            to: email,  // Email address where feedback notification should be sent
            subject: 'New Feedback Submitted',
            text: `Hello ${fullName},\n\nEmail: ${email}\nThank you for your feedback! We appreciate your input and will get back to you if necessary.\n\nYour feedback: ${message}\n\nBest regards,\nThe NutriiNuts Team`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Return a success response
        res.status(201).json({
            message: 'Contact submission received',
            submission: newSubmission,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createContactSubmission,
};
