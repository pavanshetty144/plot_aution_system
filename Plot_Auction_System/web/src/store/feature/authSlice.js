import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

// Async thunk action to handle login
export const loginAsync = createAsyncThunk(
    'auth/loginAsync',
    async ({ username, password }, {rejectWithValue}) => {
      
        try{
            
        return await axios.post(`${process.env.REACT_APP_BASEURL}/login`, {
                username: username,
                password: password
              })
              
        }
        catch(error){
         return   rejectWithValue(error?.response?.data)
        } 
       
          
      
    }
  );

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null,
    },
    reducers: {
        logout: (state) => {
          state.isAuthenticated = false;
          state.user = null;
        },
      },
      extraReducers: (builder) => {
        builder
          .addCase(loginAsync.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(loginAsync.fulfilled, (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload.data.username;
            state.error = null;
            
          })
          .addCase(loginAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.error = action.payload.error;
          });
      },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;