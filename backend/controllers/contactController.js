const Contact = require('../models/contactModel');
const User = require('../models/userModel');

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
