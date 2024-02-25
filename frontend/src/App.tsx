import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Info, Passenger, SelectedPage } from './shared/types';


import Profile from '@/scenes/profile';
import NavigationBar from '@/scenes/navigationBar';
import FindRider from '@/scenes/findRider';
import FindDriver from '@/scenes/findDriver';
import History from '@/scenes/history';
import Schedule from '@/scenes/schedule';
import Settings from '@/scenes/settings';
import DeleteAccount from './scenes/settings/deleteAccount';
import EditEmail from './scenes/settings/editEmail';
import EditName from './scenes/settings/editName';
import EditPaymentMethod from './scenes/settings/editPaymentMethod';
import EditUniversity from './scenes/settings/editUniversity';
import Logout from './scenes/settings/logout';
import LoginPage from './scenes/loginAndSignup/LoginPage';
import SignupPage from './scenes/loginAndSignup/SignupPage';
import { UserRoleProvider } from './scenes/settings/userRole/UserRoleContext'; 



function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Profile);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passenger, setPassenger] = useState<Passenger>({
    birthDate: "", 
    email: "",
    phoneNumber: +"", 
    firstName: "",
    lastName: "",
    userStatus: 0,
    carPool: false
  });

  const handleLogin = async(info: Info) => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info), 
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      console.log('Login Success:', data);
      if (data.token == 200) {
        setPassenger({
          birthDate: data.passenger.birthdate,
          email: data.passenger.email,
          phoneNumber: data.passenger.phonenumber,
          firstName: data.passenger.firstname,
          lastName: data.passenger.lastname,
          userStatus: 0,
          carPool: false,
        });
        setIsLoggedIn(true);
      }
      else {
        console.log("Wrong Email or Password");
      }
    
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const renderContent = () => {
    if (isLoggedIn) {
      return (
        <div>
          <NavigationBar selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
          <Routes>
            <Route path="/profile" element={<Profile selectedPage={selectedPage} setSelectedPage={setSelectedPage} passenger={passenger}/>} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/findDriver" element={<FindDriver />} />
            <Route path="/findRider" element={<FindRider />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/delete-account" element={<DeleteAccount />} />
            <Route path="/edit-email" element={<EditEmail />} />
            <Route path="/edit-name" element={<EditName />} />
            <Route path="/edit-payment-method" element={<EditPaymentMethod />} />
            <Route path="/edit-university" element={<EditUniversity />} />
            <Route path="/logout" element={<button onClick={handleLogout}>Logout</button>} />
            <Route path="*" element={<Navigate to="/profile" replace />} />
          </Routes>
        </div>
      );
    } else {
      return (
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin}/>} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      );
    }
  };

  return (
    <div className='app bg-primary-blue'>
      <UserRoleProvider> 
        <BrowserRouter>
          {renderContent()}
        </BrowserRouter>
      </UserRoleProvider>
    </div>
  );
}

export default App;
