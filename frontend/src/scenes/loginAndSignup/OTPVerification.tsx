import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OTPVerificationPage: React.FC = () => {
    const [email, setEmail] = useState(''); // Add this line to store email
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const verifyOtp = async () => {
        axios.post('http://localhost:3001/verify-otp', { email, otp }) // Include email in the request
            .then((response) => {
                console.log(response.data);
                alert("OTP verified successfully.");
                navigate('/reset-password'); // Navigate to Reset Password page
            })
            .catch((error) => {
                console.error("Error verifying OTP:", error);
                alert("Failed to verify OTP. Please try again.");
            });
    };

    return (
        <div>
            <h2>Enter OTP</h2>
            <input
                type="email" // Change this type to email
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Set email from input
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
