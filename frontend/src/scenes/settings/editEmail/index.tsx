import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid'; 
import { Passenger } from '@/shared/types';

type Props = {
  passenger: Passenger;
}

const EditEmail = ({passenger}: Props) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [navigateBack, setNavigateBack] = useState(false);

  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);


  const validateEmail = (email: string): boolean => {
    return email.endsWith('@email.latech.edu');
  };

  const sendOtp = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        setSuccess(data.message);
      } else {
        throw new Error(data.error);
      }
    } catch (error:any) {
      setError(`Failed to send OTP: ${error.message}`);
    }
  };
  
    const verifyOtp = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/verify-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, otp }),
        });
    
        const data = await response.json();
        if (response.ok) {
          await changeEmail();
        } else {
          throw new Error(data.error);
        }
      } catch (error:any) {
        setError(`OTP Verification failed: ${error.message}`);
      }
    };
  

  const changeEmail = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/settings/email/${passenger.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email": email }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      passenger.email = email;
      setSuccess('Email updated successfully!');
      setTimeout(() => {
        setSuccess('');
        setNavigateBack(true);
      }, 3000);

    } catch (error: any) {
      console.error('Error:', error);
      setError(`Failed to update email: ${error.message}`);
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!validateEmail(email)) {
      setError('Email must end with @email.latech.edu');
      return;
    }
  
    if (!otpSent) {
      await sendOtp();
    } else {
      await verifyOtp();
    }
  };
  

  
  if (navigateBack) {
    window.history.back(); 
  }

  return (
    <>
      <div className="bg-gray-600 text-primary-black py-5 px-6 flex items-center justify-between">
      <Link to="/settings" className="mr-4">
        <ChevronLeftIcon className="h-6 w-6" />
      </Link>
      <div className="flex-grow flex items-center justify-center"> 
        <h1 className="text-xl text-primary-black font-bold mr-10">Change Email</h1>
      </div>
    </div>
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-primary-black text-xl mb-2" htmlFor="email">
              New Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your new email"
              value={email}
              onChange={handleChange}
            />

          {
            otpSent && (
              <div className="mb-4">
                <label className="block text-primary-black text-xl mb-2" htmlFor="otp">
                  OTP
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="otp"
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            )
          }

          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          {success && <p className="text-green-500 text-xs italic">{success}</p>}
          </div>
          <div className="flex justify-center">
            <button
              className="bg-settingsButtons hover:bg-settingsButtonsPressed text-primary-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Change Email
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditEmail;
