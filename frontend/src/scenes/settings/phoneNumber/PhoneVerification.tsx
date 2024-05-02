import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid'; 

interface PhoneVerificationProps {}

const PhoneVerification: React.FC<PhoneVerificationProps> = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneOtp, setPhoneOtp] = useState('');
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
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
                setShowOTPInput(true); // Show the OTP input fields
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
        <>
        <div className="bg-gray-600 text-primary-black py-5 px-6 flex items-center justify-between">
            <Link to="/settings" className="mr-4">
                <ChevronLeftIcon className="h-6 w-6" />
            </Link>
            <div className="flex-grow flex items-center justify-center">
                <h1 className="text-xl text-primary-black font-bold mr-10">Change Phone Number</h1>
            </div>
        </div>
        <div className="text-primary-black">
            <div className="w-full max-w-md p-6 ">
                {!isPhoneVerified && !showOTPInput && (
                    <div>
                        <h1 className="text-xl mb-4">New Phone Number</h1>
                        <input
                            type="tel"
                            placeholder="Enter your new phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full p-2 border rounded mb-4 text-primary-blue"
                        />
                        <div className="flex justify-center">
                            <button onClick={handleSendOtp} className="bg-primary-green-500 hover:bg-settingsButtonsPressed text-primary-black font-bold py-2 px-4 rounded">Send OTP</button>
                        </div>
                    </div>
                )}

                {showOTPInput && (
                    <div>
                        <h1 className="text-xl mb-4">Enter the OTP sent to your number.</h1>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={phoneOtp}
                            onChange={(e) => setPhoneOtp(e.target.value)}
                            className="w-full p-2 border rounded mb-4 text-primary-blue"
                        />
                        <button onClick={handleVerifyOtp} className="bg-primary-green-500 hover:bg-settingsButtonsPressed text-primary-black font-bold py-2 px-4 rounded w-full">Verify OTP</button>
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
        </>
    );
};

export default PhoneVerification;
