import React from 'react';
import { Link } from 'react-router-dom';
import placeholderData from "../CURR_DATA.json";
import { ChevronLeftIcon } from '@heroicons/react/24/solid'; 

// Define an interface for the JSON data
interface Slot {
  type: string;
  days: string;
  name: string;
  subject: string;
  course: string;
  section: string;
  location: string;
  startTime: string;
  endTime: string;
}


const ViewTimeSlot = () => {
  // Type assertion for placeholderData
  const data: Slot[] = placeholderData as Slot[];

  return (
    <>
      <div className="bg-gray-600 text-primary-black py-5 px-6 flex items-center justify-between fixed top-0 w-full z-10">
      <Link to="/schedule" className="mr-4">
        <ChevronLeftIcon className="h-6 w-6" />
      </Link>
      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-xl text-primary-black font-bold mr-10">Current Schedule</h1>
      </div>
    </div>
      <div className="flex flex-col items-center p-20">
        {data.length === 0 ? (
          <p className="text-red-500 text-2xl">The schedule is currently empty.</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {data.map((slot, index) => (
              <div key={index} className="max-w-xs w-full sm:w-64 rounded overflow-hidden shadow-lg bg-viewTimeSlots">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 text-primary-black">{slot.name}</div>
                  <p className= "text-base text-primary-black">
                    Type: {slot.type}<br />
                    Days: {slot.days}<br />
                    Location: {slot.location}<br />
                    Time: {slot.startTime}-{slot.endTime}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ViewTimeSlot;
