import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
  token: '',
  userInfo: {},
};

const authSlice = createSlice({
  name: 'authen',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      });
  },
});

export const fetchLogin = createAsyncThunk(
  'user/fetchLogin',
  async userData => {
    const res = await fetch('http://svcy3.myclass.vn/api/Users/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!res.ok) {
      // const errorData = await res.json();
      // console.log(errorData.message);
      // throw new Error('Something went wrong!');
      console.log('Something went wrong!');
      throw new Error('Something went wrong!');
    }
    const json = await res.json();
    return json.content.accessToken;
  },
);

export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (arg, {getState}) => {
    const res = await fetch('http://svcy3.myclass.vn/api/Users/getProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().authen.token}`,
      },
    });
    const json = await res.json();
    return json.content;
  },
);

export default authSlice;
