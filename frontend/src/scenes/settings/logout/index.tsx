import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    onLogout(); 
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center py-24 min-h-screen">
      <div className="w-full max-w-xs p-4 bg-white shadow-md rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Logout</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
