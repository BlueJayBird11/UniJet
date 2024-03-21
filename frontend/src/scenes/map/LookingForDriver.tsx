// LookingForDriver.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LookingForDriver: React.FC = () => {
    const navigate = useNavigate();

    // Cancel search handler
    const handleCancelSearch = () => {
        const isConfirmed = window.confirm('Are you sure you want to cancel looking for a driver?');
        if (isConfirmed) {
            navigate('/'); // Assuming '/' is your Map route. Adjust if necessary.
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-xl font-semibold">Looking for a Driver...</h2>
            <button 
                onClick={handleCancelSearch}
                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
                Cancel
            </button>
        </div>
    );
};

export default LookingForDriver;
