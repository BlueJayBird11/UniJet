/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet';
import "leaflet/dist/leaflet.css";
declare let L;
import { useNavigate, useLocation } from 'react-router-dom';
import loadingGif from './car.gif';
import { HoldDestination, OnGoingTrip, Passenger, RiderType } from '@/shared/types';
import SearchBar from './SearchBar';
import ScheduleModal from './ScheduleModal';


interface Props {
  passenger: Passenger;
  driverId: number;
  holdDestination: HoldDestination;
  setHoldDestination: (value: HoldDestination) => void;
  onGoingTrip: OnGoingTrip;
  setOnGoingTrip: (value: OnGoingTrip) => void;
  showActiveRide: boolean;
  setShowActiveRide: (value: boolean) => void;
  showDriverPath: boolean;
  setShowDriverPath: (value: boolean) => void;
  position: [number, number];
  setPosition: (value: [number, number]) => void;
}

const ReachedDestinationModal = ({ id, onRate, pOrD }) => {
  const [driverRating, setDriverRating] = useState(5);

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
      {/* <p><strong>Name:</strong> {driver.name}</p>
      <p><strong>Car Model:</strong> {driver.carModel}</p>
      <p><strong>Phone:</strong> {driver.phone}</p> */}
      <p style={{ fontWeight: 'bold', marginBottom: '1em' }}>Rate the {pOrD}:</p>
      <div>{renderRatingStars()}</div>
      <button onClick={() => onRate(driverRating)} style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '5px', backgroundColor: 'green', color: 'white', cursor: 'pointer' }}>
        Submit Rating
      </button>
    </div>
  );
};

/*const carIcon = L.icon({
  iconUrl: '@/assets/car.png', 
  iconSize: [32, 32], 
});

const destinationIcon = L.icon({
  iconUrl: '@/assets/destination.png', 
  iconSize: [32, 32], 
});*/
    
const Map: React.FC<Props> = ({  passenger, driverId, holdDestination, setHoldDestination, onGoingTrip, setOnGoingTrip, showActiveRide, setShowActiveRide, showDriverPath, setShowDriverPath, position, setPosition }) => {
  const [routeToDestination, setRouteToDestination] = useState<[number, number][] | null>(null);
  const [routeToUser, setRouteToUser] = useState<[number, number][] | null>(null);
  const placeholderLocation: [number, number] = [32.541251162684404, -92.63578950465626]; 
  const driverLocation: [number, number] = [32.52424701643656, -92.67001400107138]; 
  const mapboxAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  const [mapHeight, setMapHeight] = useState('100vh');
  const [tempDriverId, setTempDriverId] = useState(0);
  const [tempPassengerId, setTempPassengerId] = useState(0);
  const [riders, setRiders] = useState<RiderType[]>([]); // State to hold list of riders

  const SetZoomControlPosition = () => {
    const map = useMap();
    useEffect(() => {
      map.zoomControl.setPosition('bottomleft');
    }, []);
    return null;
  };

  // Custom CSS style for adjusting zoom control position
  const zoomControlStyle = {
    bottom: '7rem', // Adjust this value as needed
    left: '0.8rem',
    position: "absolute"
  };

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
        passengerId: data.data.request.passengerId,
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
        confirmed: false,
        cancelled: false,
        pPhone: data.data.request.pPhone,
        dPhone: data.data.request.dPhone
      })
      // var ridersCopy:RiderType[] = riders;
      // console.log(ridersCopy);
      // for (let i = 0; i < ridersCopy.length; i++) {
      //   if (ridersCopy[i].id === pId)
      //     {
      //       ridersCopy.splice(i,1);
      //     }
      // }
      // console.log(ridersCopy);
      // setRiders(ridersCopy);
      setRiders([]);
      setShowAcceptedDriverModal(true);
      // Handle response or update UI as needed
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
      if (data.data.request == null)
        {
          setShowAcceptedDriverModal(false);
          console.log("Passenger Cancelled Request");
        }
      else if (data.data.request.confirmed)
        {
          setShowAcceptedDriverModal(false);
          setShowActiveRide(true);
          setOnGoingTrip(data.data.request);
          
          // console.log(onGoingTrip.passengerLocation);
          // console.log(onGoingTrip.driverLocation);
          // console.log(onGoingTrip.destinationChoords);

          // fetchRoute(onGoingTrip.passengerLocation[0], onGoingTrip.passengerLocation[1], onGoingTrip.destinationChoords[1], onGoingTrip.destinationChoords[0], setRouteToDestination);
          // fetchRoute(onGoingTrip.driverLocation[0], onGoingTrip.driverLocation[1], onGoingTrip.passengerLocation[0], onGoingTrip.passengerLocation[1], setRouteToUser);
          setShowActiveRide(true);
          // show routes
        }
      // Handle response or update UI as needed
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updatePassenger = async () => {
    try {
      // getPosition(); // Call getPosition when component mounts
      if (!position) {
        console.error('Position not available yet.');
        return;
      }
      console.log("Passenger position:")
      console.log(position);
      const response = await fetch('http://localhost:8000/api/v1/requests/update-request-passenger', {
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
      if (data.data.request == null) {
        setShowDriverPath(false);
        // setTempDriverId(onGoingTrip)
        setOnGoingTrip({
          tripId: 0,
          passengerId: 0,
          driverId: 0,
          passengerName: "",
          driverName: "",
          passengerStartLocation: [0,0],
          passengerLocation: [0,0],
          driverLocation: [0,0],
          destination: "",
          destinationChoords: [0,0],
          startTime: "",
          rideDate: "",
          confirmed: false,
          cancelled: false,
          pPhone: "",
          dPhone: ""
        });
        setShowRateDriverModal(true);
      }
      else if (data.data.request.confirmed)
        {
          setTempDriverId(onGoingTrip.driverId);
          console.log("Passenger request:");
          console.log(data.data.request);
          setOnGoingTrip({
            tripId: data.data.request.tripId,
            passengerId: data.data.request.passengerId,
            driverId: data.data.request.driverId,
            passengerName: data.data.request.passengerName,
            driverName: data.data.request.driverName,
            passengerStartLocation: data.data.requestpassengerStartLocation,
            passengerLocation: position,
            driverLocation: data.data.request.driverLocation,
            destination: data.data.request.destination,
            destinationChoords: data.data.request.destinationChoords,
            startTime: data.data.request.startTime,
            rideDate: data.data.request.rideDate,
            confirmed: data.data.request.confirmed,
            cancelled: data.data.request.cancelled,
            pPhone: data.data.request.pPhone,
            dPhone: data.data.request.dPhone
          });
        }
      // Handle response or update UI as needed
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const finishRide = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/requests/end-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tripId: onGoingTrip.tripId,
          startTime: onGoingTrip.startTime,
          startLocation: onGoingTrip.passengerStartLocation,
          endLocation: position,
          earnings: 100,
          passengerId: onGoingTrip.passengerId,
          driverId: onGoingTrip.driverId
        }), 
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setShowActiveRide(false);

      console.log(data);
      setOnGoingTrip({
        tripId: 0,
        passengerId: 0,
        driverId: 0,
        passengerName: "",
        driverName: "",
        passengerStartLocation: [0,0],
        passengerLocation: [0,0],
        driverLocation: [0,0],
        destination: "",
        destinationChoords: [0,0],
        startTime: "",
        rideDate: "",
        confirmed: false,
        cancelled: false,
        pPhone: "",
        dPhone: ""
      });
      setShowRatePassengerModal(true);

      // Handle response or update UI as needed
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateDriver = async () => {
    try {
      
      if (!position) {
        console.error('Position not available yet.');
        return;
      }

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
      if (tempDriverId == 0) {
        setTempDriverId(onGoingTrip.driverId);
      }
      console.log(data);
      if (data.data.request == null) {
        setShowActiveRide(false);
        setOnGoingTrip({
          tripId: 0,
          passengerId: 0,
          driverId: 0,
          passengerName: "",
          driverName: "",
          passengerStartLocation: [0,0],
          passengerLocation: [0,0],
          driverLocation: [0,0],
          destination: "",
          destinationChoords: [0,0],
          startTime: "",
          rideDate: "",
          confirmed: false,
          cancelled: false,
          pPhone: "",
          dPhone: ""
        });
      }
      else if (data.data.request.confirmed)
        {
          setTempPassengerId(onGoingTrip.passengerId);
          // setOnGoingTrip(data.data.request);
          setOnGoingTrip({
            tripId: data.data.request.tripId,
            passengerId: data.data.request.passengerId,
            driverId: data.data.request.driverId,
            passengerName: data.data.request.passengerName,
            driverName: data.data.request.driverName,
            passengerStartLocation: data.data.requestpassengerStartLocation,
            passengerLocation: data.data.request.passengerLocation,
            driverLocation: position,
            destination: data.data.request.destination,
            destinationChoords: data.data.request.destinationChoords,
            startTime: data.data.request.startTime,
            rideDate: data.data.request.rideDate,
            confirmed: data.data.request.confirmed,
            cancelled: data.data.request.cancelled,
            pPhone: data.data.request.pPhone,
            dPhone: data.data.request.dPhone
          });
          console.log(onGoingTrip.passengerLocation);
          console.log(onGoingTrip.driverLocation);
          console.log(onGoingTrip.destinationChoords);

          // fetchRoute(onGoingTrip.passengerLocation[0], onGoingTrip.passengerLocation[1], onGoingTrip.destinationChoords[1], onGoingTrip.destinationChoords[0], setRouteToDestination);
          // fetchRoute(onGoingTrip.driverLocation[0], onGoingTrip.driverLocation[1], onGoingTrip.passengerLocation[0], onGoingTrip.passengerLocation[1], setRouteToUser);
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
 const [showRatePassengerModal, setShowRatePassengerModal] = useState(false);
 const [showAcceptedDriverModal, setShowAcceptedDriverModal] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (showAcceptedDriverModal) {
      // Start interval only if looking for driver
      // makeRequest(); // Initial request

      // Set interval to make request every 5 seconds
      intervalId = setInterval(() => {
        console.log("Ping - checkRequest");
        checkRequest();
        // makeRequest();
      }, 1000);
    }

    return () => {
      // Cleanup function
      clearInterval(intervalId); // Clear interval when component unmounts or isLookingForDriver is set to false
    };
  }, [showAcceptedDriverModal]); // Run effect when isLookingForDriver changes

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    console.log("showDriverPath: " + showDriverPath);
    if (showDriverPath) {
      // Start interval only if looking for driver
      // makeRequest(); // Initial request

      // Set interval to make request every 5 seconds
      intervalId = setInterval(() => {
        console.log("Ping - updatePassenger");
        updatePassenger();
        // makeRequest();
      }, 3000);
    }

    return () => {
      // Cleanup function
      clearInterval(intervalId); // Clear interval when component unmounts or isLookingForDriver is set to false
    };
  }, [showDriverPath]); // Run effect when isLookingForDriver changes

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    console.log("showAcceptedDriverModal: " + showAcceptedDriverModal);
    if (showActiveRide) {
      // Start interval only if looking for driver
      // makeRequest(); // Initial request

      // Set interval to make request every 5 seconds
      console.log(showActiveRide);
      intervalId = setInterval(() => {
        console.log("Ping - updateDriver");
        updateDriver();
        // makeRequest();
      }, 3000);
    }

    return () => {
      // Cleanup function
      clearInterval(intervalId); // Clear interval when component unmounts or isLookingForDriver is set to false
    };
  }, [showActiveRide]); // Run effect when isLookingForDriver changes

  useEffect(() => {
    const fetchRoutes = () => {
      setTimeout(() => {
        if (onGoingTrip.tripId !== 0 && onGoingTrip.confirmed)
          {
            console.log("WORKS");
            fetchRoute(onGoingTrip.passengerLocation[0], onGoingTrip.passengerLocation[1], onGoingTrip.destinationChoords[1], onGoingTrip.destinationChoords[0], setRouteToDestination);
            fetchRoute(onGoingTrip.driverLocation[0], onGoingTrip.driverLocation[1], onGoingTrip.passengerLocation[0], onGoingTrip.passengerLocation[1], setRouteToUser);
          }
      }, 3000);
    };

    // Set interval to fetch routes every 3 seconds
    const intervalId = setInterval(fetchRoutes, 3000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [onGoingTrip.tripId !== 0]); // Empty dependency array to run effect only once on mount

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

const handleRateDriver = async (rating: number) => {
  // Here you would handle the rating logic
  console.log(`Driver rated with: ${rating}`);

  try {
    const response = await fetch(`http://localhost:8000/api/v1/requests/rate-driver`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: tempDriverId, rating: rating  }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    
    setShowRateDriverModal(false);

  } catch (error: any) {
    console.error('Error:', error);
  }
};

const handleRatePassenger = async (rating) => {
  // Here you would handle the rating logic
  console.log(`Driver rated with: ${rating}`);

  try {
    const response = await fetch(`http://localhost:8000/api/v1/requests/rate-passenger`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: tempPassengerId, rating: rating  }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    
    setShowRatePassengerModal(false);

  } catch (error: any) {
    console.error('Error:', error);
  }
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

  useEffect(() => {
    // Function to update the map height
    function updateMapHeight() {
      const navbar = document.getElementById('navbar');
      if (navbar) {
        const navbarHeight = navbar.offsetHeight;
        setMapHeight(`calc(100vh - ${navbarHeight}px)`);
      }
    }

    // Set the map height on mount
    updateMapHeight();

    // Update map height on window resize
    window.addEventListener('resize', updateMapHeight);

    // Clean up event listener
    return () => {
      window.removeEventListener('resize', updateMapHeight);
    };
  }, []);

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
        className="bg-gray-600 hover:bg-gray-550 text-white font-bold py-2 px-4 rounded left-14 z-10 bottom-3 absolute"
        style={{ zIndex: 9999 }}
      >
        Reset View
      </button>
    );
  };

  const carIcon = L.icon({
    iconUrl: './src/assets/car.png',
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 16], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -16] // Point from which the popup should open relative to the iconAnchor
  });
  
  const destinationIcon = L.icon({
    iconUrl: './src/assets/destination.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  return (

    <div className="h-screen relative">
      <MapContainer style={{ width: '100%', height: "88.5%" }} center={position} zoom={13} scrollWheelZoom={true} className="relative z-0">
        <SetZoomControlPosition />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`}
        />
        {onGoingTrip.tripId === 0 && (
          <SearchBar holdDestination={holdDestination} setHoldDestination={setHoldDestination} />
        )}
        {/* White outline marker */}
        <CircleMarker center={position} radius={6} color="white" fillColor="white" fillOpacity={1} />

        {/* Blue center marker */}
        <CircleMarker center={position} radius={5} fillColor="blue" fillOpacity={1}>
          <Popup>You are here</Popup>
        </CircleMarker>

        {onGoingTrip.tripId !== 0 && (
          <Marker position={[onGoingTrip.destinationChoords[1], onGoingTrip.destinationChoords[0]]} icon={destinationIcon}>
            <Popup>Destination Location</Popup>
          </Marker>
        )}
        
        {onGoingTrip.tripId !== 0 && (
          <Marker position={onGoingTrip.driverLocation} icon={carIcon}>
            <Popup>Driver Location</Popup>
          </Marker>
        )}

        

        {onGoingTrip.tripId != 0 && routeToDestination && <Polyline positions={routeToDestination} weight={10} opacity={0.3} color="blue" />}
        {onGoingTrip.tripId != 0 && routeToUser && <Polyline positions={routeToUser} weight={10} opacity={0.3} color="red" />}
        <ResetViewButton />
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
        {onGoingTrip.tripId === 0 && (
          <ScheduleModal setHoldDestination={setHoldDestination}/>
        )}

      </MapContainer>


      {showDriverOnTheWay && (
        <div style={{position: 'absolute',top: '40%',left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(0, 0, 0, 0.75)',color: 'white',padding: '20px', borderRadius: '8px', zIndex: 10000, maxWidth: '400px', textAlign: 'center',}}>
          <p>Driver is on the way!</p>
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
        <div style={{position: 'absolute',top: '20%',left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(0, 0, 0, 0.75)',color: 'white',padding: '20px', borderRadius: '8px', zIndex: 10000, maxWidth: '400px', textAlign: 'left',}}>
          <p style={{fontSize:'lg',fontWeight:'bold', backgroundColor:'green', padding:'2px'}}>Your driver is here!</p>
          <p style={{fontSize:'lg', fontWeight:'bold',backgroundColor:'yellow', padding:'2px', color:'black'}}>Confirm to start ride.</p>
          <button onClick={handleConfirmRide} style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', marginRight: '5px', width: '100%',  }}>Confirm</button>
          <button onClick={handleCancelRideFromArrivedModal} style={{ backgroundColor: 'rgb(220, 0, 0)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', marginRight: '5px', width: '100%' }}>Cancel Ride</button>
        </div>
      )}


      {showDriverPath && (
        <div className='pt-6 pb-20 px-8' style={{
          position: 'absolute',
          top: '12%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          color: 'white',
          borderRadius: '8px',
          zIndex: 10100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p className='mr-2'>Enroute...</p>
            <img src={loadingGif} alt="Enroute..." style={{ height: '50px' }} />
          </div>
          <div className='absolute bottom-0 mb-4'>
            <p>Driver's number:</p>
            <a className='text-blue-500' href={`tel:${onGoingTrip.dPhone}`}><u>{onGoingTrip.dPhone.slice(0,3)}-{onGoingTrip.dPhone.slice(3,6)}-{onGoingTrip.dPhone.slice(6,10)}</u></a>
          </div>
        </div>
        
      )}

      {showAcceptedDriverModal && (
        <div style={{
          position: 'absolute',top: '20%',left: '50%',transform: 'translate(-50%, -50%)',backgroundColor: 'rgba(0, 0, 0, 0.85)',color: 'white',padding: '20px',borderRadius: '8px',zIndex: 10100,display: 'flex',alignItems: 'center',justifyContent: 'center',}}>
          <p style={{ margin: 0, marginRight: '0px', fontWeight:'bold' }}>Waiting for comfirmation...</p>
        </div>
      )}

      {showActiveRide && (
        <div className="">
          <div className='pt-4 pb-20 px-4'
            style={{
              position: "absolute",
              top: '12%',
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              color: "white",
              borderRadius: "8px",
              zIndex: 10100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {/* Finish ride button */}
            <button
              onClick={finishRide}
              className="bg-blue-700 px-8 z-[400] rounded-full right-4 bottom-32 text-white hover:bg-blue-300 mr-2 py-"
            >
              Finish Ride
            </button>
            <button
              onClick={handleCancel}
              className="px-8 z-[400] rounded-full right-4 bottom-32 text-white bg-red-700 hover:bg-red-300 mr-2"
            >
              Cancel Ride
            </button>
            <div className="absolute bottom-0 mb-4">
              <p>Passenger's number:</p>
              <a href={`tel:${onGoingTrip.pPhone}`} className='text-blue-500'>
                <u>{onGoingTrip.pPhone.slice(0,3)}-{onGoingTrip.pPhone.slice(3,6)}-{onGoingTrip.pPhone.slice(6,10)}</u>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Rate Driver */}
      {showRateDriverModal && (
        <ReachedDestinationModal id={tempDriverId} onRate={handleRateDriver} pOrD={"driver"} />
      )}
      {/* Rate Passenger */}
      {showRatePassengerModal && (
        <ReachedDestinationModal id={tempPassengerId} onRate={handleRatePassenger} pOrD={"passenger"}  />
      )}

      {(driverId !== 0 && onGoingTrip.tripId === 0) && (  
        <button
          onClick={getRequests}
          className='bg-settingsButtons p-2 absolute z-[400] rounded-full right-4 bottom-32 text-primary-black hover:bg-settingsButtonsPressed'
        >
          Find Passenger
        </button>
      )}

    </div>
  );
};

export default Map;

