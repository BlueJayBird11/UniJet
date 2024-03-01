import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background from './background.png';
import axios from 'axios';


const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const navigate = useNavigate(); 
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!email.endsWith("@email.latech.edu")) {
        alert("Your email format should be in format <abc000>@email.latech.edu.");
        return;
    }

      axios.post('http://localhost:8000/api/send-otp', { email })
          .then((response) => {
              console.log(response.data.message);
              alert("If the email is registered with us, you will receive an OTP.");
              navigate('/otpverificationpage');
          })
          .catch((error) => {
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
                    SEND
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
