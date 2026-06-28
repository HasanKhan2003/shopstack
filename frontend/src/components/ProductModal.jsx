import { useEffect, useState } from 'react';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
  Fade,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import Button from './Button.jsx';
import QuantitySelector from './QuantitySelector.jsx';
import { addToCart } from '../store/cartSlice.js';
import { buildImageUrl } from '../services/api.js';

const ProductModal = ({ product, open, onClose }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (open) {
      setQuantity(1);
    }
  }, [open, product?.id]);

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    dispatch(addToCart({ product, quantity }));
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 220 }}
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0 18px 46px rgba(17, 17, 17, 0.28)',
        },
      }}
    >
      {product ? (
        <>
          <DialogTitle
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              pr: 1,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 900 }}>
              Product Details
            </Typography>
            <IconButton onClick={onClose} aria-label="Close product modal">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ p: 0 }}>
            <Grid container>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  background: 'linear-gradient(180deg, #fff 0%, #fff3f3 100%)',
                }}
              >
                <Box
                  component="img"
                  src={buildImageUrl(product.image)}
                  alt={product.name}
                  sx={{
                    width: '100%',
                    height: { xs: 300, md: '100%' },
                    minHeight: 320,
                    objectFit: 'cover',
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={2} sx={{ p: { xs: 3, md: 4 } }}>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: 'var(--color-text-muted)', mb: 0.5 }}
                    >
                      {product.category_name}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 900, lineHeight: 1.1 }}>
                      {product.name}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{ color: 'var(--color-text-muted)', lineHeight: 1.8 }}
                  >
                    {product.description}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ color: 'var(--color-primary)', fontWeight: 900 }}
                  >
                    ${Number(product.price).toFixed(2)}
                  </Typography>
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 800 }}>
                      Quantity
                    </Typography>
                    <QuantitySelector
                      quantity={quantity}
                      onIncrement={() => setQuantity((current) => current + 1)}
                      onDecrement={() =>
                        setQuantity((current) => Math.max(1, current - 1))
                      }
                    />
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3, gap: 1.5, justifyContent: 'space-between' }}>
            <Button variant="outlined" onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleAddToCart}>Add To Cart</Button>
          </DialogActions>
        </>
      ) : null}
    </Dialog>
  );
};

export default ProductModal;
