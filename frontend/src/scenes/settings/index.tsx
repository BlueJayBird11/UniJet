import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid'; 
import EditNameButton from "@/assets/edit_name.png";
import EditEmailButton from "@/assets/edit_email.png";
import EditUniversityButton from "@/assets/edit_university.png";
import LogoutButton from "@/assets/logout.png";
import DeleteAccountButton from "@/assets/delete_account.png";
import { useUserRole } from '@/scenes/settings/userRole/UserRoleContext';
import { Passenger } from '@/shared/types';

type Props = {
    passenger: Passenger;
    name: string;
    email: string;
    message: string;
    driverId: number;
    setDriverId: (value: number) => void;
}

const Settings = ({passenger, driverId, setDriverId}: Props) => {
    const { userRole, setUserRole } = useUserRole();
    const [showReportModal, setShowReportModal] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const changeRoleToPassenger = async() => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/settings/status/${passenger.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({"newStatus": 1}), // Convert the passenger object to JSON
            });
      
            if (!response.ok) {
              throw new Error(`Error: ${response.status}`);
            }
      
            const data = await response.json();
            passenger.email = email;
            console.log('Success:', data);
            handleRoleChange('passenger');
      
          } catch (error) {
            console.error('Error:', error);
          }
      }; 

      const changeRoleToDriver = async() => {
        try {
          const response = await fetch(`http://localhost:8000/api/v1/settings/status-driver/${passenger.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({"newStatus": 1}), // Convert the passenger object to JSON
          });
    
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
    
          const data = await response.json();
          passenger.email = email;
          console.log('Success:', data);

          // set driverId
          // console.log(data.data.driverId.rows[0].driverid);
          setDriverId(data.data.driverId.rows[0].driverid);
          console.log(driverId)

          handleRoleChange('driver');
    
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

    const buttonStyles = "mt-2 w-full font-bold py-2 px-4 rounded border border-gray-300 hover:border-gray-500 bg-white text-black";
    const dangerButtonStyles = "mt-2 w-full font-bold py-2 px-4 rounded border border-gray-300 hover:border-gray-500 bg-red-500 text-white";

    return (
        <div className='flex flex-col items-center bg-primary-blue-100 relative px-4 py-6'>
            <div className="absolute top-0 left-0 mt-4 ml-4 flex items-center text-white">
                <Link to="/" className="flex items-center">
                    <ChevronLeftIcon className="h-5 w-5 mr-1" /> 
                    Back
                </Link>
            </div>
            <div className='my-8'>
                <h2 className='text-2xl font-bold text-primary-black'>Your role is {userRole}</h2>
                <div className='flex mt-4'>
                    <button 
                        onClick={changeRoleToDriver} 
                        className={`mx-2 px-4 py-2 ${userRole === 'driver' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Driver
                    </button>
                    <button 
                        onClick={changeRoleToPassenger} 
                        className={`mx-2 px-4 py-2 ${userRole === 'passenger' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Passenger
                    </button>
                </div>
            </div>
            
            <Link to="/edit-name">
                <button className={buttonStyles}>
                    Edit Name
                </button>
            </Link>
            <Link to="/edit-email">
                <button className={buttonStyles}>
                    Edit Email
                </button>
            </Link>
            <Link to="/edit-university">
                <button className={buttonStyles}>
                    Edit University
                </button>
            </Link>
            <Link to="/change-password">
                <button className={buttonStyles}>
                    Change Password
                </button>
            </Link>
            <Link to="/change-phone-number">
                <button className={buttonStyles}>
                    Change Phone Number
                </button>
            </Link>
            <Link to="/delete-account">
                <button className={dangerButtonStyles}>
                    Delete Account
                </button>
            </Link>

            <button onClick={() => setShowReportModal(true)} className="absolute top-0 right-0 mt-4 mr-4 bg-red-500 text-white px-4 py-2 rounded md:mt-6 md:mr-6">
                Report Issue
            </button>

            <div className="mt-10">
                <Link to="/logout">
                    <button className="bg-red-500 text-white font-bold py-2 px-4 rounded">
                        Logout
                    </button>
                </Link>
            </div>

            

            {showReportModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded w-full max-w-md">
                        <h3 className="text-lg font-bold mb-2">Report an Issue</h3>
                        <form onSubmit={handleReportSubmit}>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded mb-2" placeholder="Your Name" required />
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded mb-2" placeholder="Email of your account" required />
                            <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-2 border rounded" placeholder="Describe the issue..." required></textarea>
                            <div className="flex justify-end mt-2">
                                <button type="button" onClick={() => setShowReportModal(false)} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2">
                                    Cancel
                                </button>
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
