// src/layout/Layout.jsx
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../Footer';
import MainNav from '../MainNav';
import UserNav from '../UserNav';
import { useGetUserProfileMutation, authApi } from '../../services/authApi';
import { setUser, logout } from '../../features/auth/authSlice';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);

  const protectedRoutes = ['/profile'];
  const isProtectedRoute = protectedRoutes.includes(location.pathname);

  const [
    triggerGetUserProfile,
    { isLoading: isProfileLoading, data: userProfileData }
  ] = useGetUserProfileMutation();

  // Effet pour mettre à jour le user dans le store quand on reçoit les données
  useEffect(() => {
    if (userProfileData && userProfileData.body) {
      dispatch(setUser(userProfileData.body));
    }
  }, [userProfileData, dispatch]);

  // Effet principal pour gérer l'authentification et le chargement du profil
  useEffect(() => {
    const loadUserProfile = async () => {
      if (token && !user && !isProfileLoading) {
        try {
          await triggerGetUserProfile().unwrap();
        } catch (error) {
          if (error?.status === 401) {
            dispatch(logout());
            dispatch(authApi.util.resetApiState());
            navigate('/sign-in');
          }
        }
      }
    };

    loadUserProfile();
  }, [token, user, isProfileLoading, location.pathname, triggerGetUserProfile, dispatch, navigate]);

  // Effet pour la redirection si non authentifié sur route protégée
  useEffect(() => {
    if (isProtectedRoute && !isAuthenticated && !token && !isProfileLoading) {
      navigate('/sign-in');
    }
  }, [isAuthenticated, token, isProfileLoading, isProtectedRoute, navigate]);

  // Affichage du loading pendant le chargement du profil
  if (token && !user && isProfileLoading) {
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