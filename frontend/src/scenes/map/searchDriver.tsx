import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loadingGif from './search.gif';

const ConfirmRide = () => {
  const navigate = useNavigate();
  const [isLookingForDriver, setIsLookingForDriver] = useState(false);
  // Use a state to store the timeout ID for cancellation
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const startLookingForDriver = () => {
    setIsLookingForDriver(true);
    const id = window.setTimeout(() => { // Using window.setTimeout to ensure it uses the browser's setTimeout
      setIsLookingForDriver(false);
      navigate('/driverFound', { replace: true });
    }, 5000) as unknown as number; // Type assertion
    setTimeoutId(id);
  };

  const cancelSearch = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      setIsLookingForDriver(false);
      navigate('/map', { replace: true });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-md text-center">
        {isLookingForDriver ? (
          <>
            <h3 className="text-lg font-bold mb-4">Looking for a driver...</h3>
            <img src={loadingGif} alt="Searching..." style={{ maxWidth: '100px', display: 'block', margin: 'auto' }} />
            <button onClick={cancelSearch} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">Cancel Search</button>
          </>
        ) : (
          <>
            <h3 className="text-lg font-bold mb-4">Confirm Ride</h3>
            <p>Do you want to look for a driver in this location?</p>
            <div className="flex justify-end mt-4">
              <button onClick={() => navigate('/map', { replace: true })} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2">No</button>
              <button onClick={startLookingForDriver} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Yes</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmRide;
