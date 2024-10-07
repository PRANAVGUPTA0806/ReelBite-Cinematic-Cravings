const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // should be smtp.gmail.com
  port: process.env.EMAIL_PORT || 587, 
  secure: process.env.EMAIL_PORT == '465', // Secure (SSL/TLS) should be true for port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  family: 4, // Force IPv4
});

// Verify SMTP connection
transporter.verify((error, success) => {
  if (error) {
    console.log('Error connecting to SMTP:', error);
  } else {
    console.log('SMTP connection successful:', success);
  }
});

// Function to send email
const sendPasswordResetEmail = async (to, resetUrl) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // sender address
      to, // receiver address
      subject: 'Password Reset Request',
      html: `
      <p>You requested a password reset.</p>
      <p>Click <a href="${resetUrl}">here</a> to reset your password.</p>
      <p>Please note that this link will expire in 1 hour.</p>
      <p>If you did not request a password reset, please ignore this email.</p>
      <p>Thank you!</p>
    `,});
    console.log('Password reset email sent');
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};

module.exports = { sendPasswordResetEmail };