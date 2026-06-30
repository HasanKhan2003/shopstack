import { Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { buildImageUrl } from '../services/api.js';

const fallbackImage =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="%23ffe0e0"/><stop offset="1" stop-color="%23d32f2f"/></linearGradient></defs><rect width="800" height="600" fill="url(%23g)"/><rect x="140" y="130" width="520" height="340" rx="34" fill="%23ffffff" fill-opacity="0.16"/></svg>';

const ProductCard = ({ product, onClick }) => {
  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: '0 12px 30px rgba(17, 17, 17, 0.1)',
        border: '1px solid rgba(17, 17, 17, 0.06)',
        transition: 'transform 180ms ease, box-shadow 180ms ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 16px 38px rgba(17, 17, 17, 0.14)',
        },
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          height: '100%',
          alignItems: 'stretch',
        }}
      >
        <CardMedia
          component="img"
          height="220"
          loading="lazy" /* Add this line */
          image={buildImageUrl(product.image) || fallbackImage}
          alt={product.name}
          sx={{
            objectFit: 'cover',
            backgroundColor: '#fafafa',
          }}
        />
        <CardContent sx={{ p: 2.5 }}>
          <Stack spacing={0.75}>
            <Typography
              variant="subtitle2"
              sx={{ color: 'var(--color-text-muted)', letterSpacing: 0.6 }}
            >
              {product.category_name}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
              {product.name}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'var(--color-primary)',
                fontWeight: 900,
              }}
            >
              ${Number(product.price).toFixed(2)}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
