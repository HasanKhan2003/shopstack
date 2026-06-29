import { useNavigate } from 'react-router-dom';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button.jsx';
import CartItem from '../components/CartItem.jsx';
import {
  clearCart,
  selectCartItems,
  selectGrandTotal,
  selectTotalItems,
} from '../store/cartSlice.js';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const grandTotal = useSelector(selectGrandTotal);
  const totalItems = useSelector(selectTotalItems);

  const handleCheckout = () => {
    dispatch(clearCart());
    navigate('/', {
      replace: true,
      state: { checkoutSuccess: true },
    });
  };

  if (!cartItems.length) {
    return (
      <div className="page-section">
        <Stack spacing={3}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <IconButton
              onClick={() => navigate(-1)}
              aria-label="Go back"
              sx={{
                backgroundColor: '#ffffff',
                border: '1px solid rgba(17, 17, 17, 0.08)',
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Box>
              <Typography
                variant="h4"
                sx={{ fontWeight: 900, fontSize: { xs: '1.9rem', md: '2.4rem' } }}
              >
                Cart
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.84)' }}>
                Your shopping cart is empty.
              </Typography>
            </Box>
          </Stack>

          <Paper className="section-card" sx={{ p: 4, textAlign: 'center' }}>
            <Stack spacing={2} alignItems="center">
              <Typography variant="h5" sx={{ fontWeight: 900 }}>
                Your cart is empty
              </Typography>
              <Typography sx={{ color: 'var(--color-text-muted)', maxWidth: 420 }}>
                Browse products and add something you like.
              </Typography>
              <Button onClick={() => navigate('/categories')}>Browse Categories</Button>
            </Stack>
          </Paper>
        </Stack>
      </div>
    );
  }

  return (
    <div className="page-section">
      <Stack spacing={3}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <IconButton
            onClick={() => navigate(-1)}
            aria-label="Go back"
            sx={{
              backgroundColor: '#ffffff',
              border: '1px solid rgba(17, 17, 17, 0.08)',
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: 900, fontSize: { xs: '1.9rem', md: '2.4rem' } }}
            >
              Cart
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.84)' }}>
              {totalItems} item{totalItems === 1 ? '' : 's'} ready for checkout.
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Paper
              className="section-card"
              sx={{
                p: 2,
                maxHeight: { xs: 820, md: 900 },
                overflowY: 'auto',
                pr: { md: 1 },
                scrollbarGutter: 'stable',
              }}
            >
              <Stack spacing={1.75}>
                {cartItems.map((item) => (
                  <CartItem item={item} key={item.id} />
                ))}
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Paper
              className="summary-card"
              sx={{
                p: 3,
                position: 'sticky',
                top: 100,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 900, mb: 2 }}>
                Order Summary
              </Typography>
              <Stack spacing={1.5}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ color: 'var(--color-text-muted)' }}>
                    Subtotal
                  </Typography>
                  <Typography sx={{ fontWeight: 800 }}>
                    ${grandTotal.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ color: 'var(--color-text-muted)' }}>
                    Grand Total
                  </Typography>
                  <Typography
                    sx={{ fontWeight: 900, color: 'var(--color-primary)' }}
                  >
                    ${grandTotal.toFixed(2)}
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Button
                fullWidth
                onClick={handleCheckout}
                sx={{ py: 1.5 }}
              >
                Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Stack>
    </div>
  );
};

export default CartPage;
