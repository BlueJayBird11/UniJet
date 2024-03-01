import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import background from './background.png';

const OTPVerificationPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const navigate = useNavigate();

    const verifyOtp = async () => {
        axios.post('http://localhost:8000/api/verify-otp', { email, otp })
            .then((response) => {
                // Handle successful OTP verification
                alert("OTP verified successfully.");
                navigate('/change-password'); 
            })
            .catch((error) => {
                // Handle error in OTP verification
                console.error("Error verifying OTP:", error);
                alert("Failed to verify OTP. Please try again.");
            });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-no-repeat bg-cover" style={{ backgroundImage: `url(${background})` }}>
            <div className="w-full max-w-md">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-xl font-semibold text-center mb-6">Verify OTP</h2>
                    <div>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 border rounded mb-4"
                        />
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            className="w-full p-2 border rounded mb-4"
                        />
                        <button onClick={verifyOtp} className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full p-2 border rounded">
                            VERIFY OTP
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTPVerificationPage;
