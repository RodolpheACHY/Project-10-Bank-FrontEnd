import { createRoot } from 'react-dom/client'
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
import { initializeAuth } from './features/auth/authSlice';
import './index.css'
import App from './App.jsx'

// Initialiser l'authentification au démarrage avec un délai minimal
setTimeout(() => {
  store.dispatch(initializeAuth());
}, 100); // Délai minimal pour voir le loading

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);