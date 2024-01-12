import React from 'react';
import { Link } from 'react-router-dom';
import EditNameButton from "@/assets/edit_name.png";
import EditEmailButton from "@/assets/edit_email.png";
import EditPaymentMethodButton from "@/assets/edit_payment_method.png";
import EditUniversityButton from "@/assets/edit_university.png";
import LogoutButton from "@/assets/logout.png";
import DeleteAccountButton from "@/assets/delete_account.png";

type SettingsProps = {}

const Settings = (props: SettingsProps) => {
 const images = [EditNameButton, EditEmailButton, EditPaymentMethodButton, EditUniversityButton, LogoutButton, DeleteAccountButton];
 const routes = ["/edit-name", "/edit-email", "/edit-payment-method", "/edit-university", "/logout", "/delete-account"];

 return (
     <div className='flex flex-col items-center bg-primary-blue-100'>
        <h1 className='text=4xl font-bold text-primary-black mt-12'>
            Settings
        </h1> 
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
