import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Définissez votre service API en utilisant un base URL et des "endpoints"
export const authApi = createApi({
    reducerPath: 'authApi', // Nom unique pour ce reducer dans votre store
    baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:3001/api/v1/',
      // Prépare l'en-tête d'autorisation pour toutes les requêtes si un token est présent
      prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token; // Accédez au token depuis le store Redux
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
      },
    }),
    tagTypes: ['User'], // Types de tags pour l'invalidation du cache (utile pour les mutations)
    endpoints: (builder) => ({
      // Endpoint pour la connexion (mutation car cela modifie l'état du serveur)
      login: builder.mutation({
        query: (credentials) => ({ // credentials = { email, password }
          url: 'user/login',
          method: 'POST',
          body: credentials,
        }),
      }),
      // Endpoint pour récupérer le profil utilisateur ()
      getUserProfile: builder.mutation({
        query: () => ({
          url: 'user/profile', // Le token est ajouté par prepareHeaders
          method: 'POST',
        }),
        providesTags: ['User'], // Taguer cette donnée avec 'User' pour l'invalidation,  cela dit à RTK Query que toutes les données étiquetées 'User' sont obsolètes
      }),
      // Endpoint pour mettre à jour le nom de l'utilisateur (mutation)
      updateUserName: builder.mutation({
        query: ({ firstName, lastName }) => ({ // Les informations à envoyer
          url: 'user/profile',
          method: 'PUT',
          body: { firstName, lastName },
        }),
        // Invalidation du cache après la mise à jour pour que getUserProfile se re-déclenche
        invalidatesTags: ['User'],
      }),
    }),
  });
  
  // Exportez les hooks générés automatiquement pour vos endpoints
export const { useLoginMutation, useGetUserProfileMutation, useUpdateUserNameMutation } = authApi;