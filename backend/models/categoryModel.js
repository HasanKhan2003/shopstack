import { queryAll } from '../database/database.js';

export const findAllCategories = async () => {
  return queryAll('SELECT id, name FROM categories ORDER BY id ASC');
};
