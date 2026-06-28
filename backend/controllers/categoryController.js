import { findAllCategories } from '../models/categoryModel.js';

export const getCategories = async (req, res) => {
  try {
    const categories = await findAllCategories();
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error('Get categories failed:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories.',
    });
  }
};
