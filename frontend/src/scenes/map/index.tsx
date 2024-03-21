import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import "leaflet/dist/leaflet.css";
import 'leaflet-geosearch/dist/geosearch.css';

const Map: React.FC = () => {
    const [position, setPosition] = useState<[number, number] | null>(null);

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setPosition([position.coords.latitude, position.coords.longitude]);
            }, () => {
                console.log('Unable to retrieve your location');
            });
        }
    }, []);

    useEffect(() => {
        if (!position) return;

        // Initialize map
        const map = L.map('map').setView(position, 13);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Add a marker at the current location
        const marker = L.marker(position).addTo(map);
        marker.bindPopup("You are here").openPopup();

        // Add geosearch control
        const provider = new OpenStreetMapProvider();
        const searchControl = new (GeoSearchControl as any)({
            provider: provider,
            style: 'bar',
            showMarker: true,
            autoClose: true,
            searchLabel: 'Enter address',
        });
        map.addControl(searchControl);

        // Cleanup function to remove map when component unmounts
        return () => {
            map.remove();
        };
    }, [position]); // Effect runs when position changes

    if (!position) {
        return <div>Loading...</div>;
    }

    return (
        <div className="h-screen">
            <div id="map" style={{ width: '100%', height: '89%' }}></div>
        </div>
    );
};

export default Map;
