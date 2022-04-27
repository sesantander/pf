import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  id: null,
  isAuth: false,
  photoURL: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.email;
      state.id = action.payload.id;
      state.isAuth = true;
      state.photoURL=action.payload.photoURL;
    },
  },
});

// Action creators are generated for each case reducer function

export const userActions = userSlice.actions;

export default userSlice.reducer;
