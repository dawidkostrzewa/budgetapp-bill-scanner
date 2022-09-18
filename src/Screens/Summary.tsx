import React from 'react';
import { Text, View } from 'react-native';
import { CATEGORIES } from '../api';
import { Product } from '../Context/ReciptContext.types';
import { useRecipe } from '../Context/useRecipe';

const resultOfCategories = (proucts: Product[]) => {
  const catSummary = CATEGORIES.map(c => {
    const productsInCategory = proucts.filter(
      p => p.category === c.mainCategory,
    );
    const sum = productsInCategory.reduce((acc, p) => acc + Number(p.price), 0);
    return {
      category: c.mainCategory,
      summary: sum,
    };
  }).filter(c => c.summary > 0);

  return catSummary;
};

export const Summary = () => {
  const { productsWithPrices } = useRecipe();

  console.log('SUMMARY', resultOfCategories(productsWithPrices));

  const categoriesSummary = resultOfCategories(productsWithPrices);
  const total = categoriesSummary.reduce((acc, c) => acc + c.summary, 0);
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
