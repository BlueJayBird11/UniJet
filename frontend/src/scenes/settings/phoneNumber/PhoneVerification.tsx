import React, { useState } from 'react';
import axios from 'axios';

interface PhoneVerificationProps {
    // Define your props here if needed
}

const PhoneVerification: React.FC<PhoneVerificationProps> = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneOtp, setPhoneOtp] = useState('');
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [otpError, setOtpError] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [otpSent, setOtpSent] = useState(false); // New state to track if OTP was sent

    const handleSendOtp = async () => {
        if (!phoneNumber || phoneNumber.length < 10) {
            alert('Please enter a valid phone number');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/api/send-phone-otp', { phoneNumber });
            if (response.status === 200) {
                console.log('OTP sent successfully:', response.data.message);
                setOtpSent(true); // OTP was successfully sent
            } else {
                throw new Error(response.data.error || 'Failed to send OTP');
            }
        } catch (error: any) {
            console.error('Error sending OTP:', error);
            alert((error.response?.data?.error || 'Failed to send OTP') as string); // Cast to string if needed
            setOtpSent(false); // Failed to send OTP
        }
    };

    const handleVerifyOtp = async () => {
        if (!phoneOtp || phoneOtp.length !== 6) {
            alert('Please enter the 6-digit OTP');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/api/verify-phone-otp', { phoneNumber, otp: phoneOtp });
            if (response.status === 200) {
                setIsPhoneVerified(true);
                console.log('Phone number verified:', response.data.message);
                setOtpSent(false); // Reset OTP sent status after successful verification
                setEditMode(false); // Exit edit mode after successful verification
            } else {
                throw new Error(response.data.error || 'OTP verification failed');
            }
        } catch (error: any) {
            console.error('Error verifying OTP:', error);
            setOtpError((error.response?.data?.error || 'Failed to verify OTP') as string); // Cast to string if needed
        }
    };

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {!isPhoneVerified && (
                <div style={{ marginBottom: '20px' }}>
                    {editMode && !otpSent ? ( // Only show this if in edit mode and OTP has not been sent
                        <>
                            <input
                                type="tel"
                                placeholder="Enter new phone number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                style={{ marginRight: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                            />
                            <button onClick={handleSendOtp} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: 'blue', color: 'white', cursor: 'pointer' }}>Send OTP</button>
                        </>
                    ) : (
                        <button onClick={() => { setEditMode(true); setOtpSent(false); }} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: 'blue', color: 'white', cursor: 'pointer' }}>Change Phone Number</button>
                    )}
                </div>
            )}
            {isPhoneVerified && (
                <div style={{ marginBottom: '20px' }}>
                    <p>Your phone number is verified.</p>
                    <button onClick={() => { setEditMode(true); setOtpSent(false); }} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: 'blue', color: 'white', cursor: 'pointer' }}>Change Phone Number</button>
                </div>
            )}
            {editMode && otpSent && ( // Only show OTP input if OTP has been sent
                <div>
                    <input
                        type="text"
                        placeholder="Enter OTP sent to your phone"
                        value={phoneOtp}
                        onChange={(e) => setPhoneOtp(e.target.value)}
                        style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    {otpError && <div style={{ color: 'red', marginBottom: '10px' }}>{otpError}</div>}
                    <button onClick={handleVerifyOtp} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: 'green', color: 'white', cursor: 'pointer' }}>Verify OTP</button>
                </div>
            )}
        </div>
    );
};

export default PhoneVerification;
