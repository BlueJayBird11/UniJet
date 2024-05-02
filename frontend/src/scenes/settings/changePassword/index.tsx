import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid'; 

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New Password and Confirm Password do not match.");
      return;
    }
    // Placeholder for actual submission logic
    console.log("Submitted Change Password Request");
  };
  
  return (
    <>
      <div className="bg-gray-600 text-primary-black py-5 px-6 flex items-center justify-between">
      <Link to="/settings" className="mr-4">
        <ChevronLeftIcon className="h-6 w-6" />
      </Link>
      <div className="flex-grow flex items-center justify-center"> 
        <h1 className="text-xl text-primary-black font-bold mr-10">Change Password</h1>
      </div>
    </div>
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="current-password" className="block mb-2 text-xl  text-primary-black">Current Password</label>
            <div className="flex">
              <input 
                id="current-password"
                type={showCurrentPassword ? "text" : "password"} 
                placeholder="Enter current password"
                value={currentPassword} 
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-2 border rounded mb-2 text-primary-blue" 
                required 
              />
              <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="ml-2" style={{ width: '60px' }}>
                {showCurrentPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="new-password" className="block mb-2 text-xl text-primary-black">New Password</label>
            <div className="flex">
              <input 
                id="new-password"
                type={showNewPassword ? "text" : "password"} 
                placeholder="Enter new password"
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border rounded mb-2 text-primary-blue" 
                required 
              />
              <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="ml-2" style={{ width: '60px' }}>
                {showNewPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block mb-2 text-xl text-primary-black">Confirm New Password</label>
            <div className="flex">
              <input 
                id="confirm-password"
                type="password" 
                placeholder="Confirm new password"
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border rounded mb-2 text-primary-blue" 
                required 
              />
              <button type="button" className="invisible ml-2 text-primary-black" style={{ width: '60px' }}>Hide</button>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button type="submit" className="bg-settingsButtons text-primary-black hover:bg-settingsButtonsPressed font-bold py-2 px-4 rounded">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
