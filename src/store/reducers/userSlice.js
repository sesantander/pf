import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  id: null,
  isAuth: false,
  photoURL: null,
  balance: null,
  role: null,
  token: null,
  web3: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.username;
      state.id = action.payload.id;
      state.isAuth = true;
      state.photoURL = action.payload.photoURL;
      state.balance = action.payload.balance;
      state.address = action.payload.address;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.web3 = action.payload.web3;
    },
  },
});

// Action creators are generated for each case reducer function

export const userActions = userSlice.actions;

export default userSlice.reducer;
