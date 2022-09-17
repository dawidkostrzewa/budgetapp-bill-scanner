import React, { ReactNode, useMemo, useState } from 'react';
import { ReciptContext } from './ReciptContext';
import { Product } from './ReciptContext.types';

export const RecipeContextController = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [productsWithPrices, setProductsWithPrices] = useState<Product[]>([]);

  const updateProduct = ({
    index,
    // product,
    price,
    category,
  }: Product) => {
    setProductsWithPrices(prevProducts => {
      const productToUpdate = prevProducts.find(p => p.index === index);
      if (productToUpdate) {
        productToUpdate.category = category;
        // productToUpdate.product = productToUpdate.product;
        productToUpdate.price = price;

        return prevProducts.map(p => {
          if (p.index === index) {
            return productToUpdate;
          }
          return p;
        });
      }
      return prevProducts;
    });
  };

  const value = useMemo(
    () => ({
      productsWithPrices,
      setProductsWithPrices,
      updateProduct,
    }),
    [productsWithPrices],
  );

  return (
    <ReciptContext.Provider value={value}>{children}</ReciptContext.Provider>
  );
};
