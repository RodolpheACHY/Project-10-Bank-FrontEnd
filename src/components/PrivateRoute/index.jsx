import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth);

  // Layout gère déjà l'initialisation, pas besoin de vérifier ici
  // Si pas authentifié, rediriger vers la page de connexion
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  // Si authentifié, afficher le composant enfant
  return children;
};

export default PrivateRoute; 