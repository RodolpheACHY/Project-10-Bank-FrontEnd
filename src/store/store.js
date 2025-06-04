import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/authApi'; // Importez votre API slice
import authReducer from '../features/auth/authSlice'; // Votre slice d'authentification

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer, // Ajoutez le reducer de RTK Query
    auth: authReducer, // Votre slice auth contiendra uniquement l'état du token et l'utilisateur local
  },
  // Active le middleware de cache, d'invalidation et de polling de RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});