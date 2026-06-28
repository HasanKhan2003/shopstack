import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import CategoriesPage from './pages/CategoriesPage.jsx';
import CartPage from './pages/CartPage.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Box className="app-shell">
        <Navbar />
        <Container
          maxWidth="lg"
          sx={{
            flex: 1,
            py: { xs: 2, md: 4 },
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Container>
        <Footer />
      </Box>
    </BrowserRouter>
  );
};

export default App;
