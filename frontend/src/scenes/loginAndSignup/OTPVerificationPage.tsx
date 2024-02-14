import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OTPVerificationPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const verifyOtp = async () => {
        // Replace with your actual verification endpoint
        axios.post('http://localhost:4000/api/verify-otp', { email, otp })
            .then((response) => {
                alert("OTP verified successfully.");
                // Navigate to the password change page/mockup
                navigate('/change-password'); // This path should match your route setup
            })
            .catch((error) => {
                console.error("Error verifying OTP:", error);
                alert("Failed to verify OTP. Please try again.");
            });
    };

    return (
        <div>
            <h2>OTP Verification</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="text"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={verifyOtp}>Verify OTP</button>
        </div>
    );
};

export default OTPVerificationPage;
