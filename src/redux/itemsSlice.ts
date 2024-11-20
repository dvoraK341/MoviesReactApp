import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Item } from '../models/item';
import { ItemsState } from '../models/ItemsState';

const initialState: ItemsState = {
  items: [],
  error: null,
  loading: false,
  searchQuery: '',
  sortOrder: 'asc',
  viewMode: 'list',
  selectedType: 'All',
};

export const fetchItems =  createAsyncThunk<Item[], void>('items/fetchItems', async () => {
  try {
    const response = await axios.get('/data.json'); 
    return response.data.results.map((item: any) => ({
      Title: item.Title,
      Year: item.Year.trim(), 
      imdbID: item.imdbID,
      Type: item.Type,
      Poster: item.Poster === 'N/A' ? null : item.Poster
    }));
  } catch (error) {
    throw new Error('Failed to fetch items');
  }
});

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSortOrder: (state) => {
      state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
    },
    setViewMode: (state) => {
      state.viewMode = state.viewMode === 'list' ? 'grid' : 'list';
    },
    setSelectedType: (state, action) => {
      state.selectedType = action.payload;
    },
    updateItemName: (state, action) => {
      const { imdbID, newTitle } = action.payload;
      const item = state.items.find(item => item.imdbID === imdbID);
      if (item && item.Title !== newTitle) {
        fetch(`angular_Response.json/${imdbID}`, {
          method: 'PUT',
          body: JSON.stringify({ Title: newTitle }),
          headers: { 'Content-Type': 'application/json' },
        });
        item.Title = newTitle;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export const { setSearchQuery, setSortOrder, setViewMode,setSelectedType, updateItemName } = itemsSlice.actions;
export default itemsSlice.reducer;
