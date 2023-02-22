import { useContext } from 'react';
import { ConfigContext } from './ConfigContext';

export const useConfig = () => {
  const ctx = useContext(ConfigContext);
  if (!ctx) {
    throw new Error('ConfigContext undefined');
  }
  return ctx;
};
