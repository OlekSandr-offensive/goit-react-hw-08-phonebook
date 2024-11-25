import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
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
  tagTypes: ['Contact'],
  endpoints: builder => ({
    fetchContacts: builder.query({
      query: () => '/contacts/',
      providesTags: ['Contact'],
    }),
    addContact: builder.mutation({
      query: ({ name, phone }) => ({
        url: `/contacts/`,
        method: 'POST',
        body: {
          name,
          phone,
        },
      }),
      invalidatesTags: ['Contact'],
    }),
    deleteContacts: builder.mutation({
      query: contactId => ({
        url: `/contacts/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const {
  useAddContactMutation,
  useDeleteContactsMutation,
  useFetchContactsQuery,
} = contactsApi;
