import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import background from './background.png'
import { Passenger, Info } from '@/shared/types';
import background from './background.png';

interface LoginPageProps {
  onLogin: (info:Info) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    console.log(email, password);
    const info: Info = {
      email: email,
      passwordHash: password
    }
    onLogin(info);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-no-repeat bg-cover" style={{ backgroundImage: `url(${background})` }}>
      <div className="w-full max-w-lg">
        <h1 className="text-6xl font-bold text-center mb-2 text-white shadow-lg bg-opacity-50 bg-black px-3 py-1 rounded">UNIJET</h1>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-semibold text-center mb-6">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              pattern=".+@email.latech\.edu$"
              title=" abc000@email.latech.edu"
              className="w-full p-2 border rounded"
            />
            <input 
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              className="w-full p-2 border rounded"
            />
            <div className="flex justify-between items-center">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full p-2 border rounded">Login</button>
              </div>
          </form>

          <p className="text-center mt-4">
            Forgot your password? <Link to="/forgot-password" className="text-blue-500 hover:text-blue-700">Reset it</Link>
          </p>

          <p className="text-center mt-4">
            Don't have an account? <Link to="/signup" className="text-blue-500 hover:text-blue-700">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
