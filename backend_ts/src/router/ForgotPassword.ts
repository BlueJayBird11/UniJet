import BaseRoutes from "./base/BaseRouter";
import pool from "../db";
import nodemailer from "nodemailer";
const otpDatabase: any = {};
import * as dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

class ForgotPasswordRoute extends BaseRoutes {
  routes(): void {
    this.router.post('/send-otp', async (req, res) => {
        // req: { body: { email: any; }; }, res: { json: (arg0: { message: string; }) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }
        const email = req.body.email;
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
        otpDatabase[email] = otp; // Store OTP
    
        try {
            console.log(email)
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Your OTP',
                text: `Your OTP is: ${otp}`,
            });
            res.json({ message: 'OTP sent successfully.' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Failed to send OTP.' });
        }
    });
    
    this.router.post('/verify-otp', (req, res) => {
        // req: { body: { email: any; otp: any; }; }, res: { json: (arg0: { message: string; }) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }
        // const { email, otp } = req.body;
        const email = req.body.email;
        const otp = req.body.otp
        if (otpDatabase[email] && otpDatabase[email] === otp) {
            // OTP matches
            delete otpDatabase[email]; 
            res.json({ message: 'OTP verified successfully.' });
        } else {
            // OTP does not match
            res.status(400).json({ error: 'OTP verification failed.' });
        }
    });
  }
}

export default new ForgotPasswordRoute().router;


