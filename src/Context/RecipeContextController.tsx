import React, { ReactNode, useMemo, useState } from 'react';
import { RECIPE_PRICES_MOCK, RECIPE_PRODUCTS_MOCK } from '../mocks/recipe.mock';
import { ReciptContext } from './ReciptContext';
import { Product } from './ReciptContext.types';

export const RecipeContextController = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [products, setProducts] = useState<string[]>(RECIPE_PRODUCTS_MOCK);
  const [prices, setPrices] = useState<number[]>(
    RECIPE_PRICES_MOCK as unknown as number[],
  );

  const [productsWithPrices, setProductsWithPrices] = useState<Product[]>([]);

  const onUpdateProducts = (newProducts: string[]) => {
    setProducts(newProducts);
  };

  const onUpdatePrices = (newPrices: number[]) => {
    setPrices(newPrices);
  };

  const value = useMemo(
    () => ({
      products,
      prices,
      productsWithPrices,
      setProductsWithPrices,
      onUpdateProducts,
      onUpdatePrices,
    }),
    [prices, products, productsWithPrices],
  );

  return (
    <ReciptContext.Provider value={value}>{children}</ReciptContext.Provider>
  );
};
