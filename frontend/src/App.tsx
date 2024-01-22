import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { SelectedPage } from './shared/types';

// Import your components
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
import LoginPage from './scenes/login and signup/LoginPage';
import SignupPage from './scenes/login and signup/SignupPage';

function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Profile);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
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
            <Route path="/profile" element={<Profile selectedPage={selectedPage} setSelectedPage={setSelectedPage} />} />
            <Route path="/history" element={<History userRole="driver" />} /> {/*for driver set driver/ for passenger set passenger*/}
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
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      );
    }
  };

  return (
    <div className='app bg-primary-blue'>
      <BrowserRouter>
        {renderContent()}
      </BrowserRouter>
    </div>
  );
}

export default App;
