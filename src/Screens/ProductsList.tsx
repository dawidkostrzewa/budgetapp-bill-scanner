import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { CATEGORIES } from '../api';
import { Product } from '../Context/ReciptContext.types';
import { useRecipe } from '../Context/useRecipe';
import { Screen } from './screens';

const getSubCategories = (mainCategory: string) => {
  const category = CATEGORIES.find(c => c.mainCategory === mainCategory);
  return category?.subCategories || [];
};

export const ProductsList = ({ navigation }: any) => {
  const { productsWithPrices, updateProduct, setProductsWithPrices } =
    useRecipe();

  const [currentProduct, setCurrentProduct] = React.useState(0);
  const [selectedMainCategory, setSelectedMainCategory] = React.useState<
    string | undefined
  >(undefined);

  const mainCategories = CATEGORIES.map(c => c.mainCategory);

  const confirmProduct = (cId: number, category: string) => {
    console.log('confirmProduct', cId, category);
    const newP = productsWithPrices[currentProduct];
    const confirmed: Product = {
      ...newP,
      category,
    };
    console.log(confirmed);
    updateProduct(confirmed);

    if (currentProduct < productsWithPrices.length - 1) {
      setCurrentProduct(currentProduct + 1);
      setSelectedMainCategory(undefined);
    } else {
      navigation.navigate(Screen.SUMMARY);
    }
  };

  function onPriceUpdate(i: number, newPrice: string) {
    const confirmed = {
      ...productsWithPrices[i],
      price: newPrice,
    };
    updateProduct(confirmed);
  }

  function deleteCurrent(idx: number) {
    const newProducts = productsWithPrices.filter(i => i.index !== idx);
    console.log('NEX', newProducts);
    setProductsWithPrices(newProducts);
  }

  return (
    <SafeAreaView
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
      }}>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          paddingVertical: 40,
          paddingHorizontal: 16,
          // backgroundColor:"",
          position: 'relative',
        }}>
        <Button
          title="delete"
          onPress={() =>
            deleteCurrent(productsWithPrices[currentProduct].index)
          }
        />
        <Text style={{ color: 'black', width: '100%' }}>
          {productsWithPrices[currentProduct]?.product} -{' '}
          {productsWithPrices[currentProduct]?.price}
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={e => {
            onPriceUpdate(currentProduct, e);
          }}
          value={productsWithPrices[currentProduct]?.price || '0.00'}
          keyboardType="numeric"
        />
        <ScrollView>
          {!selectedMainCategory &&
            mainCategories.map((category, index) => (
              <Button
                key={index}
                onPress={() => setSelectedMainCategory(category)}
                title={category}
              />
            ))}
          {selectedMainCategory &&
            getSubCategories(selectedMainCategory).map((category, index) => (
              <Button
                key={index}
                onPress={() => confirmProduct(currentProduct, category)}
                title={category}
              />
            ))}
        </ScrollView>
        <ScrollView>
          {productsWithPrices.map(p => {
            return (
              <Text style={{ color: 'black', width: '100%' }} key={p.index}>
                {p.product} - {p.price} - {p.category}
              </Text>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },
});
