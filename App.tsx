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

import { Main } from './src/Components/Main';
import { RecipeContextController } from './src/Context/RecipeContextController';

const App = () => {
  return (
    <RecipeContextController>
      <Main />
    </RecipeContextController>
  );
};

export default App;
