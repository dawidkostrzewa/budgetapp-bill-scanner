/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { CategoriesContextController } from './src/Context/CategoriesContext/CategoriesContextController';

import { RecipeContextController } from './src/Context/RecipeContext/RecipeContextController';
import { Main } from './src/Screens/Main';
import { Provider as PaperProvider } from 'react-native-paper';
const App = () => {
  return (
    <CategoriesContextController>
      <RecipeContextController>
        <PaperProvider>
          <Main />
        </PaperProvider>
      </RecipeContextController>
    </CategoriesContextController>
  );
};

export default App;
