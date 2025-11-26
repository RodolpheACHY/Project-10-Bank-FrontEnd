import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// On définit notre service API en utilisant une base URL et des "endpoints"
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
      baseUrl: import.meta.env.VITE_API_URL,
      // Prépare l'en-tête d'autorisation pour toutes les requêtes si un token est présent
      prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token; // Accédez au token depuis le store Redux
        if (token) {
          console.log('Token utilisé pour la requête:', token);
          headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
      },
    }),
    tagTypes: ['User'], 
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
      getUserProfile: builder.query({
        query: () => {
          console.log('Requête de profil utilisateur envoyée');
          return {
            url: 'user/profile',
            method: 'POST',
          };
        },
        transformResponse: (response) => {
          console.log('Réponse du profil reçue:', response);
          return response;
        },
        transformErrorResponse: (error) => {
          console.log('Erreur du profil:', error);
          return error;
        },
        providesTags: ['User'], // Taguer cette donnée avec 'User' pour l'invalidation,  cela dit à RTK Query que toutes les données étiquetées 'User' sont obsolètes 
      }),
      // Endpoint pour mettre à jour le nom de l'utilisateur (mutation)
      updateUserName: builder.mutation({
        query: ({ firstName, lastName }) => ({
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
export const { useLoginMutation, useGetUserProfileQuery, useUpdateUserNameMutation } = authApi;
