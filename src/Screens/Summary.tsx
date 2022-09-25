import React from 'react';
import { Text, View } from 'react-native';
import { Category } from '../Context/CategoriesContext/CategoriesContext.types';
import { useCategories } from '../Context/CategoriesContext/useCategories';
import { Product } from '../Context/RecipeContext/ReciptContext.types';
import { useRecipe } from '../Context/RecipeContext/useRecipe';

const resultOfCategories = (cat: Category[], proucts: Product[]) => {
  const catSummary = getAllSubCategories(cat)
    .map(c => {
      const productsInCategory = proucts.filter(p => p.category === c);
      const sum = productsInCategory.reduce(
        (acc, p) => acc + Number(p.price),
        0,
      );
      return {
        category: c,
        summary: sum.toFixed(2),
      };
    })
    .filter(c => +c.summary > 0);

  return catSummary;
};

const getAllSubCategories = (cat: Category[]) => {
  const subCategories = cat.map(c => c.subCategories).flat();
  return subCategories;
};

export const Summary = () => {
  const { productsWithPrices } = useRecipe();
  const { categories } = useCategories();

  console.log('SUMMARY', resultOfCategories(categories, productsWithPrices));

  const categoriesSummary = resultOfCategories(categories, productsWithPrices);
  const total = categoriesSummary.reduce((acc, c) => acc + +c.summary, 0);
  return (
    <View>
      <Text>Summary</Text>
      {categoriesSummary.map((p, i) => {
        return (
          <Text style={{ color: 'black', width: '100%' }} key={i}>
            {p.category} - {p.summary}
          </Text>
        );
      })}
      <Text style={{ color: 'black', width: '100%' }}>TOTAL: {total}</Text>
    </View>
  );
};
