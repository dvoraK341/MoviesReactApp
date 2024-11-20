import { Item } from "./item";

export interface ItemsState {
    items: Item[];
    error: string | null;
    loading: boolean;
    searchQuery: string;
    sortOrder: 'asc' | 'desc';
    viewMode: 'list' | 'grid';
    selectedType: string; 
  }