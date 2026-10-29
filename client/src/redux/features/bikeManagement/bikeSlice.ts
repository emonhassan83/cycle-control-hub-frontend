import { createSlice } from "@reduxjs/toolkit";

type TAuthState = {
    bike: null;
  };
  
  const initialState: TAuthState = {
    bike: null,
  };

const bikeSlice = createSlice({
    name: "bike",
    initialState,
    reducers: {
      setBike: (state, action) => {
        const bike = action.payload;
        state.bike = bike;
      }
    },
  });

export const { setBike } = bikeSlice.actions;

export default bikeSlice.reducer;