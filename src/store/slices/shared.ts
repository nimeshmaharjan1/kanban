import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface ISharedState {
  isSidebarCollapsed: boolean;
}

// Define the initial state using that type
const initialState: ISharedState = {
  isSidebarCollapsed: false,
};

export const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
    },
  },
});

export const { toggleSidebar } = sharedSlice.actions;

export default sharedSlice.reducer;
