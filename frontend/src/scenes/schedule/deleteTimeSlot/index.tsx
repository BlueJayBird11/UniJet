import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import placeholderData from "../CURR_DATA.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ConfirmationModal from './confirmationModal';
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

const DeleteTimeSlot = () => {
  // Type assertion for placeholderData
  const data: Slot[] = placeholderData as Slot[];
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const handleDelete = (index: number) => {
    setDeleteIndex(index);
  };

  const handleCancelDelete = () => {
    setDeleteIndex(null);
  };

  const handleConfirmDelete = () => {
    if (deleteIndex !== null) {
      // Implement your delete logic here
      console.log(`Delete slot at index ${deleteIndex}`);
      setDeleteIndex(null); // Reset deleteIndex after deletion
    }
  };

  return (
    <>
      <div className="bg-primary-green-500 text-primary-black py-5 px-6 flex items-center justify-between fixed top-0 w-full z-10">
      <Link to="/schedule" className="mr-4">
        <ChevronLeftIcon className="h-6 w-6" />
      </Link>
      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-xl text-primary-black font-bold mr-10">Delete Time Slots</h1>
      </div>
    </div>
    <div className="flex flex-col items-center">
      <h1 className="mb-4 text-3xl font-bold">Delete Time Slot</h1>
      {data.length === 0 ? (
        <p className="text-red-500 text-2xl">The schedule is currently empty.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-4">
          {data.map((slot, index) => (
            <div key={index} className="relative max-w-xs w-full sm:w-64 rounded overflow-hidden shadow-lg bg-viewTimeSlots">
              {/* Delete button */}
              <div className="absolute top-0 right-0 m-2 bg-primary-blue rounded-full p-1">
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{slot.name}</div>
                <p className="text-primary-black text-base">
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

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteIndex !== null}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
    </>
  );
};

export default DeleteTimeSlot;
