import React, { useState } from 'react'

const DeleteAccount = () => {
  const [confirmation, setConfirmation] = useState('')

  const handleDeleteAccount = () => {
    if (confirmation === 'DELETE') {
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
