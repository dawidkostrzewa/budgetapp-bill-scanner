import { createContext } from 'react';
import { ReciptContextValue } from './ReciptContext.types';

export const ReciptContext = createContext<ReciptContextValue | undefined>(
  undefined,
);
