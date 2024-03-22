import { Passenger } from '@/shared/types';
import React from 'react'

type Props = {
  passenger: Passenger;
}

const Logout = ({passenger}: Props) => {
  return (
    <div className="flex p-10 flex-col items-center py-24 min-h-screen">
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Logout</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
        <button
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Logout
