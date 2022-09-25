/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Category } from '../Context/CategoriesContext/CategoriesContext.types';
import { useCategories } from '../Context/CategoriesContext/useCategories';
import { Product } from '../Context/RecipeContext/ReciptContext.types';
import { useRecipe } from '../Context/RecipeContext/useRecipe';
import { Screen } from './screens';

const getSubCategories = (cat: Category[], mainCategory: string) => {
  const category = cat.find(c => c.mainCategory === mainCategory);
  return category?.subCategories || [];
};

export const ProductsList = ({ navigation }: any) => {
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round((dimensions.width * 9) / 16);
  const {
    productsWithPrices,
    updateProduct,
    setProductsWithPrices,
    recipeImage,
  } = useRecipe();

  const [currentProduct, setCurrentProduct] = React.useState(0);
  const [selectedMainCategory, setSelectedMainCategory] = React.useState<
    string | undefined
  >(undefined);

  const { categories } = useCategories();

  const mainCategories = categories.map(c => c.mainCategory);

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

  const goBack = () => {
    if (selectedMainCategory) {
      setSelectedMainCategory(undefined);
      return;
    }
    if (currentProduct > 0) {
      setCurrentProduct(currentProduct - 1);
      setSelectedMainCategory(undefined);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          paddingVertical: 10,
          paddingHorizontal: 16,
          position: 'relative',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Button title="Back" onPress={goBack} />
          <Button
            title="delete"
            onPress={() =>
              deleteCurrent(productsWithPrices[currentProduct].index)
            }
          />
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{ color: 'black', fontSize: 24, fontWeight: '600' }}>
            {productsWithPrices[currentProduct]?.product}
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={e => {
              onPriceUpdate(currentProduct, e);
            }}
            value={productsWithPrices[currentProduct]?.price || '0.00'}
            keyboardType="numeric"
          />
        </View>

        {/* <ScrollView> */}
        {!selectedMainCategory && (
          <FlatList
            data={mainCategories}
            renderItem={({ item }) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  margin: 3,
                  justifyContent: 'center',
                }}>
                <Button
                  color={'red'}
                  onPress={() => setSelectedMainCategory(item)}
                  title={item}
                />
              </View>
            )}
            numColumns={3}
            keyExtractor={item => item}
          />
        )}
        {selectedMainCategory && (
          <FlatList
            data={getSubCategories(categories, selectedMainCategory)}
            renderItem={({ item }) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  margin: 3,
                  justifyContent: 'center',
                }}>
                <Button
                  color={'#520303'}
                  onPress={() => confirmProduct(currentProduct, item)}
                  title={item}
                />
              </View>
            )}
            numColumns={2}
            keyExtractor={item => item}
          />
        )}

        {/* {selectedMainCategory &&
            getSubCategories(selectedMainCategory).map((category, index) => (
              <Button
                key={index}
                onPress={() => confirmProduct(currentProduct, category)}
                title={category}
              />
            ))} */}
        {/* </ScrollView> */}
        <ScrollView>
          <View>
            {productsWithPrices.map(p => {
              return (
                <Text
                  onPress={() => deleteCurrent(p.index)}
                  style={{ color: 'black', width: '100%' }}
                  key={p.index}>
                  {p.product} - {p.price} - {p.category}
                </Text>
              );
            })}
          </View>
          {recipeImage && (
            <Image
              source={{ uri: recipeImage }}
              style={{
                width: dimensions.width,
                height: imageHeight,
                resizeMode: 'contain',
              }}
            />
          )}
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
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
    width: 80,
    color: 'black',
    // width: '50%',
  },
});
