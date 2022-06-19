import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
  token: '',
  userInfo: {},
};

const authSlice = createSlice({
  name: 'authen',
  initialState: initialState,
  reducers: {
    getUserToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
  },
});

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
