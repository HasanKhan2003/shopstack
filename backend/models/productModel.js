import { queryAll, queryOne } from '../database/database.js';

const productSelect = `
  SELECT
    p.id,
    p.name,
    p.description,
    p.price,
    p.image,
    p.category_id,
    c.name AS category_name
  FROM products p
  INNER JOIN categories c ON c.id = p.category_id
`;

export const findAllProducts = async () => {
  return queryAll(`${productSelect} ORDER BY p.id ASC`);
};

export const findProductById = async (id) => {
  return queryOne(`${productSelect} WHERE p.id = ?`, [id]);
};

export const findProductsByCategoryId = async (categoryId) => {
  return queryAll(`${productSelect} WHERE p.category_id = ? ORDER BY p.id ASC`, [categoryId]);
};
