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

const App = () => {
  return (
    <CategoriesContextController>
      <RecipeContextController>
        <Main />
      </RecipeContextController>
    </CategoriesContextController>
  );
};

export default App;
