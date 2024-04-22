import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loadingGif from './search.gif';
import { Passenger } from '@/shared/types';

type Props = {
  passenger: Passenger;
}

const ConfirmRide = ({  passenger }: Props) => {
  const navigate = useNavigate();
  const [isLookingForDriver, setIsLookingForDriver] = useState(false);
  // Use a state to store the timeout ID for cancellation
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [position, setPosition] = useState<[number, number] | null>(null);

  

  // const startLookingForDriver = () => {
  //   setIsLookingForDriver(true);
  //   // const id = window.setTimeout(() => { // Using window.setTimeout to ensure it uses the browser's setTimeout
  //   //   setIsLookingForDriver(false);
  //   //   navigate('/driverFound', { replace: true });
  //   // }, 5000) as unknown as number; // Type assertion
  //   // setTimeoutId(id);
  //   makeRequest();
  //   const intervalId = setInterval(() => {
  //     // makeRequest();
  //     console.log("Ping")
  //   }, 5000); // 5000 milliseconds = 5 seconds

  //   return () => {
  //     setIsLookingForDriver(false); // Optional: Update state to reflect not looking for driver
  //     clearInterval(intervalId); // Clear interval to stop further requests
  //   };
  // };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isLookingForDriver) {
      // Start interval only if looking for driver
      makeRequest(); // Initial request

      // Set interval to make request every 5 seconds
      intervalId = setInterval(() => {
        console.log("Ping");
        checkRequest();
        // makeRequest();
      }, 5000);
    }

    return () => {
      // Cleanup function
      clearInterval(intervalId); // Clear interval when component unmounts or isLookingForDriver is set to false
    };
  }, [isLookingForDriver]); // Run effect when isLookingForDriver changes


  const cancelSearch = () => {
    // if (timeoutId !== null) {
    //   clearTimeout(timeoutId);
    //   setIsLookingForDriver(false);
    //   navigate('/map', { replace: true });
    // }
    setIsLookingForDriver(false);
  };

  const startLookingForDriver = () => {
    setIsLookingForDriver(true);
  }

  useEffect(() => {
    // Function to get user's current position
    const getPosition = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (geoPosition) => {
            const lat = geoPosition.coords.latitude;
            const lon = geoPosition.coords.longitude;
            setPosition([lat, lon]);
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    getPosition(); // Call getPosition when component mounts

    // Cleanup function (optional)
    return () => {
      // Any cleanup code here, if needed
    };
  }, []); // Empty dependency array to run effect only once on mount


  const makeRequest = async () => {
    try {
      if (!position) {
        console.error('Position not available yet.');
        return;
      }

      const response = await fetch('http://localhost:8000/api/v1/requests/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: passenger.id,
          email: passenger.email,
          location: position,
          destination: "IESB"
        }), 
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      console.log('Request sent successfully.');
      // Handle response or update UI as needed
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const checkRequest = async () => {
    try {

      const response = await fetch('http://localhost:8000/api/v1/requests/request-update', {
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
      console.log(data.accepted);
      if (data.accepted)
        {
          setIsLookingForDriver(false);
        }
      // Handle response or update UI as needed
    } catch (error) {
      console.error('Error:', error);
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
