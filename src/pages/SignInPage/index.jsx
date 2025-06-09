import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../services/authApi';
import { setToken } from '../../features/auth/authSlice';

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [login, { isLoading, error, isSuccess, data: loginData }] = useLoginMutation();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isSuccess && loginData?.body?.token) {
      const token = loginData.body.token;
      dispatch(setToken(token));
    }
  }, [isSuccess, loginData, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password }).unwrap();
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
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button" disabled={isLoading}>
            Sign In
          </button>
          {error && (
            <div className="error-message" style={{ color: 'red', marginTop: '1rem' }}>
              {error.data?.message || 'An error occurred during sign in'}
            </div>
          )}
        </form>
      </section>
    </div>
  );
}

export default SignInPage;