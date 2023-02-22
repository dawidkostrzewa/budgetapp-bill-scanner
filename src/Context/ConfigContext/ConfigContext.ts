import { createContext } from 'react';
import { ConfigContextValue } from './CategoriesContext.types';

export const ConfigContext = createContext<ConfigContextValue | undefined>(
  undefined,
);
