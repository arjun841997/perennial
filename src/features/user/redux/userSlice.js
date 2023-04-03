import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/userAPI';

const initialState = {
  users: [],
  status: 'idle'
};

export const getUsersAction = createAsyncThunk(
  'user/getUsers',
  async () => {
    const response = await getUsers();
    return response.results;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,  
  reducers: {
    getUsersReducer: (state, action) =>{
      state.users = action.payload
    }
  },  
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUsersAction.fulfilled, (state, action) => {
        state.status = 'idle';        
        state.users = action.payload;
      });
  },
});

export const { getUsersReducer } = userSlice.actions;

export const selectUsers = (state) => state.user.users;
export const isLoading = (state) => state.user.status;

export default userSlice.reducer;
