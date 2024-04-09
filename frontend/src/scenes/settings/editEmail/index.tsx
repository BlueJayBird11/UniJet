import { Passenger } from '@/shared/types';
import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid'; 
type Props = {
  passenger: Passenger;
}

const EditEmail = ({passenger}: Props) => {
  const [email, setEmail] = useState('');

  const changeEmail = async() => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/settings/email/${passenger.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"email": email}), // Convert the passenger object to JSON
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      passenger.email = email;
      console.log('Success:', data);
      // setShowModal(true);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`New email: ${email}`);
    await changeEmail(); // Call changeEmail function to update email
    window.history.back(); // Navigate back to previous page
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="absolute top-0 left-0 mt-4 ml-4 flex items-center text-white">
        <Link to="/settings" className="flex items-center">
          <ChevronLeftIcon className="h-5 w-5 mr-1" />
          Back
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Edit Email</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            New Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your new email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmail;
