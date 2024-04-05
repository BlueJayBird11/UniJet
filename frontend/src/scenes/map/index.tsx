import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Polyline, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
// import * as dotenv from "dotenv";
// dotenv.config();

const Map: React.FC = () => {
 const [position, setPosition] = useState<[number, number] | null>(null);
 const [routeToDestination, setRouteToDestination] = useState<[number, number][] | null>(null);
 const [routeToUser, setRouteToUser] = useState<[number, number][] | null>(null);
 const placeholderLocation = [32.541251162684404, -92.63578950465626]; // Example: Chase Bank Ruston
 const driverLocation = [32.52424701643656, -92.67001400107138]; // Example: Driver's location
 const mapboxAccessToken = '';

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

// Button component to reset the map view to the user's location
const ResetViewButton = () => {
  const map = useMap();
  const resetView = () => {
    if (position) {
      map.flyTo(position, map.getZoom());
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
    <div className="h-screen">
      <MapContainer style={{ width: '100%', height: '85.5%' }} center={position} zoom={13} scrollWheelZoom={true} className="relative">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`}
        />
        {position && (
          <CircleMarker center={position} radius={5} color="blue">
            <Popup>You are here</Popup>
          </CircleMarker>
        )}
        {routeToDestination && <Polyline positions={routeToDestination} weight={10} opacity={0.3} color="blue" />}
        {routeToUser && <Polyline positions={routeToUser} weight={10} opacity={0.3} color="red" />}
        <ResetViewButton /> 
      </MapContainer>
    </div>
 );
};

export default Map;
