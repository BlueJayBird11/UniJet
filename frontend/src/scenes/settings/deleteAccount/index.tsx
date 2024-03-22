import { Passenger } from '@/shared/types';
import React, { useState } from 'react'

type Props = {
  passenger: Passenger;
}

const DeleteAccount = ({passenger}: Props) => {
  const [confirmation, setConfirmation] = useState('')

  // Must be fixed
  const deleteAccount = async() => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/passengers/${passenger.id}`, {
        method: 'DEL',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);
      // Use Logout Function

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteAccount = () => {
    if (confirmation === 'DELETE') {
      deleteAccount();
      console.log('Account deleted successfully!');
    } else {
      console.error('Confirmation input is incorrect!');
    }
  }

  return (
    <div className="flex p-10 flex-col items-center py-24 min-h-screen">
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Delete Account</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to delete your account? This action cannot be undone.</p>
        <input
          type="text"
          placeholder="Type DELETE to confirm"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-6 focus:outline-none focus:border-blue-500"
        />
        <button onClick={handleDeleteAccount} className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">
          Delete Account
        </button>
      </div>
    </div>
  )
}

export default DeleteAccount
