import React, { ReactNode, useMemo, useState, useEffect } from 'react';
import { resultOfCategories } from '../../utils/utils';
import { CategorySumamry } from '../CategoriesContext/CategoriesContext.types';
import { useCategories } from '../CategoriesContext/useCategories';
import { ReciptContext } from './ReciptContext';
import { Product } from './ReciptContext.types';

export const RecipeContextController = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [productsWithPrices, setProductsWithPrices] = useState<Product[]>([]);
  const [recipeImage, setRecipeImage] = useState<string | undefined>(undefined);
  const [recipeSummary, setRecipeSummary] = useState<CategorySumamry[]>([]);
  const [isProductsLoading, setIsProductsLoading] = useState(false);

  const handleProductsLoading = (isLoading: boolean) => {
    setIsProductsLoading(isLoading);
  };

  const { categories } = useCategories();

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

  useEffect(() => {
    const summary = resultOfCategories(categories, productsWithPrices);
    setRecipeSummary(summary);
  }, [categories, productsWithPrices]);

  const value = useMemo(
    () => ({
      productsWithPrices,
      setProductsWithPrices,
      updateProduct,
      recipeImage,
      setRecipeImage,
      recipeSummary,
      isProductsLoading,
      handleProductsLoading,
    }),
    [isProductsLoading, productsWithPrices, recipeImage, recipeSummary],
  );

  return (
    <ReciptContext.Provider value={value}>{children}</ReciptContext.Provider>
  );
};
