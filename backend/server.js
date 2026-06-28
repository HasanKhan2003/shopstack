import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectory = path.join(__dirname, 'public');

app.use(cors());
app.use(express.json());
app.use(express.static(publicDirectory));

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'ShopStack API is running.' });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found.',
  });
});

app.use((error, req, res, next) => {
  console.error('Unhandled server error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error.',
  });
});

app.listen(PORT, () => {
  console.log(`ShopStack backend running on http://localhost:${PORT}`);
});
