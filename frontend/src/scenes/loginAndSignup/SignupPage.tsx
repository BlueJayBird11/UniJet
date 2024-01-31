import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import background from './background.png';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState(''); 
  const [campusId, setCampusId] = useState('');
  const [phone, setPhone] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    console.log({
      email,
      password,
      confirmPassword,
      fullName,
      dob,
      campusId,
      phone
    });
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
                placeholder="Enter your Full-Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
              <input
                type="text"
                placeholder="Enter your campus ID"
                value={campusId}
                onChange={(e) => setCampusId(e.target.value)}
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
      </div>
  );
};

export default SignupPage;
