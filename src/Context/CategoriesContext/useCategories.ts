import { useContext } from 'react';
import { CategoriesContext } from './CategoriesContext';

export const useCategories = () => {
  const ctx = useContext(CategoriesContext);
  if (!ctx) {
    throw new Error('CategoriesContext undefined');
  }
  return ctx;
};
