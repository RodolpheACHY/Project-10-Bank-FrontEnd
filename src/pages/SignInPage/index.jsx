import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../services/authApi';
import { setToken, setRememberMe } from '../../features/auth/authSlice';

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const rememberMe = useSelector((state) => state.auth.rememberMe);
  const token = useSelector((state) => state.auth.token);

  const [login, { isLoading, error }] = useLoginMutation();
  
  useEffect(() => {
    if (isAuthenticated && token) {
      console.log('Redirection vers le profil après connexion réussie');
      navigate('/profile');
    }
  }, [isAuthenticated, token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
      if (result?.body?.token) {
        dispatch(setToken(result.body.token));
      }
    } catch (err) {
      console.error('Failed to login:', err);
    }
  };

  return (
    <div className="main-content bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => dispatch(setRememberMe(e.target.checked))}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button" disabled={isLoading}>
            Sign In
          </button>
          {error && (
            <div className="error-message" style={{ color: 'red', marginTop: '1rem' }}>
              Invalid email or password. Please try again.
            </div>
          )}
        </form>
      </section>
    </div>
  );
}

export default SignInPage;