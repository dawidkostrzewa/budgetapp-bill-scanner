import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ImagePickerComponent } from '../ImagePicker';
import { ProductsList } from './ProductsList';

const Stack = createNativeStackNavigator();

export const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={ImagePickerComponent}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Products" component={ProductsList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
