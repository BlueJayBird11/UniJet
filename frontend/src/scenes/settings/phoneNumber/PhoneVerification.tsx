import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


interface PhoneVerificationProps {}

const PhoneVerification: React.FC<PhoneVerificationProps> = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneOtp, setPhoneOtp] = useState('');
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showOTPInput, setShowOTPInput] = useState(false);
    const [otpError, setOtpError] = useState('');
    const [countdown, setCountdown] = useState(7);

    const navigate = useNavigate();

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | null = null; 
        if (isPhoneVerified && countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
        } else if (countdown === 0) {
            navigate('/settings');
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [isPhoneVerified, countdown, navigate]);

    const handleSendOtp = async () => {
        if (!phoneNumber || phoneNumber.length < 10) {
            setOtpError('Please enter a valid phone number.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/api/send-phone-otp', { phoneNumber });
            if (response.status === 200) {
                setShowOTPInput(true);
                setOtpError('');
            } else {
                throw new Error(response.data.error || 'Failed to send OTP');
            }
        } catch (error: any) {
            setOtpError(error.response?.data?.error || 'Failed to send OTP');
        }
    };

    const handleVerifyOtp = async () => {
        if (!phoneOtp || phoneOtp.length !== 6) {
            setOtpError('Please enter the 6-digit OTP');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/api/verify-phone-otp', { phoneNumber, otp: phoneOtp });
            if (response.status === 200) {
                setIsPhoneVerified(true);
                setShowConfirm(false);
                setShowOTPInput(false);
                setOtpError('');
            } else {
                throw new Error(response.data.error || "OTP doesn't match.");
            }
        } catch (error: any) {
            setOtpError(error.response?.data?.error || 'Failed to verify OTP');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
                {!isPhoneVerified && !showConfirm && (
                    <div>
                        <h1 className="text-xl font-bold text-center mb-4">Change your phone number?</h1>
                        <button onClick={() => setShowConfirm(true)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded block w-full mb-2">Yes</button>
                        <button onClick={() => navigate('/settings')} className="bg-red-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded block w-full">No</button>
                    </div>
                )}
                {showConfirm && !showOTPInput && (
                    <div>
                        <h1 className="text-xl font-bold text-center mb-4">Please enter your phone number.</h1>
                        <input
                            type="tel"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full p-2 border rounded mb-4"
                        />
                        <button onClick={handleSendOtp} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full">Send OTP</button>
                    </div>
                )}
                {showOTPInput && (
                    <div>
                        <h1 className="text-xl font-bold text-center mb-4">Enter the OTP sent to your number.</h1>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={phoneOtp}
                            onChange={(e) => setPhoneOtp(e.target.value)}
                            className="w-full p-2 border rounded mb-4"
                        />
                        <button onClick={handleVerifyOtp} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full">Verify OTP</button>
                    </div>
                )}
                {otpError && (
                    <div className="text-red-500 text-center mt-4">{otpError}</div>
                )}
                {isPhoneVerified && (
                    <div className="text-green-500 text-center mt-4">
                        <p style={{fontSize: 'md', fontWeight: 'bold'}}>Your phone number is verified and changed.</p>
                        <p><strong>Redirecting to settings in {countdown} seconds...</strong></p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default PhoneVerification;
