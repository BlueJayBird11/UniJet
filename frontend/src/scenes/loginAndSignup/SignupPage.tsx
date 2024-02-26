import React, { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import background from './background.png';
import { useUserRole } from '@/scenes/settings/userRole/UserRoleContext';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [dob, setDob] = useState('');   
  const [phone, setPhone] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [licensePlate, setLicensePlate] = useState('');  
  const [licenseNumber, setLicenseNumber] = useState('');  
  const [carMake, setCarMake] = useState('');  
  const [carModel, setCarModel] = useState('');  
   
  const { setUserRole } = useUserRole();
  const navigate = useNavigate();

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setShowModal(true);
  };

  const handleRoleSelection = (role: 'driver' | 'passenger') => {
    setUserRole(role);
    setShowModal(false);
    if (role === 'driver') {
      setShowSecondModal(true); // Show the second modal when "Yes, as a Driver" is clicked
    } else {
      navigate('/dashboard'); // Navigate to dashboard or another page as needed
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
              pattern=".+@latech\.edu$"
              title="Email must end with @latech.edu"
              className="w-full p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
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
      </div>

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
  );
};

export default SignupPage;
