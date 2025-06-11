import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
  rememberMe: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
      
      if (action.payload) {
        // Si rememberMe est true, on sauvegarde dans localStorage
        if (state.rememberMe) {
          localStorage.setItem('token', action.payload);
          sessionStorage.removeItem('token');
        } else {
          // Sinon dans sessionStorage
          sessionStorage.setItem('token', action.payload);
          localStorage.removeItem('token');
        }
      } else {
        // Si pas de token, on nettoie les deux storages
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
      }
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setRememberMe: (state, action) => {
      state.rememberMe = action.payload;
      
      // Si on change rememberMe et qu'on a un token, on le déplace
      if (state.token) {
        if (action.payload) {
          // Si on active rememberMe, on déplace vers localStorage
          localStorage.setItem('token', state.token);
          sessionStorage.removeItem('token');
        } else {
          // Si on désactive rememberMe, on déplace vers sessionStorage
          sessionStorage.setItem('token', state.token);
          localStorage.removeItem('token');
        }
      }
    },
    logout: (state) => {
      // On nettoie le state
      Object.assign(state, {
        ...initialState,
        rememberMe: state.rememberMe // On garde la préférence rememberMe
      });
      
      // On nettoie les deux storages
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    },
    // Nouvelle action pour initialiser le token depuis le storage approprié
    initializeFromStorage: (state) => {
      const token = state.rememberMe 
        ? localStorage.getItem('token')
        : sessionStorage.getItem('token');
      
      if (token) {
        state.token = token;
        state.isAuthenticated = true;
      }
    }
  },
});

export const { setToken, setUser, setRememberMe, logout, initializeFromStorage } = authSlice.actions;
export default authSlice.reducer;