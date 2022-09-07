import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRecipe } from '../Context/useRecipe';

export const ProductsList = () => {
  const { productsWithPrices } = useRecipe();

  return (
    <View style={styles.container}>
      {productsWithPrices.map((p, i) => {
        return (
          <Text style={{ color: 'black', width: '100%' }} key={i}>
            {p.product} - {p.price}
          </Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
    // height: 300,
  },
});
