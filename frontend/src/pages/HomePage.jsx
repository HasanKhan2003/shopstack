import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Grid,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Button from '../components/Button.jsx';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import ProductCard from '../components/ProductCard.jsx';
import ProductModal from '../components/ProductModal.jsx';
import { getProducts } from '../services/api.js';

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const checkoutNoticeHandled = useRef(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getProducts();
        setProducts(data);
      } catch (requestError) {
        setError(
          requestError?.response?.data?.message ||
            'We could not load the products right now.',
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (location.state?.checkoutSuccess && !checkoutNoticeHandled.current) {
      checkoutNoticeHandled.current = true;
      setSuccessOpen(true);
      navigate('/', { replace: true });
    }
  }, [location.state, navigate]);

  return (
    <Box className="page-section">
      <Stack spacing={3}>
        <Box
          className="hero-panel"
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            color: '#ffffff',
          }}
        >
          <Stack spacing={2} alignItems="flex-start">
            <Typography
              component="h1"
              sx={{
                fontWeight: 900,
                maxWidth: 720,
                fontSize: { xs: '2.4rem', sm: '3.2rem', md: '4rem' },
                lineHeight: 1.05,
                fontFamily: '"Playfair Display", serif',
              }}
            >
              A modern shop built for clean browsing and fast checkout.
            </Typography>
            <Typography sx={{ maxWidth: 720, opacity: 0.92, lineHeight: 1.8 }}>
              Explore every product in the catalog, open any item in a smooth modal,
              and keep your cart synced with Redux and localStorage.
            </Typography>
            <Button
              startIcon={<ShoppingBagOutlinedIcon />}
              onClick={() => navigate('/categories')}
              sx={{
                backgroundColor: '#ffffff',
                color: 'var(--color-primary)',
                '&:hover': {
                  backgroundColor: '#fff3f3',
                },
              }}
            >
              Categories
            </Button>
          </Stack>
        </Box>

        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>
            All Products
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.84)', mb: 3 }}>
            Click any product to see details and add it to your cart.
          </Typography>
          {loading ? (
            <Loader label="Loading products..." light />
          ) : error ? (
            <ErrorMessage message={error} onRetry={() => window.location.reload()} />
          ) : (
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <ProductCard
                    product={product}
                    onClick={() => setSelectedProduct(product)}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Stack>

      <ProductModal
        product={selectedProduct}
        open={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
      />

      <Snackbar
        open={successOpen}
        autoHideDuration={3500}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: '100%', fontWeight: 700, borderRadius: 3 }}
        >
          Your order has been placed successfully.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HomePage;
