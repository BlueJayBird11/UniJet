import { Passenger } from '@/shared/types';
import React, { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid'; 

type Props = {
  passenger: Passenger;
}

const EditName = ({passenger}: Props) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const changeName = async() => {
    console.log(passenger.id);
    console.log({"firstName": name, "lastName": lastName});
    try {
      const response = await fetch(`http://localhost:8000/api/v1/settings/name/${passenger.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"firstName": name, "lastName": lastName}), // Convert the passenger object to JSON
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
    event.preventDefault()
    console.log(`New name: ${name}`)
    changeName(); // Call changeName function when the form is submitted
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-primary-blue">
      {/* Back button */}
      <Link to="/settings" className="absolute top-0 left-0 mt-4 ml-4 flex items-center text-white">
        <ChevronLeftIcon className="h-5 w-5 mr-1" />
        Back
      </Link>
      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-2xl font-bold mb-4">Edit Name</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            New Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="name"
            placeholder="Enter your first name"
            value={name}
            onChange={handleChange}
          />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
            id="lastName"
            type="lastName"
            placeholder="Enter your last name"
            value={lastName}
            onChange={handleLastNameChange}
          />
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          {success && <p className="text-green-500 text-xs italic">{success}</p>}
          </div>
        <div className="flex items-center justify-center">
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

export default EditName
