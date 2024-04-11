import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New Password and Confirm Password do not match.");
      return;
    }
    // Placeholder for actual submission logic
    console.log("Submitted Change Password Request");
  };

  const handleCancel = () => {
    navigate('/settings'); // Navigate back to the settings page
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Change Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="current-password" className="block mb-2 text-sm font-medium text-gray-900">Current Password</label>
            <div className="flex">
              <input 
                id="current-password"
                type={showCurrentPassword ? "text" : "password"} 
                value={currentPassword} 
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-2 border rounded mb-2" 
                required 
              />
              <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="ml-2">
                {showCurrentPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="new-password" className="block mb-2 text-sm font-medium text-gray-900">New Password</label>
            <div className="flex">
              <input 
                id="new-password"
                type={showNewPassword ? "text" : "password"} 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border rounded mb-2" 
                required 
              />
              <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="ml-2">
                {showNewPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirm New Password</label>
            <input 
              id="confirm-password"
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded mb-2" 
              required 
            />
          </div>
          <div className="flex justify-end mt-4">
          <button type="button" onClick={handleCancel} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2">
            Cancel
          </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
