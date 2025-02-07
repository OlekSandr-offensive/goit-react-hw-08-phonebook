import { createSlice } from '@reduxjs/toolkit';
import { authApi } from './auth-operation';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isFetchingCurrentUser: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    unsubscribe(state) {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(authApi.endpoints.fetchCurrentUser.matchPending, state => {
        state.isFetchingCurrentUser = true;
      })
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.data.user;
          state.token = payload.data.token;
          state.isLoggedIn = false;
        }
      )
      .addMatcher(
        authApi.endpoints.logIn.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.data.user;
          state.token = payload.data.token;
          state.isLoggedIn = true;
        }
      )
      .addMatcher(authApi.endpoints.logOut.matchFulfilled, state => {
        state.token = null;
        state.user = { name: null, email: null };
        state.isLoggedIn = false;
      })
      .addMatcher(
        authApi.endpoints.fetchCurrentUser.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.data.user;
          state.isLoggedIn = true;
          state.isFetchingCurrentUser = false;
        }
      )
      .addMatcher(authApi.endpoints.fetchCurrentUser.matchRejected, state => {
        state.isFetchingCurrentUser = false;
      });
  },
});

export default authSlice.reducer;

// Action
export const { unsubscribe } = authSlice.actions;
