import React from 'react';
import { Text, View } from 'react-native';
import { useRecipe } from '../Context/useRecipe';

export const Summary = () => {
  const { productsWithPrices } = useRecipe();

  return (
    <View>
      <Text>Summary</Text>
      {productsWithPrices.map((p, i) => {
        return (
          <Text style={{ color: 'black', width: '100%' }} key={i}>
            {p.product} - {p.price} - {p.category}
          </Text>
        );
      })}
    </View>
  );
};
