import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

export const loadingReducer = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      return action.payload;
    },

    reset: () => initialState,
  },
});

export const loading = state => state.loading;
export const { setLoading, reset } = loadingReducer.actions;
export default loadingReducer.reducer;
