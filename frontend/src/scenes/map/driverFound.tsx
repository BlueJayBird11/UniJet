import React from 'react';
import { useNavigate } from 'react-router-dom';

const DriverFound = () => {
  const navigate = useNavigate();
  const driver = {
    name: "Alex Smith",
    sex: "Male",
    carModel: "Toyota Prius",
    rating: "4.8",
    phone: "123-456-7890",
  };

  // Confirm driver and navigate to map with driver details
  const handleConfirmDriver = () => {
    navigate('/map', { state: { driverOnTheWay: true, driver } });
  };

  // Navigate to confirm ride for another search
  const handleLookForAnother = () => navigate('/confirmRide', { state: { lookingAgain: true } });

  // Cancel and navigate back to map
  const handleCancel = () => navigate('/map');

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-md text-center">
        <h3 className="text-lg font-bold mb-4">Driver Found</h3>
        <p><strong>Name:</strong> {driver.name}</p>
        <p><strong>Sex:</strong> {driver.sex}</p>
        <p><strong>Car Model:</strong> {driver.carModel}</p>
        <p><strong>Rating:</strong> {driver.rating}</p>
        <div className="flex justify-around mt-4">
          <button onClick={handleConfirmDriver} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Confirm</button>
          <button onClick={handleLookForAnother} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Look for Another</button>
          <button onClick={handleCancel} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DriverFound;
