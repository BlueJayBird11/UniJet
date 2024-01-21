import React, { FormEvent, useState } from 'react';
import './LoginSignup.css';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState('');
  const [campusId, setCampusId] = useState('');

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
    // Here you would normally send this data to the backend
    console.log(email, password, username, dob, campusId);
    // For now we'll just clear the form
    setEmail('');
    setPassword('');
    setUsername('');
    setDob('');
    setCampusId('');
  };

  return (
    <div className="center-container">
      <div className="auth-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
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
          <input 
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
          <input 
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required 
          />
          <input 
            type="text"
            placeholder="Campus ID"
            value={campusId}
            onChange={(e) => setCampusId(e.target.value)}
            required 
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
