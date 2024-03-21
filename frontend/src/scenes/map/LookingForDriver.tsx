// LookingForDriver.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal'; // Adjust the import path as necessary

const LookingForDriver: React.FC = () => {
    const navigate = useNavigate();
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

    const handleCancelSearchConfirmed = () => {
        setIsCancelModalOpen(false);
        navigate('/map'); // Adjust this as necessary
    };

    return (
      <div className="flex flex-col items-center justify-center h-screen bg-light">
        <div className="p-5 text-center">
          <h1 className="mb-4 text-xl font-bold">Looking for a Driver...</h1>
          <p className="mb-6">Please wait, we are finding the best match for your ride.</p>
          <button 
            onClick={() => setIsCancelModalOpen(true)}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          >
            Cancel Search
          </button>
        </div>
        <Modal
          title="Cancel Ride Search"
          message="Are you sure you want to cancel looking for a driver?"
          confirmText="Yes, Cancel"
          cancelText="No, Keep Searching"
          onConfirm={handleCancelSearchConfirmed}
          onCancel={() => setIsCancelModalOpen(false)}
          isOpen={isCancelModalOpen}
        />
      </div>
    );
};

export default LookingForDriver;
