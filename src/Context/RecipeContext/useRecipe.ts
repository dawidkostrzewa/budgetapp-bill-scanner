import { useContext } from 'react';
import { ReciptContext } from './ReciptContext';

export const useRecipe = () => {
  const ctx = useContext(ReciptContext);
  if (!ctx) {
    throw new Error('RecipeContext undefined');
  }
  return ctx;
};
