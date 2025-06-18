import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../Footer';
import MainNav from '../MainNav';
import UserNav from '../UserNav';
import { useGetUserProfileQuery, authApi } from '../../services/authApi';
import { setUser, logout, setToken, initializeAuth } from '../../features/auth/authSlice';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { initialized } = useSelector((state) => state.auth);
  const { isAuthenticated, token, user } = useSelector((state) => state.auth);

  const protectedRoutes = ['/profile'];
  const isProtectedRoute = protectedRoutes.includes(location.pathname);

  // RTK Query hook pour récupérer le profil utilisateur
  const { 
    data: userProfileData,
    isLoading: isProfileLoading,
    error: profileError,
    isSuccess: isProfileSuccess
  } = useGetUserProfileQuery(undefined, {
    skip: !token || !isAuthenticated,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  console.log('État du profil:', {
    hasToken: !!token,
    isProfileLoading,
    isProfileSuccess,
    hasUserData: !!userProfileData,
    hasUser: !!user,
    profileError
  });

  // Effet pour vérifier le token dans sessionStorage
  useEffect(() => {
    if (!token && initialized) {
      const rememberMe = localStorage.getItem('rememberMe') === 'true';
      const storedToken = rememberMe 
        ? localStorage.getItem('token')
        : sessionStorage.getItem('token') || sessionStorage.getItem('tempToken');
      
      if (storedToken && storedToken !== token) {
        console.log('Token trouvé dans le stockage, mise à jour du store...');
        dispatch(setToken(storedToken));
      }
    }
  }, [dispatch, token, initialized]);

  // Effet pour mettre à jour le user dans le store
  useEffect(() => {
    if (userProfileData?.body) {
      console.log('Mise à jour du profil utilisateur:', userProfileData.body);
      dispatch(setUser(userProfileData.body));
    }
  }, [userProfileData, dispatch]);

  // Effet pour gérer les erreurs d'authentification
  useEffect(() => {
    if (profileError?.status === 401 && token) {
      console.log('Erreur 401 - Déconnexion...');
      dispatch(logout());
      dispatch(authApi.util.resetApiState());
      navigate('/');
    }
  }, [profileError, dispatch, navigate, token]);

  // Effet pour nettoyer les tokens après déconnexion
  useEffect(() => {
    if (location.pathname === '/' && !isAuthenticated && !token && initialized) {
      console.log('Nettoyage des tokens après déconnexion');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('tempToken');
      localStorage.removeItem('token');
    }
  }, [isAuthenticated, token, location.pathname, initialized]);

  // Effet pour la redirection sur les routes protégées
  useEffect(() => {
    if (isProtectedRoute && initialized) {
      const checkAuth = async () => {
        if (isAuthenticated && user) {
          console.log('Utilisateur authentifié et profil chargé');
          return;
        }

        const rememberMe = localStorage.getItem('rememberMe') === 'true';
        const storedToken = rememberMe 
          ? localStorage.getItem('token')
          : sessionStorage.getItem('token') || sessionStorage.getItem('tempToken');

        if (storedToken && !token) {
          console.log('Token trouvé, mise à jour du store...');
          await dispatch(setToken(storedToken));
          return;
        }

        if (!storedToken && !token && !isProfileLoading) {
          console.log('Redirection vers la page d\'accueil - Non authentifié');
          navigate('/');
        }
      };

      checkAuth();
    }
  }, [isProtectedRoute, token, isAuthenticated, user, isProfileLoading, navigate, dispatch, initialized]);

  // Initialisation de l'authentification
  useEffect(() => {
    if (!initialized) {
      dispatch(initializeAuth());
    }
  }, [dispatch, initialized]);

  // Écran de chargement pendant l'initialisation
  if (!initialized) {
    return (
      <div className='layout'>
        <MainNav />
        <main className='main-content'>
          <div className="main bg-dark">
            <div className="header">
              <h1>Loading App...</h1>
            </div>
          </div> 
        </main>
        <Footer />
      </div>
    );
  }

  // Écran de chargement pendant le chargement du profil
  const hasValidToken = token || sessionStorage.getItem('tempToken');
  if (hasValidToken && !user && !profileError && isProfileLoading) {
    console.log('Loading profile...', { 
      hasToken: !!token, 
      hasTempToken: !!sessionStorage.getItem('tempToken'),
      hasUser: !!user,
      profileError,
      isProfileLoading,
      isProfileSuccess,
      hasUserData: !!userProfileData
    });
    return (
      <div className='layout'>
        <MainNav />
        <main className='main-content'>
          <div className="main bg-dark">
            <div className="header">
              <h1>Loading your Profile...</h1>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Rendu du layout principal
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