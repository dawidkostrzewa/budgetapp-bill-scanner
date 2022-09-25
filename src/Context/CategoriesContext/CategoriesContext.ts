import { createContext } from 'react';
import { CategoriesContextValue } from './CategoriesContext.types';

export const CategoriesContext = createContext<
  CategoriesContextValue | undefined
>(undefined);
