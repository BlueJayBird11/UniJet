// LookingForDriver.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal'; // Ensure this is correctly imported

const LookingForDriver: React.FC = () => {
    const navigate = useNavigate();
    const [isDriverFound, setIsDriverFound] = useState(false);
    const [rideAccepted, setRideAccepted] = useState(false);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [driverDetails, setDriverDetails] = useState({ name: 'John Doe', sex: 'Male', vehicleModel: 'Toyota Camry', rating: '4.5', phone: '123-456-7890' });

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsDriverFound(true); // Simulate finding a driver after 10 seconds
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleAcceptDriver = () => {
        setRideAccepted(true); // Indicate that ride has been accepted
        setIsDriverFound(false); // Hide initial driver found modal
    };

    const handleDeclineDriver = () => {
        setIsDriverFound(false); // Hide driver found modal
        setIsCancelModalOpen(true); // Show confirmation for cancelling or keep looking
    };

    const handleCancelSearchConfirmed = () => {
        navigate('/'); // Navigate back to map or home page
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-light">
            <div className="p-5 text-center">
                <h1 className="mb-4 text-xl font-bold">Looking for a Driver...</h1>
                <p className="mb-6">Please wait, we are finding the best match for your ride.</p>
                <button onClick={() => setIsCancelModalOpen(true)} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                    Cancel Search
                </button>
            </div>

            {isDriverFound && !rideAccepted && (
                <Modal
                    title="Driver Found!"
                    message={`Name: ${driverDetails.name}, Sex: ${driverDetails.sex}, Vehicle: ${driverDetails.vehicleModel}, Rating: ${driverDetails.rating}`}
                    confirmText="Yes, Accept Ride"
                    cancelText="No, Find Another"
                    onConfirm={handleAcceptDriver}
                    onCancel={handleDeclineDriver}
                    isOpen={isDriverFound}
                />
            )}

            {rideAccepted && (
                <Modal
                    title="Ride Accepted"
                    message={`Your driver, ${driverDetails.name}, is on their way. Vehicle: ${driverDetails.vehicleModel}, Rating: ${driverDetails.rating}.`}
                    confirmText="OK"
                    onConfirm={() => setRideAccepted(false)} // You could navigate to a new page or just close this modal.
                    isOpen={rideAccepted}
                    additionalInfo={<p>Contact: {driverDetails.phone}</p>}
                />
            )}

            <Modal
                title="Cancel Ride Search"
                message="Are you sure you want to cancel looking for a driver?"
                confirmText="Yes, Cancel"
                cancelText="No, Keep Searching"
                onConfirm={handleCancelSearchConfirmed}
                onCancel={() => setIsCancelModalOpen(false)}
                isOpen={isCancelModalOpen}
            />
        </div>
    );
};

export default LookingForDriver;
