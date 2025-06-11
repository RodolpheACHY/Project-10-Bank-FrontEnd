import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage
import { authApi } from '../services/authApi'; // On importe notre API slice
import authReducer from '../features/auth/authSlice'; // On importe notre slice d'authentification

// Configuration de Redux Persist
const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['rememberMe'] // On ne persiste QUE rememberMe par défaut
};

// Création du reducer persistant
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer, // c'est le reducer de RTK Query
    auth: persistedAuthReducer, // Ce slice contiendra uniquement l'état du token et l'utilisateur local
  },
  // Active le middleware de cache, d'invalidation et de polling de RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Nécessaire pour Redux Persist
      },
    }).concat(authApi.middleware),
});

export const persistor = persistStore(store);