import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { Passenger } from '@/shared/types';

type Props = {
  passenger: Passenger;
};

const DeleteAccount = ({ passenger }: Props) => {
  const [confirmation, setConfirmation] = useState('');

  const deleteAccount = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/passengers/${passenger.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      
      // Use Logout Function

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteAccount = () => {
    if (confirmation === 'DELETE') {
      deleteAccount();
      
    } else {
      console.error('Confirmation input is incorrect!');
    }
  };

  return (
    <>
      <div className="bg-gray-600 text-primary-black py-5 px-6 flex items-center justify-between">
      <Link to="/settings" className="mr-4">
        <ChevronLeftIcon className="h-6 w-6" />
      </Link>
      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-xl text-primary-black font-bold mr-10">Delete Account</h1>
      </div>
    </div>
      <div className="py-10 flex justify-center items-center">
        <div className="w-full max-w-xs text-center">
          <p className="text-primary-black mb-6">Are you sure you want to delete your account? This action cannot be undone.</p>
          <input
            type="text"
            placeholder="Type DELETE to confirm"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-6 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleDeleteAccount}
            className="w-full bg-settingsButtons text-primary-black py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            Delete Account
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteAccount;
