import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { NativeModules } from 'react-native';
import { fetchCategories } from '../api';
import { ImagePickerComponent } from '../Components/ImagePicker';
import { useCategories } from '../Context/CategoriesContext/useCategories';
import { ProductsList } from './ProductsList';
import { Screen } from './screens';
import { Summary } from './Summary';

const Stack = createNativeStackNavigator();

export const Main = () => {
  const env = NativeModules.RNConfig.env as 'dev' | 'production';
  const { setCategories } = useCategories();

  useEffect(() => {
    (async () => {
      try {
        const categories = await fetchCategories();
        console.log(categories);
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
          component={ImagePickerComponent}
          options={{ title: 'Welcome ' + env }}
        />
        <Stack.Screen name={Screen.PRODUCTS} component={ProductsList} />
        <Stack.Screen name={Screen.SUMMARY} component={Summary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
