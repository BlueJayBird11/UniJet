import React, { useEffect, useState } from 'react'
import { Cog6ToothIcon } from "@heroicons/react/20/solid";
import { Link } from 'react-router-dom';
import { Passenger, SelectedPage } from '@/shared/types';

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
  passenger: Passenger;
}

const index = ({ selectedPage, setSelectedPage, passenger }: Props) => {
  const [rating, setRating] = useState(null); // null or some default value

  const changeStatus = async (statusBool: boolean) => {
    try {
      let statusNum: number = 0;
      if (statusBool == true) {
        statusNum = 0;
      }
      else {
        statusNum = 1;
      }
      const response = await fetch(`http://localhost:8000/api/v1/settings/status/${passenger.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "newStatus": statusNum }), // Convert the passenger object to JSON
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      passenger.userStatus = statusNum;

      const data = await response.json();
      console.log('Success:', data);
      // setShowModal(true);
      //handleStatusClick();
      onlineStatus(!offlineStatus)

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getRating = async (id: number) => {
    try {

      const response = await fetch(`http://localhost:8000/api/v1/passengers/rating/${passenger.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);
      let rating = data.data.passenger.rating;
      console.log(rating);
      return rating;

    } catch (error) {
      console.error('Error:', error);
      return 0.0;
    }
  };

  const [offlineStatus, onlineStatus] = useState(true);

  const handleStatusClick = () => {
    changeStatus(!offlineStatus);
  };

  useEffect(() => {
    // Define the async function inside useEffect
    const fetchRating = async () => {
      try {
        let tempNum = await getRating(passenger.id);
        setRating(tempNum); // Update state with the fetched rating
      } catch (error) {
        console.error('Failed to fetch rating:', error);
        // Handle error (e.g., set rating to a default value or show an error message)
      }
    };

    fetchRating(); // Execute the async function
  }, [passenger.id]);


  const name: string = passenger.firstName;

  return (
    <header className='relative'>
      <div className='flex justify-end p-4'>
        <Link to="/settings">
          <button>
            <Cog6ToothIcon className='w-10 h-10 text-settingsIconColor' />
          </button>
        </Link>
      </div>
      <div className='flex justify-center items-start'>
        <h1 className='text-5xl font-bold text-primary-black mt-16'>
          Hello {name}!
        </h1>
      </div>
      <div className='flex justify-center items-start'>
        <h2 className='text-4xl font-bold text-primary-black mt-4'>
          Rating: {rating !== null ? parseFloat(rating).toFixed(1) : '0.0'}
        </h2>
      </div>

    </header>
  )
}

export default index