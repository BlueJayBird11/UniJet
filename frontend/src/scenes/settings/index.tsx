import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EditNameButton from "@/assets/edit_name.png";
import EditEmailButton from "@/assets/edit_email.png";
import EditUniversityButton from "@/assets/edit_university.png";
import LogoutButton from "@/assets/logout.png";
import DeleteAccountButton from "@/assets/delete_account.png";
import { useUserRole } from '@/scenes/settings/userRole/UserRoleContext';


const Settings = () => {
    const { userRole, setUserRole } = useUserRole();
    const [showReportModal, setShowReportModal] = useState(false);
    const [reportText, setReportText] = useState('');

    const handleRoleChange = (newRole: 'driver' | 'passenger') => {
        setUserRole(newRole);
    };

    const handleReportSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Report Submitted:", reportText);
        // Send reportText to your backend server
        setShowReportModal(false);
        setReportText(''); // Clear the form
    };

    const images = [EditNameButton, EditEmailButton, EditUniversityButton, LogoutButton, DeleteAccountButton];
    const routes = ["/edit-name", "/edit-email", "/edit-university", "/logout", "/delete-account"];

    return (
        <div className='flex flex-col items-center bg-primary-blue-100 relative px-4 py-6'>
            {/* User Role Selection */}
            <div className='my-8'>
                <h2 className='text-2xl font-bold text-primary-black'>Your role is {userRole}</h2>
                <div className='flex mt-4'>
                    <button 
                        onClick={() => handleRoleChange('driver')} 
                        className={`mx-2 px-4 py-2 ${userRole === 'driver' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Driver
                    </button>
                    <button 
                        onClick={() => handleRoleChange('passenger')} 
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

            {/* Report Issue Button */}
            <button 
                onClick={() => setShowReportModal(true)} 
                className="absolute top-0 right-0 mt-4 mr-4 bg-red-500 text-white px-4 py-2 rounded md:mt-6 md:mr-6"
            >
                Report Issue
            </button>

            {/* Report Issue Modal */}
            {showReportModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4">
                    <div className="bg-white p-4 rounded w-full max-w-md">
                        <h3 className="text-lg font-bold mb-2">Report an Issue</h3>
                        <form onSubmit={handleReportSubmit}>
                            <textarea 
                                className="w-full p-2 border rounded"
                                value={reportText}
                                onChange={(e) => setReportText(e.target.value)}
                                placeholder="Describe the issue..."
                            ></textarea>
                            <div className="flex justify-end mt-2">
                                <button 
                                    type="button" 
                                    onClick={() => setShowReportModal(false)}
                                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
}

export default Settings;
