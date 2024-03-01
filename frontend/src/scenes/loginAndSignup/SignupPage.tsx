import React, { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import background from './background.png';
import { useUserRole } from '@/scenes/settings/userRole/UserRoleContext';
import { Passenger } from '@/shared/types';
import axios from 'axios';


const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [dob, setDob] = useState('');   
  const [phone, setPhone] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [licensePlate, setLicensePlate] = useState('');  
  const [licenseNumber, setLicenseNumber] = useState('');  
  const [carMake, setCarMake] = useState('');  
  const [carModel, setCarModel] = useState('');  
   
  const { setUserRole } = useUserRole();
  const navigate = useNavigate();

  const postPassenger = async(user: Passenger) => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/passengers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user), 
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);
      setShowModal(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    
    const user: Passenger ={
      birthDate: dob, 
      email: email,
      passwordHash: password, 
      phoneNumber: +phone, 
      firstName: FirstName,
      lastName: LastName,
      userStatus: 0,
      carPool: false
    };

    
    try {
      await axios.post('http://localhost:8000/api/send-otp', { email });
      setShowOtpModal(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setOtpError('Failed to send OTP. Please try again.');
    }

    console.log(user);

    // SEND REQUEST
    postPassenger(user);
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/verify-otp', { email, otp });
      alert("OTP verified successfully.");
      setShowOtpModal(false);
      setShowModal(true);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setOtpError('Failed to verify OTP. Please try again.');
    }
  };


  const handleRoleSelection = (role: 'driver' | 'passenger') => {
    setUserRole(role);
    setShowModal(false);
    if (role === 'driver') {
      setShowSecondModal(true); 
    } else {
      navigate('/dashboard'); 
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-no-repeat bg-cover" style={{ backgroundImage: `url(${background})` }}>
      <div className="w-full max-w-lg">
        <h1 className="text-6xl font-bold text-center mb-2 text-white shadow-lg bg-opacity-50 bg-black px-3 py-1 rounded">UNIJET</h1>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-semibold text-center mb-6">Sign Up</h2>
          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              pattern=".+@email.latech\.edu$"
              title="Email must end with @latech.edu"
              className="w-full p-2 border rounded"
            />
            
            <div className="relative mb-4">
              <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2 border rounded pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
              {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
            {passwordError && <div className="text-red-500 text-sm">{passwordError}</div>}
            <input
              type="text"
              placeholder="Your First Name"
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Your Last Name"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
            <label htmlFor="dob" className="block text-gray-700 text-sm font-bold mb-2">Enter your date of birth here: </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign Up</button>
          </form>
          <p className="text-center text-sm mt-4">
            Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-800">Login</Link>
          </p>
        </div>
      
          {showOtpModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
              <h2 className="text-xl font-semibold text-center mb-4">Verify Your Email</h2>
              <div className="mb-4">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="form-input mt-1 block w-full border-gray-300 shadow-sm rounded-md"
                />
              </div>
              {otpError && <div className="text-red-500 text-sm text-center mb-3">{otpError}</div>}
              <div className="flex justify-between gap-4">
                <button
                  onClick={verifyOtp}
                  className="flex-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Verify OTP
                </button>
                <button
                  onClick={() => setShowOtpModal(false)}
                  className="flex-1 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}


      {/* First Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded">
            <h2 className="text-xl font-semibold mb-4"> Do you wish to be a Driver?</h2>
            <div className="flex justify-center">
              <button   
                onClick={() => handleRoleSelection('passenger')}
                className="bg-gray-200 mx-2 px-4 py-2 rounded"
              >
                No, Passenger Only
              </button>
              <button   
                onClick={() => handleRoleSelection('driver')}
                className="bg-blue-500 text-white mx-2 px-4 py-2 rounded"
              >
                Yes, as a Driver
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Second Modal */}
      {showSecondModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded">
            <h2 className="text-xl font-semibold mb-4 text-center">Driver Information</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              navigate('/login'); // Navigate to the login screen upon form submission
            }} className="space-y-4">
              <input
                type="text"
                placeholder="License Plate Number"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Driver License Number"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Car Make"
                value={carMake}
                onChange={(e) => setCarMake(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Car Model"
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
              <div className="flex justify-center items-center">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Submit
                </button>
              </div>
            </form>
            <div className="flex justify-center items-center">
              <button   
                onClick={() => setShowSecondModal(false)}
                className="bg-gray-200 mx-2 px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default SignupPage;
