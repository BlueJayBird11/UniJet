import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid'; 
import { Passenger } from '@/shared/types';

type Props = {
  passenger: Passenger;
}

const EditName = ({passenger}: Props) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const changeName = async () => {
    console.log(passenger.id);
    console.log({ firstName: name, lastName: lastName });
    try {
      const response = await fetch(`http://localhost:8000/api/v1/settings/name/${passenger.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName: name, lastName: lastName }),
      });

      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }

      const data = await response.json();
      passenger.firstName = name;
      passenger.lastName = lastName;
      setSuccess('Name updated successfully!');
      setTimeout(() => {
        setSuccess('');
        window.history.back();
      }, 3000);
       // Navigate back to previous page after successful PUT request

      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error:', error);
          setError(`Failed to update name: ${error.message}`);
        } else {
          console.error('Error:', error);
          setError('Failed to update name: An unexpected error occurred');
        }
        setTimeout(() => setError(''), 3000);
      }
    };

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
    setError('');
    setSuccess('');

  };

  const handleLastNameChange = (event: FormEvent<HTMLInputElement>) => {
    setLastName(event.currentTarget.value);
    setError('');
    setSuccess('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`New name: ${name}`);
    changeName();
  };

  return (
    <>
      <div className="bg-gray-600 text-primary-black py-5 px-6 flex items-center justify-between">
      <Link to="/settings" className="mr-4">
        <ChevronLeftIcon className="h-6 w-6" />
      </Link>
      <div className="flex-grow flex items-center justify-center"> 
          <h2 className="text-xl text-primary-black font-bold mr-10">Change Name</h2>
        </div>
    </div>
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-primary-black text-xl  mb-2" htmlFor="name">
              New Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your first name"
              value={name}
              onChange={handleChange}
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={handleLastNameChange}
            />
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          {success && <p className="text-green-500 text-xs italic">{success}</p>}
          </div>
          <div className="flex justify-center">
            <button
              className="bg-settingsButtons hover:bg-settingsButtonsPressed text-primary-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Change Name
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditName;
