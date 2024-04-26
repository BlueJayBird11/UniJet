import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid'; 

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    onLogout(); 
    navigate('/login');
  };

  return (
    <>
      <div className="bg-gray-600 text-primary-black py-5 px-6 flex items-center justify-between">
        <Link to="/settings" className="mr-4">
          <ChevronLeftIcon className="h-6 w-6" />
        </Link>
        <div className="flex-grow flex items-center justify-center">
          <h1 className="text-xl text-primary-black font-bold mr-10">Logout</h1>
        </div>
      </div>
      <div className="flex justify-center items-center py-24">
        <div className="w-full max-w-xs text-center">
          <p className="text-primary-black text-xl mb-6">Are you sure you want to logout?</p>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Logout;
