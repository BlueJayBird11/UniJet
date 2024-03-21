import { Passenger } from '@/shared/types';
import React, { useState, FormEvent } from 'react'

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
      // setShowModal(true);

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
    // could probably add the logic for handling the name update here
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Edit Name</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            New Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="name"
            placeholder="Enter your new name"
            value={name}
            onChange={handleChange}
          />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastName"
            type="lastName"
            placeholder="last name"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={changeName}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditName
