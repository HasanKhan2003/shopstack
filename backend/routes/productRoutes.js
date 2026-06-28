import { Router } from 'express';
import {
  getProduct,
  getProducts,
  getProductsByCategory,
} from '../controllers/productController.js';

const router = Router();

router.get('/', getProducts);
router.get('/category/:categoryId', getProductsByCategory);
router.get('/:id', getProduct);

export default router;
