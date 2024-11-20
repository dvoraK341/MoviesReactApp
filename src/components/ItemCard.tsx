import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, TextField, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

interface ItemCardProps {
  item: any;
  onItemNameChange: (imdbID: string, newTitle: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onItemNameChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(item.Title);

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    if (newTitle !== item.Title) {
      onItemNameChange(item.imdbID, newTitle);
    }
    setIsEditing(false);
  };

  return (
    <Card style={{ display: 'flex' }}>
      {item.Poster && item.Poster !== 'N/A' ? (
        <CardMedia
          component="img"
          alt={item.Title}
          image={item.Poster}
          style={{ maxHeight: '228px', maxWidth: '150px' }}
        />
      ) : (
        <div style={{ maxHeight: '228px', maxWidth: '150px', backgroundColor: '#f0f0f0' }}>
          <Typography variant="body2" align="center" style={{ padding: '20px' }}>
            No Image Available
          </Typography>
        </div>
      )}

      <CardContent>
        {isEditing ? (
          <TextField
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleBlur}
            autoFocus
          />
        ) : (
          <Typography variant="h6" onClick={handleTitleClick}>
            {item.Title}
          </Typography>
        )}
        <Typography variant="body2" color="textSecondary">
          {item.Year ? `${item.Year.slice(6, 8)}/${item.Year.slice(4, 6)}/${item.Year.slice(0, 4)}` : 'שנה לא זמינה'}
        </Typography>

        <Link to={`/item/${item.imdbID}`} state={{ item }}>
          View Details
        </Link>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
