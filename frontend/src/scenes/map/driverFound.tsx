import { FoundDriver, HoldDestination, OnGoingTrip, Passenger } from '@/shared/types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  passenger: Passenger,
  foundDriver: FoundDriver,
  onGoingTrip: OnGoingTrip,
  setOnGoingTrip: (value: OnGoingTrip) => void
  showDriverPath: boolean,
  setShowDriverPath: (value: boolean) => void,
}

const DriverFound = ({passenger, foundDriver, onGoingTrip, setOnGoingTrip, showDriverPath, setShowDriverPath}: Props) => {
  const navigate = useNavigate();
  // const driver = {
  //   name: "Alex Smith",
  //   sex: "Male",
  //   carModel: "Toyota Prius",
  //   rating: "4.8",
  //   phone: "123-456-7890",
  // };

  // Confirm driver and navigate to map with driver details
  const handleConfirmDriver = () => {
    navigate('/map', { state: { showDriverPath: true, foundDriver } });
  };

  // Navigate to confirm ride for another search
  const handleLookForAnother = () => navigate('/confirmRide', { state: { lookingAgain: true } });

  // Cancel and navigate back to map
  const handleCancel = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/requests/cancel-ongoing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tripId: onGoingTrip.tripId,
        }), 
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      console.log('Request cancelled successfully.');
      navigate('/map');
      // Handle response or update UI as needed
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const confirmRequest = async () => {
    try {

      const response = await fetch('http://localhost:8000/api/v1/requests/confirm-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: passenger.id,
        }), 
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();

      console.log(data);
      // console.log(data.data.confirmed);
      setShowDriverPath(true);
      navigate('/map');

      
      // Handle response or update UI as needed
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center text-black">
      <div className="bg-white p-4 rounded w-full max-w-md text-center">
        <h3 className="text-lg font-bold mb-4">Driver Found</h3>
        <p><strong>Name:</strong> {foundDriver.name}</p>
        <p><strong>Rating:</strong> {foundDriver.rating}</p>
        <div className="flex justify-around mt-4">
          <button onClick={confirmRequest} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Confirm</button>
          {/* <button onClick={handleLookForAnother} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Look for Another</button> */}
          <button onClick={handleCancel} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DriverFound;
