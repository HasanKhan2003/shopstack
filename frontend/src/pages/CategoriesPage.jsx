import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CategoryCard from '../components/CategoryCard.jsx';
import ProductCard from '../components/ProductCard.jsx';
import ProductModal from '../components/ProductModal.jsx';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Button from '../components/Button.jsx';
import { getCategories, getProducts, getProductsByCategory } from '../services/api.js';

const CategoriesPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productsError, setProductsError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoadingCategories(true);
        setCategoriesError('');
        const [categoryResult, productResult] = await Promise.allSettled([
          getCategories(),
          getProducts(),
        ]);
        if (categoryResult.status === 'fulfilled') {
          setCategories(categoryResult.value);
        } else {
          throw categoryResult.reason;
        }

        if (productResult.status === 'fulfilled') {
          setAllProducts(productResult.value);
        } else {
          setAllProducts([]);
        }
      } catch (requestError) {
        setCategoriesError(
          requestError?.response?.data?.message ||
            'We could not load categories right now.',
        );
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  const handleCategoryClick = async (category) => {
    try {
      setSelectedCategory(category);
      setSelectedProduct(null);
      setLoadingProducts(true);
      setProductsError('');
      setCategoryProducts([]);
      const data = await getProductsByCategory(category.id);
      setCategoryProducts(data);
    } catch (requestError) {
      setProductsError(
        requestError?.response?.data?.message ||
          'We could not load products for this category.',
      );
    } finally {
      setLoadingProducts(false);
    }
  };

  const categoryImageMap = categories.reduce((accumulator, category) => {
    const matchingProduct = allProducts.find(
      (product) => product.category_id === category.id,
    );

    if (matchingProduct) {
      accumulator[category.id] = matchingProduct.image;
    }

    return accumulator;
  }, {});

  return (
    <Box className="page-section">
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
              Categories
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.84)' }}>
              Pick a category to load its products.
            </Typography>
          </Box>
        </Stack>

        {loadingCategories ? (
          <Loader label="Loading categories..." light />
        ) : categoriesError ? (
          <ErrorMessage message={categoriesError} onRetry={() => window.location.reload()} />
        ) : (
          <Grid container spacing={3}>
            {categories.map((category) => (
              <Grid item xs={12} sm={6} md={3} key={category.id}>
                <CategoryCard
                  category={category}
                  image={categoryImageMap[category.id]}
                  onClick={() => handleCategoryClick(category)}
                  selected={selectedCategory?.id === category.id}
                />
              </Grid>
            ))}
          </Grid>
        )}

        <Box className="section-card">
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: 3 }}
          >
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 900 }}>
                {selectedCategory ? selectedCategory.name : 'Category Products'}
              </Typography>
              <Typography sx={{ color: 'var(--color-text-muted)' }}>
                {selectedCategory
                  ? 'Products for the selected category are shown below.'
                  : 'Click a category card to load products here.'}
              </Typography>
            </Box>
            {selectedCategory ? (
              <Button
                variant="outlined"
                onClick={() => {
                  setSelectedCategory(null);
                  setCategoryProducts([]);
                  setProductsError('');
                  setLoadingProducts(false);
                  setSelectedProduct(null);
                }}
              >
                Show All Categories
              </Button>
            ) : null}
          </Stack>

          {loadingProducts ? (
            <Loader label="Loading category products..." />
          ) : productsError ? (
            <ErrorMessage message={productsError} />
          ) : selectedCategory ? (
            <Grid container spacing={3}>
              {categoryProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <ProductCard
                    product={product}
                    onClick={() => setSelectedProduct(product)}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography sx={{ color: 'var(--color-text-muted)' }}>
              Choose a category above to view products.
            </Typography>
          )}
        </Box>
      </Stack>

      <ProductModal
        product={selectedProduct}
        open={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
      />
    </Box>
  );
};

export default CategoriesPage;
