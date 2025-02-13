import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  apartments: [],
};

const apartmentReducer = createSlice({
  name: 'apartments',
  initialState,
  reducers: {
    setApartmentsList(state, action) {
      state.apartments = action.payload;
    },
    clearApartments(state) {
      state.apartments = [];
    }
  },
});

export const { setApartmentsList, clearApartments } = apartmentReducer.actions;

export default apartmentReducer.reducer;
