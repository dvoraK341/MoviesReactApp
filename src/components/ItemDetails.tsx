import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

const ItemDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const items = useSelector((state: RootState) => state.items.items);

  const [itemDetails, setItemDetails] = useState<any | null>(null);

  useEffect(() => {
    if (location.state?.item) {
      setItemDetails(location.state.item);
    } else if (id && items.length > 0) {
      const foundItem = items.find((item) => item.imdbID === id);
      if (foundItem) {
        setItemDetails(foundItem);
      }
    }
  }, [id, location.state, items]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
      <Card sx={{ maxWidth: 600, width: '100%' }}>
        {itemDetails?.Poster && (
          <CardMedia
            component="img"
            alt={itemDetails.Title}
            image={itemDetails.Poster}
            sx={{ height: 300, objectFit: 'cover' }}
          />
        )}
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {itemDetails?.Title}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Year:  {itemDetails?.Year ? `${itemDetails?.Year.slice(6, 8)}/${itemDetails?.Year.slice(4, 6)}/${itemDetails?.Year.slice(0, 4)}` : 'שנה לא זמינה'}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Type: {itemDetails?.Type}
          </Typography>
          <Typography variant="body2" paragraph>
            {itemDetails?.Plot || 'No plot available for this item.'}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(-1)}
            sx={{ marginTop: 2 }}
          >
            Back
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ItemDetails;
