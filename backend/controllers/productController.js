import {
  findAllProducts,
  findProductById,
  findProductsByCategoryId,
} from '../models/productModel.js';

export const getProducts = async (req, res) => {
  try {
    const products = await findAllProducts();
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error('Get products failed:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products.',
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productId = Number(id);

    if (Number.isNaN(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product id.',
      });
    }

    const product = await findProductById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Get product failed:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product.',
    });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const parsedCategoryId = Number(categoryId);

    if (Number.isNaN(parsedCategoryId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category id.',
      });
    }

    const products = await findProductsByCategoryId(parsedCategoryId);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error('Get products by category failed:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch category products.',
    });
  }
};
