import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState= {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
  searchTerm: '',
  sortOrder: 'asc',
  viewType: 'list',
};

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  try {
    const response = await axios.get('angular_Response.json');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
});

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setFilteredItems: (state, action) => {
      state.filteredItems = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    toggleSortOrder: (state) => {
      state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
    },
    toggleViewType: (state) => {
      state.viewType = state.viewType === 'list' ? 'grid' : 'list';
    },
    clearSearch: (state) => {
      state.searchTerm = '';
      state.filteredItems = state.items;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching data';
      });
  },
});

export const { 
  setFilteredItems,
  setSearchTerm,
  toggleSortOrder,
  toggleViewType,
  clearSearch 
} = dataSlice.actions;

export default dataSlice.reducer;