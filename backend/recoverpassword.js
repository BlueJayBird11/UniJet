require('dotenv').config(); // Ensure you've installed the dotenv package: npm install dotenv
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail'); // Use SendGrid Mail package

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Set the API key

// Temporary in-memory storage for OTPs keyed by email
const otpStorage = {};

app.post('/send-otp', (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Store OTP as string
  otpStorage[email] = otp; // Store OTP against the email for verification

  const msg = {
    to: email,
    from: process.env.SENDGRID_VERIFIED_SENDER, // Ensure this is set in your .env
    subject: 'Your OTP for password recovery',
    text: `Your OTP is: ${otp}`,
  };

  sgMail.send(msg).then(() => {
    console.log('OTP sent successfully to:', email);
    res.json({ status: 'success', message: 'OTP sent successfully' });
  }).catch((error) => {
    console.error('Error sending OTP:', error);
    res.status(500).json({ status: 'fail', message: 'Failed to send OTP', details: error });
  });
});

app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (otpStorage[email] && otpStorage[email] === otp) {
    console.log(`OTP verified successfully for: ${email}`);
    res.json({ status: 'success', message: 'OTP verified successfully' });
    delete otpStorage[email]; // Clear the OTP after successful verification
  } else {
    console.log(`OTP verification failed for: ${email}`);
    res.status(400).json({ status: 'fail', message: 'OTP verification failed' });
  }
});

app.post('/reset-password', (req, res) => {
  const { email, newPassword } = req.body;
  console.log(`Password for ${email} is reset to: ${newPassword}`);
  res.json({ status: 'success', message: 'Password reset successfully' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
