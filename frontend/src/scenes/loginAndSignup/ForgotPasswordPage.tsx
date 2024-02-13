import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import background from './background.png';

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      axios.post('http://localhost:3001/send-otp', { email })
        .then((response: any) => { // Explicitly stating the type as `any`
          console.log("OTP sent to:", email);
          alert("If the email is registered with us, you will receive an OTP.");
          navigate('/otp-verification');
        })
        .catch((error: any) => { // Explicitly stating the type as `any`
          console.error("Error sending OTP:", error);
          alert("Failed to send OTP. Please try again.");
        });
    };


    return (
        <div className="flex justify-center items-center h-screen bg-no-repeat bg-cover" style={{ backgroundImage: `url(${background})` }}>
          <div className="w-full max-w-md">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h2 className="text-xl font-semibold text-center mb-6">Reset Password</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                />
                <div className="flex justify-between items-center mt-4">
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full p-2 border rounded">
                    Send Reset Link
                  </button>
                </div>
              </form>
              <p className="text-center mt-4">
                Remembered your password? <a href="/login" className="text-blue-500 hover:text-blue-700">Log in</a>
              </p>
            </div>
          </div>
        </div>
      );
    };
    
export default ForgotPasswordPage;



export const OTPInput = () => {
  const [otp, setOtp] = useState('');

  const verifyOtp = async () => {
    // Example function to verify OTP
    console.log(otp);
    // Here you would send the OTP to the backend for verification
  };

  return (
    <div>
      <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
      <button onClick={verifyOtp}>Verify OTP</button>
    </div>
  );
};



export const ResetPassword = () => {
  const [password, setPassword] = useState('');

  const changePassword = async () => {
    // Example function to change password
    console.log(password);
    // Here you would send the new password to the backend for the update
  };

  return (
    <div>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={changePassword}>Change Password</button>
    </div>
  );
};

