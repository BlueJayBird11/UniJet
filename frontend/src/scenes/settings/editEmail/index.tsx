import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid'; 
import { Passenger } from '@/shared/types';

type Props = {
  passenger: Passenger;
}

const Banner = () => {
  return (
    <div className="bg-gray-600 text-primary-black py-5 px-6 flex items-center justify-between">
      <Link to="/settings" className="mr-4">
        <ChevronLeftIcon className="h-6 w-6" />
      </Link>
      <div className="flex-grow flex items-center justify-center"> 
        <h1 className="text-xl text-primary-black font-bold mr-10">Edit Email</h1>
      </div>
    </div>
  );
};

const EditEmail = ({ passenger }: Props) => {
  const [email, setEmail] = useState(passenger.email);

  const changeEmail = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/settings/email/${passenger.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email": email }),
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`New email: ${email}`);
    await changeEmail();
    window.history.back();
  };

  return (
    <>
      <Banner />
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-primary-black text-sm font-bold mb-2" htmlFor="email">
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
          <div className="flex justify-center">
            <button
              className="bg-settingsButtons hover:bg-settingsButtonsPressed text-primary-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditEmail;
