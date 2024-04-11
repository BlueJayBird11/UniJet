import { Passenger } from '@/shared/types';
import React, { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid'; 

type Props = {
  passenger: Passenger;
}

const EditName = ({passenger}: Props) => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')

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
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      passenger.firstName = name;
      passenger.lastName = lastName;
      console.log('Success:', data);
      window.history.back(); // Navigate back to previous page after successful PUT request

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value)
  };

  const handleLastNameChange = (event: FormEvent<HTMLInputElement>) => {
    setLastName(event.currentTarget.value)
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
