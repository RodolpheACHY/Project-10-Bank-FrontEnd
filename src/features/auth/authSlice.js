import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    isAuthenticated: false,
    rememberMe: localStorage.getItem('rememberMe') === 'true',
    initialized: false
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
      
      if (action.payload) {
        if (state.rememberMe) {
          localStorage.setItem('token', action.payload);
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('tempToken');
        } else {
          sessionStorage.setItem('token', action.payload);
          localStorage.removeItem('token');
        }
      } else {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('tempToken');
      }
    },
    setUser: (state, action) => {
      console.log('setUser appelé avec:', action.payload);
      state.user = action.payload;
      // Ne pas modifier isAuthenticated ici
    },
    setRememberMe: (state, action) => {
      state.rememberMe = action.payload;
      localStorage.setItem('rememberMe', action.payload);
      
      if (state.token) {
        if (action.payload) {
          localStorage.setItem('token', state.token);
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('tempToken');
        } else {
          sessionStorage.setItem('token', state.token);
          localStorage.removeItem('token');
        }
      }
    },
    logout: (state) => {
      console.log('Déconnexion explicite - Nettoyage complet');
      
      // Nettoyer le state Redux
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      
      // Pour un logout explicite, toujours nettoyer tous les tokens
      // Le rememberMe ne concerne que la fermeture du navigateur, pas un logout volontaire
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('tempToken');
      console.log('Logout explicite - Tous les tokens supprimés');
    },
    initializeAuth: (state) => {
      if (state.initialized) return;
      
      const rememberMe = localStorage.getItem('rememberMe') === 'true';
      const token = rememberMe 
        ? localStorage.getItem('token')
        : sessionStorage.getItem('token') || sessionStorage.getItem('tempToken');

      if (token) {
        state.token = token;
        state.isAuthenticated = true;
      }
      
      state.rememberMe = rememberMe;
      state.initialized = true;
    }
  },
});

export const { setToken, setUser, setRememberMe, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;