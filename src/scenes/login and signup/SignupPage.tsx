import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginSignup.css';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState(''); // dob for date of birth
  const [campusId, setCampusId] = useState('');

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
    // Here you would normally send this data to the backend
    console.log({
      email,
      password,
      confirmPassword,
      fullName,
      dob,
      campusId
    });
  };

  return (
    <div className="center-container">
      <h1 className="unijet-title">UNIJET</h1>
      <div className="background-pattern"></div>
      <div className="auth-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter your Full-Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <label htmlFor="dob" className="label">Enter your date of birth here: </label>
          <input
            type="date"
            id="dob"
            className="dob-input"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter your campus ID"
            value={campusId}
            onChange={(e) => setCampusId(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
