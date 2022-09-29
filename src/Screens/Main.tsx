import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { fetchCategories } from '../api';
import { Version } from '../Components/Version';
import { useCategories } from '../Context/CategoriesContext/useCategories';
import { Home } from './Home';
import { ProductsList } from './ProductsList';
import { Screen } from './screens';
import { Summary } from './Summary';

const Stack = createNativeStackNavigator();

export const Main = () => {
  const { setCategories } = useCategories();

  useEffect(() => {
    (async () => {
      try {
        const categories = await fetchCategories();
        // console.log(categories);
        setCategories(categories);
      } catch (e) {
        console.log('ERROR', e);
      }
    })();
  }, [setCategories]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={Screen.MAIN}
          component={Home}
          options={{ title: 'Budget Bill Scanner' }}
        />
        <Stack.Screen name={Screen.PRODUCTS} component={ProductsList} />
        <Stack.Screen name={Screen.SUMMARY} component={Summary} />
      </Stack.Navigator>
      <Version />
    </NavigationContainer>
  );
};
