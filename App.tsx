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

import { RecipeContextController } from './src/Context/RecipeContextController';
import { Main } from './src/Screens/Main';

const App = () => {
  return (
    <RecipeContextController>
      <Main />
    </RecipeContextController>
  );
};

export default App;
