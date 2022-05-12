import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.default.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set(token) {
    axios.default.haeders.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.default.haeders.common.Authorization = '';
  },
};

export const register = createAsyncThunk('auth/register', async credentials => {
  try {
    const { data } = await axios.post('user/signup', credentials);
    token.set(data.token);
    return data;
  } catch (err) {
    //   додати обробку помилки error.massage
  }
});

export const logIn = createAsyncThunk('auth/login', async credentials => {
  try {
    const { data } = await axios.post('/user/login', credentials);
    token.set(data.token);
    return data;
  } catch (err) {
    //   додати обробку помилки error.massage
  }
});

export const logOut = createAsyncThunk('auth/logout', async () => {
  try {
    await axios.post('/user/logout');
    token.unset();
  } catch (err) {
    //   додати обробку помилки error.massage
  }
});
