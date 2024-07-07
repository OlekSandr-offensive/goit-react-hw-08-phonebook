import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://phonebook-hw88.onrender.com/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Auth'],
  endpoints: builder => ({
    fetchCurrentUser: builder.query({
      query: () => '/auth/current',
      providesTags: ['Auth'],
    }),
    logIn: builder.mutation({
      query(credentials) {
        return {
          url: '/auth/login',
          method: 'POST',
          body: credentials,
        };
      },
      invalidatesTags: ['Auth'],
    }),
    register: builder.mutation({
      query(credentials) {
        return {
          url: '/auth/register',
          method: 'POST',
          body: credentials,
        };
      },
      invalidatesTags: ['Auth'],
    }),
    logOut: builder.mutation({
      query() {
        return {
          url: '/auth/logout',
          method: 'POST',
        };
      },
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {
  useFetchCurrentUserQuery,
  useLogInMutation,
  useRegisterMutation,
  useLogOutMutation,
} = authApi;
