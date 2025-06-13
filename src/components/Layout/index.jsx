// src/layout/Layout.jsx
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../Footer';
import MainNav from '../MainNav';
import UserNav from '../UserNav';
import { useGetUserProfileQuery, authApi } from '../../services/authApi';
import { setUser, logout, setToken } from '../../features/auth/authSlice';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, token, user } = useSelector((state) => state.auth);

  const protectedRoutes = ['/profile'];
  const isProtectedRoute = protectedRoutes.includes(location.pathname);

  const { 
    data: userProfileData,
    isLoading: isProfileLoading,
    error: profileError
  } = useGetUserProfileQuery(undefined, {
    // on Skip la requête si pas de token
    skip: !token,
    // Refetch toutes les 30 secondes si la page est active
    pollingInterval: 30000
  });

  // Effet pour vérifier le token dans sessionStorage
  useEffect(() => {
    if (!token) {
      const sessionToken = sessionStorage.getItem('tempToken');
      if (sessionToken) {
        dispatch(setToken(sessionToken));
      }
    }
  }, [dispatch, token]);

  // Effet pour mettre à jour le user dans le store quand on reçoit les données
  useEffect(() => {
    if (userProfileData?.body) {
      dispatch(setUser(userProfileData.body));
    }
  }, [userProfileData, dispatch]);

  // Effet pour gérer les erreurs d'authentification
  useEffect(() => {
    if (profileError?.status === 401) {
      dispatch(logout());
      dispatch(authApi.util.resetApiState());
      navigate('/sign-in');
    }
  }, [profileError, dispatch, navigate]);

  // Effet pour la redirection si non authentifié sur route protégée
  useEffect(() => {
    if (isProtectedRoute && !isAuthenticated && !token && !sessionStorage.getItem('tempToken') && !isProfileLoading) {
      navigate('/sign-in');
    }
  }, [isAuthenticated, token, isProfileLoading, isProtectedRoute, navigate]);

  // Affichage du loading pendant le chargement du profil
  if ((token || sessionStorage.getItem('tempToken')) && !user && isProfileLoading) {
    return (
      <div className='layout'>
        <MainNav />
        <main className='main-content'>
          <p>Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className='layout'>
      {isAuthenticated && user ? <UserNav /> : <MainNav />}
      <main className='main-content'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;