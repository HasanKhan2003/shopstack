import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { buildImageUrl } from '../services/api.js';

const fallbackImage =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="%23ffd1d1"/><stop offset="1" stop-color="%23b30000"/></linearGradient></defs><rect width="800" height="600" fill="url(%23g)"/><circle cx="620" cy="110" r="95" fill="%23ffffff" fill-opacity="0.18"/><circle cx="170" cy="470" r="140" fill="%23ffffff" fill-opacity="0.12"/></svg>';

const CategoryCard = ({ category, image, onClick, selected = false }) => {
  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: selected
          ? '0 16px 36px rgba(211, 47, 47, 0.18)'
          : '0 12px 30px rgba(17, 17, 17, 0.1)',
        border: selected
          ? '2px solid rgba(211, 47, 47, 0.45)'
          : '1px solid rgba(17, 17, 17, 0.06)',
        transition: 'transform 180ms ease, box-shadow 180ms ease',
        '&:hover': {
          transform: 'translateY(-6px)',
        },
      }}
    >
      <CardActionArea onClick={onClick}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            image={buildImageUrl(image) || fallbackImage}
            alt={category.name}
            sx={{ objectFit: 'cover' }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(17,17,17,0.02) 0%, rgba(17,17,17,0.55) 100%)',
            }}
          />
        </Box>
        <CardContent sx={{ p: 2.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            {category.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCard;
