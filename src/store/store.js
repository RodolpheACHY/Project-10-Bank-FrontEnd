import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/authApi'; // On importe notre API slice
import authReducer from '../features/auth/authSlice'; // On importe notre slice d'authentification

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer, // c'est le reducer de RTK Query
    auth: authReducer, // Ce slice contiendra uniquement l'état du token et l'utilisateur local
  },
  // Active le middleware de cache, d'invalidation et de polling de RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});