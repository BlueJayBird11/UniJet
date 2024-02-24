// require('dotenv').config();
// import express = require('express');
// import nodemailer = require('nodemailer');
// const router = express.Router();

// // Simple in-memory "database" for demo purposes
// const otpDatabase: any = {};

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// router.post('/send-otp', async (req: { body: { email: any; }; }, res: { json: (arg0: { message: string; }) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) => {
//     const { email } = req.body;
//     const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
//     otpDatabase[email] = otp; // Store OTP

//     try {
//         await transporter.sendMail({
//             from: process.env.EMAIL_USER,
//             to: email,
//             subject: 'Your OTP',
//             text: `Your OTP is: ${otp}`,
//         });
//         res.json({ message: 'OTP sent successfully.' });
//     } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).json({ error: 'Failed to send OTP.' });
//     }
// });

// router.post('/verify-otp', (req: { body: { email: any; otp: any; }; }, res: { json: (arg0: { message: string; }) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) => {
//     const { email, otp } = req.body;
//     if (otpDatabase[email] && otpDatabase[email] === otp) {
//         // OTP matches
//         delete otpDatabase[email]; // Consider deleting the OTP after successful verification
//         res.json({ message: 'OTP verified successfully.' });
//     } else {
//         // OTP does not match
//         res.status(400).json({ error: 'OTP verification failed.' });
//     }
// });


// module.exports = router;
