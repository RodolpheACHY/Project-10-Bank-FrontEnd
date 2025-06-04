import { createSlice } from '@reduxjs/toolkit';

// Fonction pour récupérer le token initial du localStorage ou sessionStorage
const getInitialToken = () => {
  try {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  } catch (e) {
    console.error("Storage access denied:", e);
    return null;
  }
};

const initialState = {
  token: getInitialToken(),
  user: null, // Les infos user seront stockées ici une fois récupérées
  isAuthenticated: !!getInitialToken(), // Initialisation basée sur le token
  rememberMe: localStorage.getItem('rememberMe') === 'true'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action pour définir le token (appelée après une connexion réussie via RTK Query)
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload; // Met à jour isAuthenticated
      try {
        // Si rememberMe est true, utiliser localStorage, sinon sessionStorage
        if (state.rememberMe) {
          if (action.payload) {
            localStorage.setItem('token', action.payload);
          } else {
            localStorage.removeItem('token');
          }
        } else {
          if (action.payload) {
            sessionStorage.setItem('token', action.payload);
          } else {
            sessionStorage.removeItem('token');
          }
        }
      } catch (e) {
        console.error("Storage access denied:", e);
      }
    },
    // Action pour définir les informations de l'utilisateur (appelée après la récupération du profil)
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setRememberMe: (state, action) => {
      state.rememberMe = action.payload;
      try {
        localStorage.setItem('rememberMe', action.payload);
        // Si on désactive rememberMe, on nettoie le localStorage
        if (!action.payload) {
          localStorage.removeItem('token');
        }
      } catch (e) {
        console.error("Local storage access denied:", e);
      }
    },
    // Action de déconnexion
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      try {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
      } catch (e) {
        console.error("Storage access denied:", e);
      }
    },
  },
});

export const { setToken, setUser, setRememberMe, logout } = authSlice.actions;
export default authSlice.reducer;