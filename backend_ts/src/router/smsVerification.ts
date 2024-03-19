import { Router } from 'express';
import axios from 'axios'; // Import Axios
import * as dotenv from 'dotenv';
dotenv.config();

const otpDatabase: Record<string, string> = {};

class SMSVerificationRoute {
    public router = Router();

    constructor() {
        this.routes();
    }

    private routes(): void {
        this.router.post('/send-phone-otp', async (req, res) => {
            const { phoneNumber } = req.body;
            if (!phoneNumber) {
                return res.status(400).json({ error: 'Phone number is required.' });
            }

            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            otpDatabase[phoneNumber] = otp;

            try {
                const response = await axios.post('https://textbelt.com/text', {
                    phone: phoneNumber,
                    message: `Your OTP is: ${otp}. If you did not request this, please ignore this message.`,
                    key: 'textbelt' // Use the free key for testing
                });

                if (response.data.success) {
                    res.json({ message: 'OTP sent successfully to phone.' });
                } else {
                    throw new Error(response.data.error || 'Failed to send OTP');
                }
            } catch (error) {
                console.error('Error sending SMS:', error);
                // Check if error is an instance of Error and thus has the message property
                const errorMessage = error instanceof Error ? error.message : 'Failed to send OTP to phone.';
                res.status(500).json({ error: errorMessage });
            }
        });

        this.router.post('/verify-phone-otp', (req, res) => {
            const { phoneNumber, otp } = req.body;

            if (!otpDatabase[phoneNumber] || otpDatabase[phoneNumber] !== otp) {
                return res.status(400).json({ error: 'OTP verification failed.' });
            }

            delete otpDatabase[phoneNumber];
            res.json({ message: 'Phone number verified successfully.' });
        });
    }
}

export default new SMSVerificationRoute().router;
