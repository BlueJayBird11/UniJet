import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet';
import "leaflet/dist/leaflet.css";
declare let L;
import { useNavigate, useLocation } from 'react-router-dom';
import loadingGif from './car.gif';
import { HoldDestination, OnGoingTrip, Passenger, RiderType } from '@/shared/types';
import SearchBar from './SearchBar';
import RouteToUser from './RouteToUser';
// import * as dotenv from "dotenv";
// dotenv.config();

interface Props {
  passenger: Passenger;
  driverId: number;
  holdDestination: HoldDestination;
  setHoldDestination: (value: HoldDestination) => void;
  onGoingTrip: OnGoingTrip;
  setOnGoingTrip: (value: OnGoingTrip) => void;
}

const ReachedDestinationModal = ({ driver, onRate }) => {
  const [driverRating, setDriverRating] = useState(0);

  const renderRatingStars = () => {
    return [...Array(5)].map((_, i) => (
      <span key={i} style={{cursor: 'pointer', color: i < driverRating ? '#FFD700' : '#ccc', fontSize: '30px', textAlign:'center'}}onClick={() => setDriverRating(i + 1)}>
        ★
      </span>
    ));
  };

  return (
    <div style={{position: 'absolute',top: '45%',left: '50%',transform: 'translate(-50%, -50%)',backgroundColor: 'rgba(0, 0, 0, 0.85)',color: 'white',padding: '20px',borderRadius: '8px',zIndex: 10100,maxWidth: '400px',textAlign: 'left',}}>
      <p style={{ fontSize:'lg',fontWeight:'bold', backgroundColor:'green', padding:'1px'}}>You have reached your destination !!</p>
      <p><strong>Name:</strong> {driver.name}</p>
      <p><strong>Car Model:</strong> {driver.carModel}</p>
      <p><strong>Phone:</strong> {driver.phone}</p>
      <p style={{ fontWeight: 'bold', marginBottom: '1em' }}>Rate the driver:</p>
      <div>{renderRatingStars()}</div>
      <button onClick={() => onRate(driverRating)} style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '5px', backgroundColor: 'green', color: 'white', cursor: 'pointer' }}>
        Submit Rating
      </button>
    </div>
  );
};

const carIcon = L.icon({
  iconUrl: '@/assets/car.png', 
  iconSize: [32, 32], 
});

const destinationIcon = L.icon({
  iconUrl: '@/assets/destination.png', 
  iconSize: [32, 32], 
});
    
const Map: React.FC<Props> = ({  passenger, driverId, holdDestination, setHoldDestination, onGoingTrip, setOnGoingTrip }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [routeToDestination, setRouteToDestination] = useState<[number, number][] | null>(null);
  const [routeToUser, setRouteToUser] = useState<[number, number][] | null>(null);
  const placeholderLocation: [number, number] = [32.541251162684404, -92.63578950465626]; 
  const driverLocation: [number, number] = [32.52424701643656, -92.67001400107138]; 
  const mapboxAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  // const riders: Array<RiderType> = [
  //   {
  //     name: "Ash",
  //     rating: 5.0,
  //     payMin: 9,
  //     payMax: 11,
  //     position: [32.541251162684404, -92.63578950465626],
  //     destination: "Chase Bank"
  //   }
  // ]
  const [riders, setRiders] = useState<RiderType[]>([]); // State to hold list of riders
  // http://localhost:8000/api/v1/requests
  const getRequests = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/requests`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Success:');
      console.log(data);
      console.log(data.data.passengers);
      setRiders(data.data.passengers);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const makeRequest = async(userPosition: [number, number]) => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/requests/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: passenger.id,
          email: passenger.email,
          location: userPosition,
          destination: "IESB"
        }), 
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const acceptRequest = async (pId: number, pName: string, pLocation: [number, number], pDestination:string, pDestinationChoords:[number,number]) => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/requests/accept-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          passengerId: pId,
          driverId: driverId,
          passengerName: pName,
          driverName: passenger.firstName +" "+ passenger.lastName,
          passengerLocation: pLocation,
          driverLocation: position,
          destination: pDestination,
          destinationChoords: pDestinationChoords
        }), 
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      console.log(data);
      setOnGoingTrip({
        tripId: data.data.request.tripId,
        passengerId: passenger.id,
        driverId: data.data.request.driverId,
        passengerName: data.data.request.passengerName,
        driverName: data.data.request.driverName,
        passengerStartLocation: data.data.request.passengerStartLocation,
        passengerLocation: data.data.request.passengerLocation,
        driverLocation: data.data.request.driverLocation,
        destination: data.data.request.destination,
        destinationChoords: data.data.request.destinationChoords,
        startTime: data.data.request.startTime,
        rideDate: data.data.request.rideDate,
        confirmed: false
      })
      var ridersCopy:RiderType[] = riders;
      console.log(ridersCopy);
      for (let i = 0; i < ridersCopy.length; i++) {
        if (ridersCopy[i].id === pId)
          {
            ridersCopy.splice(i,1);
          }
      }
      console.log(ridersCopy);
      setRiders(ridersCopy);
      setShowAcceptedDriverModal(true);
      // Handle response or update UI as needed
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const checkRequest = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/requests/update-request-driver', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tripId: onGoingTrip.tripId,
          location: position
        }), 
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      console.log(data);
      if (data.data.request.confirmed)
        {
          setShowAcceptedDriverModal(false);
          console.log(onGoingTrip.passengerLocation);
          console.log(onGoingTrip.driverLocation);
          console.log(onGoingTrip.destinationChoords);

          fetchRoute(onGoingTrip.passengerLocation[0], onGoingTrip.passengerLocation[1], onGoingTrip.destinationChoords[1], onGoingTrip.destinationChoords[0], setRouteToDestination);
          fetchRoute(onGoingTrip.driverLocation[0], onGoingTrip.driverLocation[1], onGoingTrip.passengerLocation[0], onGoingTrip.passengerLocation[1], setRouteToUser);
          // show routes
        }
      // Handle response or update UI as needed
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
 const location = useLocation();
 const navigate = useNavigate();
 const [showDriverOnTheWay, setShowDriverOnTheWay] = useState(false);
 const [showDriverArrivedModal, setShowDriverArrivedModal] = useState(false);
 const [isCopied, setIsCopied] = useState(false);
 const isMounted = useRef(true);
 const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };
 const [showEnrouteModal, setShowEnrouteModal] = useState(false);
 const [showRateDriverModal, setShowRateDriverModal] = useState(false);
 const [showAcceptedDriverModal, setShowAcceptedDriverModal] = useState(false);



//  useEffect(() => {
//   isMounted.current = true;
//   const watchId = navigator.geolocation.watchPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setPosition([latitude, longitude]);
//         fetchRoute(latitude, longitude, placeholderLocation[0], placeholderLocation[1], setRouteToDestination);
//         fetchRoute(driverLocation[0], driverLocation[1], latitude, longitude, setRouteToUser); // Fetch reverse route
//       },
//       (error) => console.error('Error watching position:', error),
//       { enableHighAccuracy: true, maximumAge: 0 }
//     );

//     if (location.state?.driverOnTheWay) {
//       setShowDriverOnTheWay(true);

//       // Instead of directly modifying state after a timeout, check if component is still mounted
//       const timeoutId = setTimeout(() => {
//         if (isMounted.current) {
//           setShowDriverOnTheWay(false);
//           setShowDriverArrivedModal(true);
//         }
//       }, 10000);

//       return () => {
//         clearTimeout(timeoutId);
//         isMounted.current = false;
//       };
//     }
  
//     return () => {navigator.geolocation.clearWatch(watchId);isMounted.current = false;};
//   }, [location.state]);

useEffect(() => {
  isMounted.current = true;
  const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPosition([latitude, longitude]);
        // fetchRoute(onGoingTrip.passengerLocation[0], onGoingTrip.passengerLocation[1], onGoingTrip.destinationChoords[0], onGoingTrip.destinationChoords[1], setRouteToDestination);
        // fetchRoute(onGoingTrip.driverLocation[0], onGoingTrip.driverLocation[1], onGoingTrip.passengerLocation[0], onGoingTrip.passengerLocation[1], setRouteToUser); // Fetch reverse route
      },
      (error) => console.error('Error watching position:', error),
      { enableHighAccuracy: true, maximumAge: 0 }
    );

    if (location.state?.driverOnTheWay) {
      setShowDriverOnTheWay(true);

      // Instead of directly modifying state after a timeout, check if component is still mounted
      const timeoutId = setTimeout(() => {
        if (isMounted.current) {
          setShowDriverOnTheWay(false);
          setShowDriverArrivedModal(true);
        }
      }, 10000);

      return () => {
        clearTimeout(timeoutId);
        isMounted.current = false;
      };
    }
  
    return () => {navigator.geolocation.clearWatch(watchId);isMounted.current = false;};
  }, [location.state]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (showAcceptedDriverModal) {
      // Start interval only if looking for driver
      // makeRequest(); // Initial request

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
  }, [showAcceptedDriverModal]); // Run effect when isLookingForDriver changes

//   return () => {navigator.geolocation.clearWatch(watchId);isMounted.current = false;};
// }, [location.state]);

  const handleCancelRide = () => {
    if (isMounted.current) {
      setShowDriverOnTheWay(false);
      navigate('/map');
    }
  };

const handleConfirmRide = () => {
  setShowDriverArrivedModal(false);
  setShowEnrouteModal(true);
  setTimeout(() => {
    setShowEnrouteModal(false);
    setShowRateDriverModal(true); // This will display the reached destination modal
  }, 10000); // After enroute, show rate driver modal
};

const handleRateDriver = (rating) => {
  // Here you would handle the rating logic
  setShowRateDriverModal(false);
  console.log(`Driver rated with: ${rating}`);
  // You might want to navigate away or update some state here
};

const handleCancelRideFromArrivedModal = () => {
  setShowDriverArrivedModal(false);
  navigate('/map'); // Navigate back to the map or to a different screen as needed
};
    
  const fetchRoute = async (startLat: number, startLng: number, endLat: number, endLng: number, setRoute: React.Dispatch<React.SetStateAction<[number, number][] | null>>) => {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${startLng},${startLat};${endLng},${endLat}?geometries=geojson&access_token=${mapboxAccessToken}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const routeCoordinates = data.routes[0].geometry.coordinates;
      setRoute(routeCoordinates.map(([lng, lat]) => [lat, lng])); // Convert to Leaflet's format
    } catch (error) {
      console.error('Failed to fetch route:', error);
    }
  };

  if (!position) {
    return <div>Loading...</div>;
  }
  const ResetViewButton = () => {
    const map = useMap();
    const resetView = () => {
      if (position) {
        map.flyTo(position, 16);
      }
    };

    return (
      <button
        onClick={resetView}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute top-3 left-14 z-10"
        style={{ zIndex: 9999 }}
      >
        Reset View
      </button>
    );
  };



  

  return (
    //relative
    <div className="flex flex-col h-screen"> 
      <MapContainer style={{ width: '100%', height: '90.5%' }} center={position} zoom={13} scrollWheelZoom={true} className="relative">


 {/* // return (
 //   <div className="h-screen relative">
 //     <MapContainer style={{ width: '100%', height: '90.5%' }} center={position} zoom={13} scrollWheelZoom={true}> */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`}
        />
        <SearchBar holdDestination={holdDestination} setHoldDestination={setHoldDestination} />
        {/* White outline marker */}
        <CircleMarker center={position} radius={6} color="white" fillColor="white" fillOpacity={1} />

        {/* Blue center marker */}
        <CircleMarker center={position} radius={5} fillColor="blue" fillOpacity={1}>
          <Popup>You are here</Popup>
        </CircleMarker>

        {/* Placeholder location marker with destination icon */}
        <Marker position={placeholderLocation} icon={destinationIcon}>
          <Popup>Destination Location</Popup>
        </Marker>

        {/* Driver location marker with car icon */}
        <Marker position={driverLocation} icon={carIcon}>
          <Popup>Driver Location</Popup>
        </Marker>

        {routeToDestination && <Polyline positions={routeToDestination} weight={10} opacity={0.3} color="blue" />}
        {routeToUser && <Polyline positions={routeToUser} weight={10} opacity={0.3} color="red" />}
        {/* {routeToUser && (
           <Polyline positions={routeToUser} weight={10} opacity={0.3} color="blue" />
        )} */}
        <ResetViewButton />
        {/* <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker> */}
        {riders.map((rider: RiderType) => (
          <Marker key={rider.id} position={rider.position}>
            <Popup className='items-center justify-center'>
              <p>Name: {rider.name}</p> 
              <p>Rating: {rider.rating !== null ? rider.rating : '5.0'}</p> 
              <p>Destination: {rider.destination}</p>
              <button onClick={() => acceptRequest(rider.id, rider.name, rider.position, rider.destination, rider.destinationChoords)} className='bg-blue-700 rounded-full p-2 text-white'>Accept</button>
            </Popup>
          </Marker>
        ))}
        {/* {routeToDestination && <Polyline positions={routeToDestination} color="blue" />}
        {routeToUser && <Polyline positions={routeToUser} color="red" />} */}
      </MapContainer>


      {showDriverOnTheWay && (
        <div style={{position: 'absolute',top: '40%',left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(0, 0, 0, 0.75)',color: 'white',padding: '20px', borderRadius: '8px', zIndex: 10000, maxWidth: '400px', textAlign: 'center',}}>
          <p>Driver is on the way!</p>
          <p><strong>Name:</strong> {location.state.driver.name}</p>
          <p><strong>Sex:</strong> {location.state.driver.sex}</p>
          <p><strong>Car Model:</strong> {location.state.driver.carModel}</p>
          <p><strong>Rating:</strong> {location.state.driver.rating}</p>
          <p><strong>Phone:</strong> <span onClick={() => copyToClipboard(location.state.driver.phone)} style={{ cursor: 'pointer',fontWeight:'bold', textDecoration: 'underline' }}>{location.state.driver.phone}</span></p>
          <button onClick={handleCancelRide} style={{
            backgroundColor: 'rgb(220, 0, 0)', 
            color: 'white', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: '5px', 
            marginTop: '15px', 
            cursor: 'pointer'
          }}>
            Cancel Ride
          </button>
        </div>
      )}

      {isCopied && (<div style={{position: 'absolute',bottom: '20%',left: '50%',transform: 'translateX(-50%)',backgroundColor: 'white',color: 'black',fontWeight:'bold' , padding: '8px 16px',borderRadius: '4px',zIndex: 10100,}}>Copied to clipboard!</div>)}

      {showDriverArrivedModal && (
        <div style={{position: 'absolute',top: '50%',left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(0, 0, 0, 0.75)',color: 'white',padding: '20px', borderRadius: '8px', zIndex: 10000, maxWidth: '400px', textAlign: 'left',}}>
          <p style={{fontSize:'lg',fontWeight:'bold', backgroundColor:'green', padding:'2px'}}>Your driver is here!</p>
          <p><strong>Name:</strong> {location.state.driver.name}</p>
          <p><strong>Sex:</strong> {location.state.driver.sex}</p>
          <p><strong>Car Model:</strong> {location.state.driver.carModel}</p>
          <p><strong>Rating:</strong> {location.state.driver.rating}</p>
          <p><strong>Phone:</strong> <span onClick={() => copyToClipboard(location.state.driver.phone)} style={{ cursor: 'pointer', fontWeight:'bold', textDecoration: 'underline' }}>{location.state.driver.phone}</span></p>
          <p style={{fontSize:'lg', fontWeight:'bold',backgroundColor:'yellow', padding:'2px', color:'black'}}>Confirm to start ride.</p>
          <button onClick={handleConfirmRide} style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', marginRight: '5px', width: '100%',  }}>Confirm</button>
          <button onClick={handleCancelRideFromArrivedModal} style={{ backgroundColor: 'rgb(220, 0, 0)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', marginRight: '5px', width: '100%' }}>Cancel Ride</button>
        </div>
      )}


      {showEnrouteModal && (
        <div style={{
          position: 'absolute',top: '20%',left: '50%',transform: 'translate(-50%, -50%)',backgroundColor: 'rgba(0, 0, 0, 0.85)',color: 'white',padding: '20px',borderRadius: '8px',zIndex: 10100,display: 'flex',alignItems: 'center',justifyContent: 'center',}}>
          <p style={{ margin: 0, marginRight: '10px', fontWeight:'bold' }}>Enroute...</p>
          <img src={loadingGif} alt="Enroute..." style={{ height: '50px' }} />
        </div>
      )}

      {showAcceptedDriverModal && (
        <div style={{
          position: 'absolute',top: '20%',left: '50%',transform: 'translate(-50%, -50%)',backgroundColor: 'rgba(0, 0, 0, 0.85)',color: 'white',padding: '20px',borderRadius: '8px',zIndex: 10100,display: 'flex',alignItems: 'center',justifyContent: 'center',}}>
          <p style={{ margin: 0, marginRight: '10px', fontWeight:'bold' }}>Waiting for comfirmation...</p>
        </div>
      )}

      {showRateDriverModal && (
        <ReachedDestinationModal driver={location.state.driver} onRate={handleRateDriver} />
      )}


      {/* Dev Button */}
      <button
        style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000, backgroundColor: 'red', color:'white', padding:'10px' }}
        onClick={() => navigate('/confirmRide')}>
        Dev
      </button>
      {/* <button onClick={getRequests} className='bg-blue-700 p-2 absolute z-[400] rounded-full right-10 bottom-28 text-white hover:bg-blue-300'>Find Rider's</button> */}
      {driverId !== 0 && (  
        <button
          onClick={getRequests}
          className='bg-blue-700 p-2 absolute z-[400] rounded-full right-4 bottom-32 text-white hover:bg-blue-300'
        >
          Find Passenger
        </button>
      )}
      {driverId === 0 && (  
        <button onClick={() => makeRequest(position)} className='bg-blue-700 p-2 absolute z-[400] rounded-full right-4 bottom-32 text-white hover:bg-blue-300'>
          Request Driver
        </button>
      )}
    </div>
  );
};

export default Map;

