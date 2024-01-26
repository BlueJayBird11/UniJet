import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EditNameButton from "@/assets/edit_name.png";
import EditEmailButton from "@/assets/edit_email.png";
import EditPaymentMethodButton from "@/assets/edit_payment_method.png";
import EditUniversityButton from "@/assets/edit_university.png";
import LogoutButton from "@/assets/logout.png";
import DeleteAccountButton from "@/assets/delete_account.png";
import { useUserRole } from '@/scenes/settings/userRole/UserRoleContext';

type SettingsProps = {}

const Settings = (props: SettingsProps) => {
    const { userRole, setUserRole } = useUserRole();
    const handleRoleChange = (newRole: 'driver' | 'passenger') => {
        setUserRole(newRole);
      }
      
 const images = [EditNameButton, EditEmailButton, EditPaymentMethodButton, EditUniversityButton, LogoutButton, DeleteAccountButton];
 const routes = ["/edit-name", "/edit-email", "/edit-payment-method", "/edit-university", "/logout", "/delete-account"];

 return (
     <div className='flex flex-col items-center bg-primary-blue-100'>
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
     </div>
 )
}

export default Settings;
