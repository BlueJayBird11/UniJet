import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, EnvelopeIcon } from '@heroicons/react/24/solid'; 
import { useUserRole } from '@/scenes/settings/userRole/UserRoleContext';
import { Passenger } from '@/shared/types';

type Props = {
    passenger: Passenger;
    name: string;
    email: string;
    message: string;
}

const Settings = ({passenger}: Props) => {
    const { userRole, setUserRole } = useUserRole();
    const [showReportModal, setShowReportModal] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const changeRoleTo = async (role: 'passenger' | 'driver') => {
        const newStatus = role === 'driver' ? 1 : 0;
        const endpoint = role === 'driver' ? 'status-driver' : 'status';
        try {
            const response = await fetch(`http://localhost:8000/api/v1/settings/${endpoint}/${passenger.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newStatus }), // Convert the passenger object to JSON
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            passenger.email = email; 
            console.log('Success:', data);
            handleRoleChange(role);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleRoleChange = (newRole: 'passenger' | 'driver') => {
        setUserRole(newRole);
    };

    const handleReportSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = {
            name,
            email,
            message,
        };

        const response = await fetch('https://formspree.io/f/xdoqgnoq', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        setName('');
        setEmail('');
        setMessage('');
        setShowReportModal(false);
    };

    return (
        
        <div className="flex flex-col bg-primary-blue font-sans">
            <div className="bg-gray-600 text-primary-black py-4 px-6 flex items-center justify-between fixed top-0 w-full">
                <Link to="/" className="mr-4">
                    <ChevronLeftIcon className="h-6 w-6" />
                </Link>
                <h1 className="text-xl text-primary-black font-bold">Settings</h1>
                <button
                    onClick={() => setShowReportModal(true)}
                    className="bg-red-500 text-primary-black rounded-lg shadow-md px-4 py-2 flex items-center space-x-1"
                >
                    <EnvelopeIcon className="h-5 w-5" /> 
                </button>
            </div>
            <div className="p-2 flex-grow flex justify-center mt-16"> {/* Center the buttons and consider banner height */}
                <div className="my-6">
                    <h2 className="text-lg text-primary-black font-semibold">Your role is {userRole}</h2>
                    <div className="flex mt-4">
                        <button
                            onClick={() => changeRoleTo('driver')}
                            className={`mx-2 px-4 py-2 text-primary-black ${userRole === 'driver' ? 'bg-settingsButtons text-primary-black' : 'bg-gray-600'}`}
                        >
                            Driver
                        </button>
                        <button
                            onClick={() => changeRoleTo('passenger')}
                            className={`mx-2 px-4 py-2 text-primary-black ${userRole === 'passenger' ? 'bg-settingsButtons text-primary-black' : 'bg-gray-600'}`}
                        >
                            Passenger
                        </button>
                    </div>
                </div>
            </div>
            <div className="p-4 text-primary-black">
                <Link to="/change-password" className="block mb-2">
                    <div className="bg-gray-600 rounded-lg shadow-md p-4">
                        <p className="text-lg text-primary-black font-medium">Change Password</p>
                    </div>
                </Link>
                <Link to="/edit-name" className="block mb-2">
                    <div className="bg-gray-600 rounded-lg shadow-md p-4">
                        <p className="text-lg text-primary-black font-medium">Edit Name</p>
                    </div>
                </Link>
                <Link to="/edit-email" className="block mb-2">
                    <div className="bg-gray-600 rounded-lg shadow-md p-4">
                        <p className="text-lg text-primary-black font-medium">Edit Email</p>
                    </div>
                </Link>
                <Link to="/edit-university" className="block mb-2">
                    <div className="bg-gray-600 rounded-lg shadow-md p-4">
                        <p className="text-lg text-primary-black font-medium">Edit University</p>
                    </div>
                </Link>
                <Link to="/change-phone-number" className="block mb-2">
                    <div className="bg-gray-600 rounded-lg shadow-md p-4">
                        <p className="text-lg text-primary-black font-medium">Change Phone Number</p>
                    </div>
                </Link>
                <Link to="/delete-account" className="block mb-2">
                    <div className="bg-red-500 rounded-lg shadow-md p-4">
                        <p className="text-lg text-primary-black font-medium">Delete Account</p>
                    </div>
                </Link>
                <Link to="/logout" className="block mb-2">
                    <div className="bg-red-500 rounded-lg shadow-md p-4">
                        <p className="text-lg text-primary-black font-medium">Logout</p>
                    </div>
                </Link>
            </div>

            {showReportModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded w-full max-w-md">
                        <h3 className="text-lg font-bold mb-2">Report an Issue</h3>
                        <form onSubmit={handleReportSubmit}>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-2 border rounded mb-2"
                                placeholder="Your Name"
                                required
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border rounded mb-2"
                                placeholder="Email of your account"
                                required
                            />
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="Describe the issue..."
                                required
                            ></textarea>
                            <div className="flex justify-end mt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowReportModal(false)}
                                    className="bg-gray-500 hover:bg-gray-600 text-primary-black font-bold py-2 px-4 rounded mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-primary-black font-bold py-2 px-4 rounded"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;
