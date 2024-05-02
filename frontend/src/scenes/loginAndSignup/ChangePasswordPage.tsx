import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import background from './background.png'; 
import axios from 'axios';

const ChangePasswordPage: React.FC = () => {
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location.state as { email: string };
    
    const getPassengerId = async (email: string): Promise<number> => {
        try {
            const response = await axios.get('http://localhost:8000/api/passenger-id/', {
                params: { email: email }
            });
            return response.data.id;
        } catch (error) {
            // Handle error in OTP verification
            alert("Failed to get associated email. Please try again.");
            throw error; // Rethrow error if necessary
        }
    };
    
    const changePassword = async () => {
        let passed = false;

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        else { 
            try {
                const id = await getPassengerId(email)
                const response = await fetch(`http://localhost:8000/api/change-password/${id}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({"passwordHash": newPassword, "id": id}), // Convert the passenger object to JSON
                });
          
                if (!response.ok) {
                  throw new Error(`Error: ${response.status}`);
                }
          
                const data = await response.json();
                console.log('Success:', data);
                passed = true
                // setShowModal(true);
          
              } catch (error) {
                passed = false
                console.error('Error:', error);
              }
        }
        if (passed) { 
            console.log("New password:", newPassword);
            alert("Your password has been changed successfully.");
            navigate('/'); 
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-no-repeat bg-cover" style={{ backgroundImage: `url(${background})` }}>
            <div className="w-full max-w-md">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-xl font-semibold text-center mb-6">Change Password</h2>
                    <div>
                    <div className="relative mb-4">
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className="w-full p-2 border rounded pr-12"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                            >
                                {showNewPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full p-2 border rounded mb-4"
                        />
                        <button onClick={changePassword} className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full p-2 border rounded">
                            Change Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordPage;
