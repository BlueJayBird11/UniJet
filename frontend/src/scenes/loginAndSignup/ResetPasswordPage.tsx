import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage: React.FC = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const resetPassword = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Since the backend isn't set up for password reset, log the password to the console
        console.log("New password:", password);
        // In a real scenario, you would send this to the backend
        alert("Password reset successfully.");
        navigate('/login'); // Redirect to login page
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={resetPassword}>Reset Password</button>
        </div>
    );
};

export default ResetPasswordPage;
