import axios from 'axios';

const baseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(
  /\/+$/,
  '',
);

export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

const unwrap = (response) => response.data.data;

export const getCategories = async () => {
  const response = await api.get('/api/categories');
  return unwrap(response);
};

export const getProducts = async () => {
  const response = await api.get('/api/products');
  return unwrap(response);
};

export const getProductById = async (id) => {
  const response = await api.get(`/api/products/${id}`);
  return unwrap(response);
};

export const getProductsByCategory = async (categoryId) => {
  const response = await api.get(`/api/products/category/${categoryId}`);
  return unwrap(response);
};

export const buildImageUrl = (imagePath) => {
  if (!imagePath) {
    return '';
  }

  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  return `${baseUrl}/${imagePath.replace(/^\/+/, '')}`;
};
