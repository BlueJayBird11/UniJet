import React from 'react';
import { Link } from 'react-router-dom';
import placeholderData from "../CURR_DATA.json";

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
    <div className="flex flex-col items-center">
      <h1 className="mb-4 text-3xl font-bold">Current Schedule</h1>
      {data.length === 0 ? (
        <p className="text-red-500 text-2xl">The schedule is currently empty.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-4">
          {data.map((slot, index) => (
            <div key={index} className="max-w-xs w-full sm:w-64 rounded overflow-hidden shadow-lg bg-viewTimeSlots">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{slot.name}</div>
                <p className="text-slate-300 text-base">
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
      <Link to="/schedule" className="mt-4 text-blue-500 hover:text-blue-700">Back to Schedule</Link>
    </div>
  );
};

export default ViewTimeSlot;
