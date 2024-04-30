import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { FoundDriver, HoldDestination, Info, OnGoingTrip, Passenger, SelectedPage } from './shared/types';



import Profile from '@/scenes/profile';
import NavigationBar from '@/scenes/navigationBar';
import FindRider from '@/scenes/findRider';
import FindDriver from './scenes/findDriver';
import History from '@/scenes/history';
import Schedule from '@/scenes/schedule';
import Map from '@/scenes/map';
import ViewTimeSlot from '@/scenes/schedule/viewTimeSlot'
import AddTimeSlot from '@/scenes/schedule/addTimeSlot'
import DeleteTimeSlot from '@/scenes/schedule/deleteTimeSlot'
import Settings from '@/scenes/settings';
import DeleteAccount from './scenes/settings/deleteAccount';
import EditEmail from './scenes/settings/editEmail';
import EditName from './scenes/settings/editName';
import ChangePassword from './scenes/settings/changePassword';
import EditUniversity from './scenes/settings/editUniversity';
import Logout from './scenes/settings/logout';
import LoginPage from './scenes/loginAndSignup/LoginPage';
import ForgotPasswordPage from './scenes/loginAndSignup/ForgotPasswordPage';
import OTPVerificationPage from './scenes/loginAndSignup/OTPVerificationPage';
import ChangePasswordPage from './scenes/loginAndSignup/ChangePasswordPage';
import SignupPage from './scenes/loginAndSignup/SignupPage';
import { UserRoleProvider } from './scenes/settings/userRole/UserRoleContext'; 
import PhoneVerification from './scenes/settings/phoneNumber/PhoneVerification';
import ConfirmRide from './scenes/map/searchDriver';
import DriverFound from './scenes/map/driverFound';



function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Profile);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showActiveRide, setShowActiveRide] = useState(false);
  const [position, setPosition] = useState<[number, number]>([0,0]);
  const [showDriverPath, setShowDriverPath] = useState(false);
  const [passenger, setPassenger] = useState<Passenger>({
    id: 0,
    birthDate: "", 
    email: "",
    phoneNumber: +"", 
    firstName: "",
    lastName: "",
    userStatus: 0,
    carPool: false
  });

  const [driverId, setDriverId] = useState(0);
  const [holdDestination, setHoldDestination] = useState<HoldDestination>({
    name: "",
    destination: [0,0]
  });

  const [foundDriver, setFoundDriver] = useState<FoundDriver>({
    name:"",
    id:0,
    rating:5.0
  })

  const [onGoingTrip, setOnGoingTrip] = useState<OnGoingTrip>({
    tripId: 0,
    passengerId: 0,
    driverId: 0,
    passengerName: "",
    driverName: "",
    passengerStartLocation: [0,0],
    passengerLocation: [0,0],
    driverLocation: [0,0],
    destination: "",
    destinationChoords: [0,0],
    startTime: "",
    rideDate: "",
    confirmed: false,
    cancelled: false
  })

  useEffect(() => {
    const watchPositionId = navigator.geolocation.watchPosition(
      (geoPosition) => {
        const lat = geoPosition.coords.latitude;
        const lon = geoPosition.coords.longitude;
        setPosition([lat, lon]);
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  
    // Cleanup function to stop watching for position when component unmounts
    return () => {
      navigator.geolocation.clearWatch(watchPositionId);
    };
  }, []);
  
  const handleLogin = async(info: Info): Promise<boolean> => {
    // setPassenger({
    //   id: 0,
    //   birthDate: "",
    //   email: "jfr021@email.latech.edu",
    //   phoneNumber: 1,
    //   firstName: "Test",
    //   lastName: "User",
    //   userStatus: 0,
    //   carPool: false,
    // });
    // setIsLoggedIn(true);

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
        setPassenger({
          id: data.passenger.id,
          birthDate: data.passenger.birthdate,
          email: data.passenger.email,
          phoneNumber: data.passenger.phonenumber,
          firstName: data.passenger.firstname,
          lastName: data.passenger.lastname,
          userStatus: 0,
          carPool: false,
        });
        setIsLoggedIn(true);
        return true;
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassenger({
      id: 0,
      birthDate: "",
      email: "",
      phoneNumber: 0,
      firstName: "",
      lastName: "",
      userStatus: 0,
      carPool: false
    });
  };

  const renderContent = () => {
    if (isLoggedIn) {
      return (
        <div>
          <NavigationBar selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
          <Routes>
            <Route path="/profile" element={<Profile selectedPage={selectedPage} setSelectedPage={setSelectedPage} passenger={passenger}/>} />
            <Route path="/history" element={<History selectedPage={selectedPage} setSelectedPage={setSelectedPage} passenger={passenger}/>} />
            <Route path="/settings" element={<Settings passenger={passenger} name={''} email={''} message={''} driverId={driverId} setDriverId={setDriverId}/>} />
            <Route path="/findDriver" element={<FindDriver />} />
            <Route path="/confirmRide" element={<ConfirmRide passenger={passenger} holdDestination={holdDestination} setHoldDestination={setHoldDestination} foundDriver={foundDriver} setFoundDriver={setFoundDriver} onGoingTrip={onGoingTrip} setOnGoingTrip={setOnGoingTrip}  position={position} setPosition={setPosition}/>} />
            <Route path="/driverFound" element={<DriverFound passenger={passenger} foundDriver={foundDriver} onGoingTrip={onGoingTrip} setOnGoingTrip={setOnGoingTrip} showDriverPath={showDriverPath} setShowDriverPath={setShowDriverPath}/>} />
            <Route path="/findRider" element={<FindRider />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/map" element={<Map passenger={passenger} driverId={driverId} holdDestination={holdDestination} setHoldDestination={setHoldDestination} onGoingTrip={onGoingTrip} setOnGoingTrip={setOnGoingTrip} showDriverPath={showDriverPath} setShowDriverPath={setShowDriverPath} showActiveRide={showActiveRide} setShowActiveRide={setShowActiveRide} position={position} setPosition={setPosition}/>} />
            <Route path="/viewTimeSlot" element={<ViewTimeSlot passenger={passenger} />} />
            <Route path="/addTimeSlot" element={<AddTimeSlot passenger={passenger} />} />
            <Route path="/deleteTimeSlot" element={<DeleteTimeSlot />} />
            <Route path="/delete-account" element={<DeleteAccount passenger={passenger}/>} />
            <Route path="/edit-email" element={<EditEmail passenger={passenger}/>} />
            <Route path="/change-password" element={<ChangePassword/>} />
            <Route path="/edit-name" element={<EditName passenger={passenger}/>} />
            <Route path="/change-phone-number" element={<PhoneVerification />} />
            <Route path="/edit-university" element={<EditUniversity />} />
            <Route path="/logout" element={<Logout onLogout={() => {setIsLoggedIn(false);}} />} />
            <Route path="*" element={<Navigate to="/profile" replace />} />
          </Routes>
        </div>
      );
    } else {
      return (
        <Routes>
          <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/otpverificationpage" element={<OTPVerificationPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
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
