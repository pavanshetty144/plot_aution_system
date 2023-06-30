import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

// Async thunk action to handle login
export const fetchPlots = createAsyncThunk(
    'plots/fetchPlots',
    async (_,{rejectWithValue}) => {
      
        try{
           
        return await axios.get(`${process.env.REACT_APP_BASEURL}/getAllPlotsInAuction`)
              
        }
        catch(error){
         return   rejectWithValue(error?.response?.data)
        } 
       
          
      
    }
  );

const plotSlice = createSlice({
    name: 'plots',
    initialState: {
        plots: [],
        isloading: false,
        error: null,
      },
    reducers: {
       
      },
      extraReducers: (builder) => {
        
        builder
        .addCase(fetchPlots.pending, (state) => {
          state.isloading = true;
          state.error = null;
        })
        .addCase(fetchPlots.fulfilled, (state, action) => {
          
          state.isloading = false;
          state.plots = action.payload?.data?.plotList;
          state.error = null;
        })
        .addCase(fetchPlots.rejected, (state, action) => {
          state.isloading = false;
          state.error = action.error.message;
        });
      },
});


export default plotSlice.reducer;