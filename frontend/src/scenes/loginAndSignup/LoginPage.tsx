import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';


interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    console.log(email, password);
    onLogin();
  };

  return (
    <div className="flex justify-center items-center h-screen bg-no-repeat bg-cover" style={{ backgroundImage: `url(background.png)` }}> 
    <div className="w-full max-w-lg">
      <h1 className="text-6xl font-bold text-white text-center mb-10">UNIJET</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            pattern=".+@latech\.edu$"
            title="Email must end with @latech.edu"
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
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
        </form>
        <p className="text-center mt-4">
        Don't have an account? <Link to="/signup" className="text-blue-500 hover:text-blue-700">Sign up</Link>
        </p>
      </div>
      </div>
    </div>
  );
};

export default LoginPage;
