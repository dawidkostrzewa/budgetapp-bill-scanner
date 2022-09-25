import React, { ReactNode, useMemo, useState } from 'react';
import { CategoriesContext } from './CategoriesContext';
import { Category } from './CategoriesContext.types';

export const CategoriesContextController = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const value = useMemo(() => ({ categories, setCategories }), [categories]);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
