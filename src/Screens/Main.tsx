import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { fetchCategories } from '../api';
import { Version } from '../Components/Version';
import { useCategories } from '../Context/CategoriesContext/useCategories';
import { useConfig } from '../Context/ConfigContext/useConfig';
import { Home } from './Home';
import { ProductsList } from './ProductsList';
import { Screen } from './screens';
import { Summary } from './Summary';

const Stack = createNativeStackNavigator();

export const Main = () => {
  const { setCategories } = useCategories();
  const { env } = useConfig();

  useEffect(() => {
    (async () => {
      try {
        const categories = await fetchCategories(env);
        setCategories(categories);
      } catch (e) {
        console.log('ERROR', e);
      }
    })();
  }, [setCategories, env]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={Screen.MAIN}
          component={Home}
          options={{ title: 'Budget Bill Scanner', headerShown: false }}
        />
        <Stack.Screen
          name={Screen.PRODUCTS}
          options={{ title: 'Products list' }}
          component={ProductsList}
        />
        <Stack.Screen
          name={Screen.SUMMARY}
          options={{ title: 'Summary' }}
          component={Summary}
        />
      </Stack.Navigator>
      <Version />
    </NavigationContainer>
  );
};
