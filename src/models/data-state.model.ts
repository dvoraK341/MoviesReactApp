export interface DataState {
    items: any[];
    filteredItems: any[];
    loading: boolean;
    error: string | null;
    searchTerm: string;
    sortOrder: 'asc' | 'desc';
    viewType: 'list' | 'grid';
}