import { Category } from '../entities';

export function createCategory(title: string): Category {
  return {
    title,
    categoryId: Math.floor(Math.random() * 100000),
    products: [],
    createdAt: new Date(),
    updatedAt: null,
  };
}

export default { createCategory };
