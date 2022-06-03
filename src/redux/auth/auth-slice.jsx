import { createSlice } from '@reduxjs/toolkit';
// import { register, logIn, logOut, fetchCurrentUser } from './auth-operation';
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
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.fetchCurrentUser.matchPending,
      state => {
        state.isFetchingCurrentUser = true;
      }
    );
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
      }
    );
    builder.addMatcher(
      authApi.endpoints.logIn.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.user;
        state.isLoggedIn = true;
      }
    );
    builder.addMatcher(authApi.endpoints.logOut.matchFulfilled, state => {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
    });
    builder.addMatcher(
      authApi.endpoints.fetchCurrentUser.matchPending,
      state => {
        state.isFetchingCurrentUser = true;
      }
    );
    builder.addMatcher(
      authApi.endpoints.fetchCurrentUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
        state.isLoggedIn = true;
        state.isFetchingCurrentUser = false;
      }
    );
    builder.addMatcher(
      authApi.endpoints.fetchCurrentUser.matchRejected,
      state => {
        state.isFetchingCurrentUser = false;
      }
    );

    // [register.fulfilled](state, { payload }) {
    //   state.user = payload.user;
    //   state.token = payload.token;
    //   state.isLoggedIn = true;
    // },
    // [logIn.fulfilled](state, { payload }) {
    //   state.user = payload.user;
    //   state.token = payload.token;
    //   state.isLoggedIn = true;
    // },
    // [logOut.fulfilled](state) {
    //   state.user = { name: null, email: null };
    //   state.token = null;
    //   state.isLoggedIn = false;
    // },
    // [fetchCurrentUser.pending](state) {
    //   state.isFetchingCurrentUser = true;
    // },
    // [fetchCurrentUser.fulfilled](state, { payload }) {
    //   state.user = { ...payload };
    //   state.isLoggedIn = true;
    //   state.isFetchingCurrentUser = false;
    // },
    // [fetchCurrentUser.rejected](state) {
    //   state.isFetchingCurrentUser = false;
    // },
  },
});

export default authSlice.reducer;
