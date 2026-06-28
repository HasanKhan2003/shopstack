import { Box, Card, CardContent, CardMedia, IconButton, Stack, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch } from 'react-redux';
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../store/cartSlice.js';
import QuantitySelector from './QuantitySelector.jsx';
import { buildImageUrl } from '../services/api.js';

const fallbackImage =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="%23ffe0e0"/><stop offset="1" stop-color="%23b30000"/></linearGradient></defs><rect width="800" height="600" fill="url(%23g)"/><circle cx="625" cy="130" r="100" fill="%23ffffff" fill-opacity="0.14"/></svg>';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const totalPrice = item.price * item.quantity;

  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: '0 10px 26px rgba(17, 17, 17, 0.08)',
        border: '1px solid rgba(17, 17, 17, 0.06)',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={0}
        sx={{ alignItems: 'stretch' }}
      >
        <CardMedia
          component="img"
          image={buildImageUrl(item.image) || fallbackImage}
          alt={item.name}
          sx={{
            width: { xs: '100%', md: 160 },
            height: { xs: 200, md: 'auto' },
            objectFit: 'cover',
          }}
        />
        <CardContent sx={{ flex: 1, p: 2.25 }}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 900 }}>
                {item.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'var(--color-text-muted)', mt: 0.75, lineHeight: 1.7 }}
              >
                {item.description}
              </Typography>
            </Box>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ alignItems: { xs: 'flex-start', sm: 'center' } }}
            >
              <Box>
                <Typography variant="body2" sx={{ color: 'var(--color-text-muted)' }}>
                  Unit Price
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>
                  ${Number(item.price).toFixed(2)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: 'var(--color-text-muted)' }}>
                  Quantity
                </Typography>
                <QuantitySelector
                  quantity={item.quantity}
                  onIncrement={() => dispatch(incrementQuantity(item.id))}
                  onDecrement={() => dispatch(decrementQuantity(item.id))}
                  compact
                />
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: 'var(--color-text-muted)' }}>
                  Total Price
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 900, color: 'var(--color-primary)' }}
                >
                  ${totalPrice.toFixed(2)}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
          }}
        >
          <IconButton
            aria-label="Remove item"
            onClick={() => dispatch(removeFromCart(item.id))}
            sx={{
              color: 'var(--color-primary)',
              border: '1px solid rgba(211, 47, 47, 0.18)',
            }}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </Box>
      </Stack>
    </Card>
  );
};

export default CartItem;
