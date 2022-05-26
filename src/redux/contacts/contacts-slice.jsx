import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import { logOut } from '../auth/auth-operation';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['contact'],
  endpoints: builder => ({
    addContact: builder.mutation({
      query: ({ name, number }) => ({
        url: `/contacts/`,
        method: 'POST',
        body: {
          name,
          number,
        },
      }),
      invalidatesTags: ['contact'],
    }),
    deleteContacts: builder.mutation({
      query: contactId => ({
        url: `/contacts/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['contact'],
    }),
  }),
});

export const fetchAllContacts = createAsyncThunk('contacts', async () => {
  try {
    const { data } = await axios.get('/contacts');
    return data;
  } catch (error) {
    alert({
      text: `Не вдалося отримати контакти`,
    });
  }
});

const initialState = {
  contacts: [],
};

export const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: {
    [logOut.fulfilled](state) {
      state.contacts = [];
    },
    [fetchAllContacts.fulfilled.type](state, { payload }) {
      state.contacts = payload;
    },
  },
});

export const { useAddContactMutation, useDeleteContactsMutation } = contactsApi;
