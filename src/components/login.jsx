import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../css/login.css';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID; // Store your Google Client ID in .env

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace local URL with your backend URL
      const response = await axios.post('https://final-project-be-d1bj.onrender.com/api/login', { email, password });
      onLogin(response.data.user);
      navigate('/');
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Login failed');
    }
  };

  const onGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post('https://final-project-be-d1bj.onrender.com/api/google-auth', {
        token: credentialResponse.credential, // `credential` contains the Google JWT
      });
      onLogin(res.data.user);
      navigate('/');
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Google login failed');
    }
  };

  const onGoogleFailure = () => setError('Google login failed');

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="container">
        <h2>Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
          <div className="mt-3">
            <p>WANT TO REGISTER MANUALLY? <Link to="/register">Register</Link></p>
          </div>
        </form>
        <h3>Or login with Google:</h3>
        <GoogleLogin onSuccess={onGoogleSuccess} onError={onGoogleFailure} />
      </div>
    </GoogleOAuthProvider>
  );
}

export default LoginPage;
