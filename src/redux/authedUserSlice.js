import { createSlice } from '@reduxjs/toolkit';

const authedUserSlice = createSlice({
  name: 'authedUser',
  initialState: null,
  reducers: {
    setAuthedUser: (state, action) => {
      return action.payload;
    },
    logoutUser: () => {
      return null;
    },
  },
});

export const { setAuthedUser, logoutUser } = authedUserSlice.actions;
export default authedUserSlice.reducer;
