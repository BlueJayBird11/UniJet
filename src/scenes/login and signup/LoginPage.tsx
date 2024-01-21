import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginSignup.css';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // Here you would normally authenticate against the backend
    console.log(email, password);
    onLogin();
  };

  const loginPageStyle = {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to right, red, blue)', // Gradient background
  };

  return (
    <div className="center-container">
       <div className="background-pattern"></div>
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            pattern=".+@latech\.edu$"
            title="Email must end with @latech.edu"
          />
          <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
