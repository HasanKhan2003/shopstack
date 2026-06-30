import { useNavigate } from 'react-router-dom';
import { AppBar, Badge, Box, Container, IconButton, Toolbar, Typography } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useSelector } from 'react-redux';
import { selectTotalItems } from '../store/cartSlice.js';

const Navbar = () => {
  const navigate = useNavigate();
  const totalItems = useSelector(selectTotalItems);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: '#ffffff',
        color: 'var(--color-text)',
        borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
        transform: 'translateZ(0)', // Add this line
        willChange: 'transform',    // Add this line
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 76, display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h5"
            onClick={() => navigate('/')}
            sx={{
              fontWeight: 900,
              color: 'var(--color-primary)',
              cursor: 'pointer',
              fontFamily: '"Playfair Display", serif',
            }}
          >
            ShopStack
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={() => navigate('/cart')}
              aria-label="Open cart"
              sx={{
                color: 'var(--color-text)',
                border: '1px solid rgba(17, 17, 17, 0.08)',
              }}
            >
              <Badge
                badgeContent={totalItems}
                color="error"
                invisible={totalItems === 0}
                overlap="circular"
              >
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
            <Typography
              variant="body2"
              sx={{ fontWeight: 800, display: { xs: 'none', sm: 'block' } }}
            >
              {totalItems > 0 ? `${totalItems} in cart` : 'Cart'}
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
