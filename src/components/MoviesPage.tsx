import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, TextField, Button, CircularProgress, Typography, Tab, Tabs, Box } from '@mui/material';
import { AppDispatch, RootState } from '../redux/store';
import { fetchItems, setSearchQuery, setSortOrder, setViewMode, setSelectedType, updateItemName } from '../redux/itemsSlice';
import ItemCard from './ItemCard';
import ItemDetails from './ItemDetails';

const MoviesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, searchQuery, sortOrder, viewMode, selectedType } = useSelector(
    (state: RootState) => state.items
  );

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleSort = () => {
    dispatch(setSortOrder());
  };

  const handleViewToggle = () => {
    dispatch(setViewMode());
  };

  const handleClearSearch = () => {
    dispatch(setSearchQuery(''));
  };

  const handleRefresh = () => {
    dispatch(fetchItems());
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    dispatch(setSelectedType(newValue));
  };

  const filteredItems = items
    .filter((item) =>
      item.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.Year.toString().includes(searchQuery)
    )
    .filter((item) => selectedType === 'All' || item.Type === selectedType)
    .sort((a, b) => (sortOrder === 'asc' ? a.Title.localeCompare(b.Title) : b.Title.localeCompare(a.Title)));

  const types = Array.from(new Set(items.map(item => item.Type)));

  const handleItemNameChange = (imdbID: string, newTitle: string) => {
    dispatch(updateItemName({ imdbID, newTitle }));
  };

  return (
    <Container>
      <div style={{ marginTop: '20px', display: 'flex' }}>
        <Box sx={{
          padding: 0,  
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          marginRight: '60px',
          marginTop :'80px'
        }}>
          <Tabs
            value={selectedType}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="Types Tabs"
            orientation="vertical"
            style={{ width: '200px'}}
          >
            <Tab label={`All (${items.length})`} value="All" />
            {types.map((type) => (
              <Tab label={`${type} (${items.filter(item => item.Type === type).length})`} value={type} key={type} />
            ))}
          </Tabs>

          <Button
            variant="outlined"
            onClick={handleViewToggle}
            fullWidth
            sx={{ marginTop: 1 }}
          >
            Toggle View ({viewMode})
          </Button>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Grid style={{
                display: 'flex', justifyContent: 'center', alignItems:'center', marginBottom:'24px'
              
          }} container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Search by title or year"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearch}
                id="outlined-basic" 
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <Button variant="outlined" onClick={handleClearSearch} fullWidth>
                Clear
              </Button>
            </Grid>

            <Grid item xs={12} sm={2}>
              <Button variant="outlined" onClick={handleRefresh} fullWidth>
                Refresh
              </Button>
            </Grid>

            <Grid item xs={12} sm={2}>
              <Button variant="outlined" onClick={handleSort} fullWidth>
                Sort
              </Button>
            </Grid>
          </Grid>

          {loading ? (
            <CircularProgress style={{ marginTop: '20px' }} />
          ) : error ? (
            <Typography color="error" style={{ marginTop: '20px' }}>
              Error: {error}
            </Typography>
          ) : (
            <Grid container spacing={3} direction={viewMode === 'grid' ? 'row' : 'column'}>
              {filteredItems.map((item) => (
                <Grid  item xs={12} sm={6} md={4} key={item.imdbID}>
                  <ItemCard
                    item={item}
                    onItemNameChange={handleItemNameChange}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </div>
    </Container>
  );
};

export default MoviesPage;
