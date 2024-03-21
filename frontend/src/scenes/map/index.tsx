// Map.tsx
import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import "leaflet/dist/leaflet.css";
import 'leaflet-geosearch/dist/geosearch.css';
import { useNavigate } from 'react-router-dom';



const Map = () => {
    const [position, setPosition] = useState<[number, number] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setPosition([position.coords.latitude, position.coords.longitude]);
            }, () => {
                console.error('Unable to retrieve your location');
            });
        }
    }, []);

    useEffect(() => {
        if (!position) return;

        const map = L.map('map').setView(position, 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        const marker = L.marker(position).addTo(map);
        marker.bindPopup("You are here").openPopup();

        const provider = new OpenStreetMapProvider();
        const searchControl = GeoSearchControl({
          provider: provider,
          style: 'bar',
          showMarker: true,
          autoClose: true,
          searchLabel: 'Enter address',
        });
        
        map.addControl(searchControl);

        return () => {
            map.remove();
        };
    }, [position]);

    const handleConfirm = () => {
        setIsModalOpen(false);
        navigate('/looking-for-driver');
    };

    const handleCancel = () => setIsModalOpen(false);

    if (!position) {
        return <div>Loading...</div>;
    }

    return (
        <div className="h-screen relative">
            <div id="map" style={{ width: '100%', height: '89%' }}></div>
            <button onClick={() => setIsModalOpen(true)} style={{
                position: 'absolute',
                top: '45px',
                right: '20px',
                zIndex: 1000,
                backgroundColor: 'red',
                color: 'white',
                padding: '10px',
                borderRadius: '5px',
                cursor: 'pointer',
                border: 'none',
            }}>
                Request Ride
            </button>
            {isModalOpen && (
                <Modal 
                    message="Are you sure you want to request a ride for this location?" 
                    onConfirm={handleConfirm} 
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};

export default Map;

const Modal = ({ message, onConfirm, onCancel }) => (
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1050,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
        <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}>
            <p>{message}</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button onClick={onConfirm} style={{
                    marginRight: '10px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    border: 'none',
                }}>Yes</button>
                <button onClick={onCancel} style={{
                    backgroundColor: '#f44336',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    border: 'none',
                }}>No</button>
            </div>
        </div>
    </div>
);
