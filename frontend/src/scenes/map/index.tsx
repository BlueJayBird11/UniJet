import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { RiderType } from '@/shared/types';
// import * as dotenv from "dotenv";
// dotenv.config();


const Map: React.FC = () => {
 const [position, setPosition] = useState<[number, number] | null>(null);
 const [routeToDestination, setRouteToDestination] = useState<[number, number][] | null>(null);
 const [routeToUser, setRouteToUser] = useState<[number, number][] | null>(null);
 const placeholderLocation = [32.541251162684404, -92.63578950465626]; // Example: Chase Bank Ruston
 const driverLocation = [32.52424701643656, -92.67001400107138]; // Example: Driver's location
 const mapboxAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
 const riders: Array<RiderType> = [
  {
    name: "Ash",
    rating: 5.0,
    payMin: 9,
    payMax: 11,
    position: [32.541251162684404, -92.63578950465626], 
    destination: "Chase Bank"
  }
] 

 useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPosition([latitude, longitude]);
        fetchRoute(latitude, longitude, placeholderLocation[0], placeholderLocation[1], setRouteToDestination);
        fetchRoute(driverLocation[0], driverLocation[1], latitude, longitude, setRouteToUser); // Fetch reverse route
      },
      (error) => console.error('Error watching position:', error),
      { enableHighAccuracy: true, maximumAge: 0 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
 }, []);

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

 return (
    <div className="h-screen">
      <MapContainer style={{ width: '100%', height: '90.5%' }} center={position} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>
        {riders.map((rider: RiderType) => (
        <Marker position={rider.position}>
          <Popup className='flex items-center justify-center'>
            Name: {rider.name} <br/>
            Rating: {rider.rating} <br/>
            Pay: {rider.payMin} - {rider.payMax} <br/>
            Destination: {rider.destination} <br/>
            <button className='bg-blue-700 rounded-full p-2 text-white'>Accept</button>
          </Popup>
        </Marker>

      ))}
        {routeToDestination && <Polyline positions={routeToDestination} color="blue" />}
        {routeToUser && <Polyline positions={routeToUser} color="red" />}
      </MapContainer>
    </div>
 );
};

export default Map;
