/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  ActivityIndicator,
  DataTable,
  IconButton,
  MD2Colors,
  MD3Colors,
} from 'react-native-paper';
import { Category } from '../Context/CategoriesContext/CategoriesContext.types';
import { useCategories } from '../Context/CategoriesContext/useCategories';
import { Product } from '../Context/RecipeContext/ReciptContext.types';
import { useRecipe } from '../Context/RecipeContext/useRecipe';
import { Screen } from './screens';
import { Chip } from 'react-native-paper';
import { reactNativePaperRequiredProps } from '../utils/utils';

const getSubCategories = (cat: Category[], mainCategory: string) => {
  const category = cat.find(c => c.mainCategory.name === mainCategory);
  return category?.subCategories || [];
};

export const ProductsList = ({ navigation }: any) => {
  const {
    productsWithPrices,
    updateProduct,
    setProductsWithPrices,
    isProductsLoading,
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

  const goNext = () => {
    if (currentProduct < productsWithPrices.length - 1) {
      setCurrentProduct(currentProduct + 1);
      setSelectedMainCategory(undefined);
    } else {
      navigation.navigate(Screen.SUMMARY);
    }
  };

  const nextBtnIcon =
    currentProduct < productsWithPrices.length - 1
      ? 'arrow-right-bold'
      : 'finance';

  if (isProductsLoading) {
    return (
      <ActivityIndicator
        size="large"
        animating={true}
        color={MD2Colors.red800}
        style={{ marginTop: 20 }}
      />
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 16,
          position: 'relative',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <IconButton
              icon="arrow-left-bold"
              iconColor={MD3Colors.neutralVariant0}
              size={25}
              onPress={goBack}
              {...reactNativePaperRequiredProps}
            />
            <IconButton
              icon={nextBtnIcon}
              iconColor={MD3Colors.secondary0}
              size={25}
              onPress={goNext}
              {...reactNativePaperRequiredProps}
            />
          </View>

          <IconButton
            icon="delete"
            iconColor={MD3Colors.secondary0}
            size={25}
            onPress={() =>
              deleteCurrent(productsWithPrices[currentProduct].index)
            }
            {...reactNativePaperRequiredProps}
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

        <View>
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
                  <Chip onPress={() => setSelectedMainCategory(item.name)}>
                    {item.name}
                  </Chip>
                </View>
              )}
              numColumns={2}
              keyExtractor={item => item.name}
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
                  <Chip
                    onPress={() => confirmProduct(currentProduct, item.name)}>
                    {item.name}
                  </Chip>
                </View>
              )}
              numColumns={1}
              keyExtractor={item => item.name}
            />
          )}
        </View>
        <ScrollView>
          <View>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title style={{ width: '50%' }}>
                  <Text style={styles.cellTitle}> Name </Text>
                </DataTable.Title>
                <DataTable.Title style={{ width: '10%' }}>
                  <Text style={styles.cellTitle}> Price </Text>
                </DataTable.Title>
                <DataTable.Title style={{ width: '40%' }}>
                  <Text style={styles.cellTitle}> Category </Text>
                </DataTable.Title>
              </DataTable.Header>
              {productsWithPrices.map(p => {
                return (
                  <DataTable.Row
                    {...reactNativePaperRequiredProps}
                    key={p.index}
                    onPress={() => deleteCurrent(p.index)}>
                    <DataTable.Cell style={{ width: '50%' }}>
                      <Text style={styles.tableRow}> {p.product}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={{ width: '10%' }}>
                      <Text style={styles.tableRow}>{p.price}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={{ width: '40%' }}>
                      <Text style={styles.tableRow}> {p.category}</Text>
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </DataTable>
          </View>
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
  tableRow: {
    color: 'black',
  },
  cellTitle: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
  },
});
