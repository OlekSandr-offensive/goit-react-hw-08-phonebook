import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Auth'],
  endpoints: build => ({
    fetchCurrentUser: build.query({
      query: () => '/users/current',
      providesTags: ['Auth'],
    }),
    logIn: build.mutation({
      query(credentials) {
        return {
          url: '/users/login',
          method: 'POST',
          body: credentials,
        };
      },
      invalidatesTags: ['Auth'],
    }),
    register: build.mutation({
      query(credentials) {
        return {
          url: '/users/signup',
          method: 'POST',
          body: credentials,
        };
      },
      invalidatesTags: ['Auth'],
    }),
    logOut: build.mutation({
      query() {
        return {
          url: '/users/logout',
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

// import axios from 'axios';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { alert, defaultModules } from '@pnotify/core';
// import '@pnotify/core/dist/PNotify.css';
// import * as PNotifyMobile from '@pnotify/mobile';
// import '@pnotify/mobile/dist/PNotifyMobile.css';

// axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

// const token = {
//   set(token) {
//     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//   },
//   unset() {
//     axios.defaults.headers.common.Authorization = '';
//   },
// };

// export const register = createAsyncThunk('auth/register', async credentials => {
//   try {
//     const { data } = await axios.post('users/signup', credentials);
//     token.set(data.token);
//     return data;
//   } catch (error) {
//     defaultModules.set(PNotifyMobile, {});
//     alert({
//       text: `Не вдалося зареєструватися`,
//     });
//   }
// });

// export const logIn = createAsyncThunk('auth/login', async credentials => {
//   try {
//     const { data } = await axios.post('/users/login', credentials);
//     token.set(data.token);
//     return data;
//   } catch (error) {
//     defaultModules.set(PNotifyMobile, {});
//     alert({
//       text: `Не вдалося авторизуватися`,
//     });
//   }
// });

// export const logOut = createAsyncThunk('auth/logout', async () => {
//   try {
//     await axios.post('/users/logout');
//     token.unset();
//   } catch (error) {
//     defaultModules.set(PNotifyMobile, {});
//     alert({
//       text: `Не вдалося вийти з облікового запису, текст помилки ${error}`,
//     });
//   }
// });

// export const fetchCurrentUser = createAsyncThunk(
//   'auth/refresh',
//   async (_, thunkAPI) => {
//     const state = thunkAPI.getState();
//     const persistedToken = state.auth.token;

//     if (persistedToken === null) {
//       return thunkAPI.rejectWithValue();
//     }

//     token.set(persistedToken);
//     try {
//       const { data } = await axios.get('/users/current');
//       return data;
//     } catch (error) {
//       defaultModules.set(PNotifyMobile, {});
//       alert({
//         text: `Не вдалося отримати дані користувача`,
//       });
//     }
//   }
// );
