// LookingForDriver.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal'; // Ensure this is correctly imported

const LookingForDriver: React.FC = () => {
    const navigate = useNavigate();
    const [isDriverFound, setIsDriverFound] = useState(false);
    const [rideAccepted, setRideAccepted] = useState(false);
    const [driverHere, setDriverHere] = useState(false);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [showDriverOnWayModal, setShowDriverOnWayModal] = useState(false);
    const [isInCar, setIsInCar] = useState(false);
    const [showRateDriverModal, setShowRateDriverModal] = useState(false);
    const [driverDetails, setDriverDetails] = useState({
        name: 'John Doe', 
        sex: 'Male', 
        vehicleModel: 'Toyota Camry', 
        rating: '4.5', 
        phone: '123-456-7890',
        licensePlate: 'LUV690'
    });

    useEffect(() => {
        const findDriverTimeout = setTimeout(() => {
            setIsDriverFound(true);
        }, 5000); // Simulate finding a driver after 5 seconds

        return () => clearTimeout(findDriverTimeout);
    }, []);

    useEffect(() => {
        if (rideAccepted) {
            const driverArrivalTimeout = setTimeout(() => {
                setDriverHere(true); // Simulate driver arrival
            }, 5000); // After 5 seconds

            return () => clearTimeout(driverArrivalTimeout);
        }
    }, [rideAccepted]);

    const handleAcceptDriver = () => {
        setRideAccepted(true);
        setIsDriverFound(false);
        setShowDriverOnWayModal(true); // Show "Driver on the way" modal
    };

    const handleDeclineDriver = () => {
        setIsDriverFound(false);
        setIsCancelModalOpen(true); // Show cancellation confirmation modal
    };

    const handleCancelSearchConfirmed = () => {
        navigate('/map'); // Go back to the map
    };

    const handleInCarConfirmation = () => {
        setIsInCar(true);
        setDriverHere(false); // Driver is now not 'arriving', they have 'arrived'
        setShowDriverOnWayModal(false); // Close the "Driver on the way" modal
        setTimeout(() => {
            setShowRateDriverModal(true); // Show rate driver modal after 5 seconds
        }, 5000);
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

            {showDriverOnWayModal && !isInCar && (
                <Modal
                    title="Driver on the Way"
                    message={`Your driver ${driverDetails.name} is on their way. Vehicle: ${driverDetails.vehicleModel}, Rating: ${driverDetails.rating}`}
                    confirmText="OK"
                    onConfirm={() => setShowDriverOnWayModal(false)} // Just hide the modal when "OK" is clicked
                    onCancel={() => {
                        setShowDriverOnWayModal(false);
                        navigate('/map'); // Go back to map if user cancels
                    }}
                    isOpen={showDriverOnWayModal}
                />
            )}

            {driverHere && (
                <Modal
                    title="Your Driver is Here"
                    message={`Your driver ${driverDetails.name} has arrived. Vehicle: ${driverDetails.vehicleModel}, License Plate: ${driverDetails.licensePlate}`}
                    confirmText="I'm in the Car"
                    onConfirm={handleInCarConfirmation}
                    isOpen={driverHere}
                />
            )}

            {showRateDriverModal && (
                <Modal
                    title="Ride Completed"
                    message="Please rate your driver:"
                    confirmText="Submit Rating"
                    onConfirm={() => {
                        setShowRateDriverModal(false);
                        // Here you might handle the submission of the rating
                    }} // Proceed with rating submission or just close the modal
                    onCancel={() => setShowRateDriverModal(false)} // Close the modal without rating
                    isOpen={showRateDriverModal}
                    additionalInfo={<div>Rating: [Your Rating Component Here]</div>}
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
