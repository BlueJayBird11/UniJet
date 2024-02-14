import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChangePasswordPage: React.FC = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const changePassword = async () => {
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Since the backend isn't set up for password reset, simulate success
        console.log("New password:", newPassword);
        alert(`Password changed successfully. New Password: ${newPassword}`);
        // Redirect to login or another relevant page
        navigate('/login');
    };

    return (
        <div>
            <h2>Change Password</h2>
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={changePassword}>Change Password</button>
        </div>
    );
};

export default ChangePasswordPage;
