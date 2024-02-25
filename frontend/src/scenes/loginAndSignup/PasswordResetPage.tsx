// PasswordResetPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import background from './background.png'; // Assuming you have this image for background

const PasswordResetPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage('If an account exists for the email provided, you will receive a password reset email.');
        setError(''); // Clear any previous errors
      })
      .catch((error) => {
        setError('Failed to send password reset email. Please try again.');
        setMessage(''); // Clear any previous message
        console.error(error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-no-repeat bg-cover" style={{ backgroundImage: `url(${background})` }}>
      <div className="w-full max-w-md">
      <h1 className="text-6xl font-bold text-center mb-2 text-white shadow-lg bg-opacity-50 bg-black px-3 py-1 rounded">UNIJET</h1>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-semibold text-center mb-6">Reset Password</h2>

          {message && (
            <p className="text-center mb-4 text-lg text-green-500">
              {message}
            </p>
          )}

          {error && (
            <p className="text-center mb-4 text-lg font-bold text-red-500">
              {error}
            </p>
          )}

          <form onSubmit={handlePasswordReset} className="space-y-4">
            <input 
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Send Reset Link
            </button>
          </form>
          <p className="text-center mt-4">
            <Link to="/login" className="text-blue-500 hover:text-blue-700 text-sm font-bold">Go back to login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;
