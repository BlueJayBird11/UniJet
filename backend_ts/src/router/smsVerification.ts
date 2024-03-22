import { Router } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import twilio from 'twilio';

const otpDatabase: Record<string, string> = {};

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

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
                const message = await twilioClient.messages.create({
                    body: `Your OTP is: ${otp}. If you did not request this, please ignore this message. Unijet`,
                    from: process.env.TWILIO_PHONE_NUMBER,
                    to: phoneNumber,
                });

                if (message.sid) {
                    res.json({ message: 'OTP sent successfully to phone.' });
                } else {
                    throw new Error('Failed to send OTP');
                }
            } catch (error) {
                console.error('Error sending SMS:', error);
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
