// slices/pinSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useEffect } from 'react';
// Async thunk for fetching pins
export const fetchPins = createAsyncThunk('pin/fetchPins', async (_, thunkAPI) => {
     const response = await fetch("http://localhost:3000/api/pin");
  const pinsJson = await response.json();
  await thunkAPI.dispatch(setPinsJson(pinsJson));
  // console.log(state.pinsJson)
 
  return pinsJson;
});

const pinSlice = createSlice({
  name: 'pin',
  initialState: {
    pinStatus: null,
    loading: false,
    pinsJson: [12222,12222],
    pin: 12389, // Initialize pinsJson to null

  },
  reducers: {
    setPinStatus: (state, action) => {
      state.pinStatus = action.payload;
    },
    setPinsJson: (state, action) => {
      state.pinsJson = action.payload;
    },
    
    setPin: (state, action) => {
      state.pin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPins.pending, (state, action) => {
        // state.pinsJson = action.payload;

        state.loading = true;
      })
      .addCase(fetchPins.fulfilled, (state, action) => {
        state.loading = false;
        // state.pinsJson = action.payload;

        state.pinStatus = true;
        // console.log(state.pinsJson)
       
        
    })
      .addCase(fetchPins.rejected, (state) => {
        state.loading = false;
      });
  },
});


export const { setPinStatus, setPinsJson, setPin } = pinSlice.actions;
export default pinSlice.reducer;


