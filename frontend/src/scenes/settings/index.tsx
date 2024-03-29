import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EditNameButton from "@/assets/edit_name.png";
import EditEmailButton from "@/assets/edit_email.png";
import EditUniversityButton from "@/assets/edit_university.png";
import LogoutButton from "@/assets/logout.png";
import DeleteAccountButton from "@/assets/delete_account.png";
import { useUserRole } from '@/scenes/settings/userRole/UserRoleContext';
import { Passenger } from '@/shared/types';
import ChangePhoneNumberButton from "@/assets/change_number.png";
import axios from 'axios';

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

    const images = [EditNameButton, EditEmailButton, EditUniversityButton, LogoutButton, DeleteAccountButton, ChangePhoneNumberButton];
    const routes = ["/edit-name", "/edit-email", "/edit-university", "/logout", "/delete-account", "/change-phone-number"];

    return (
        <div className='flex flex-col items-center bg-primary-blue-100 relative px-4 py-6'>
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
            
            {images.map((image, index) => (
                <Link key={index} to={routes[index]}>
                    <button>
                        <img src={image} alt={`Button ${index+1}`} style={{width: '200px', height: '65px'}}/>
                    </button>
                </Link>
            ))}

            <button onClick={() => setShowReportModal(true)} className="absolute top-0 right-0 mt-4 mr-4 bg-red-500 text-white px-4 py-2 rounded md:mt-6 md:mr-6">
                Report Issue
            </button>

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