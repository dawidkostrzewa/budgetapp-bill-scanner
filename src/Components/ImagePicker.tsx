import React, { useCallback } from 'react';
import { NativeModules, StyleSheet, View } from 'react-native';

import * as ImagePicker from 'react-native-image-crop-picker';
import callGoogleVisionAsync from '../api';

import { useRecipe } from '../Context/RecipeContext/useRecipe';
import { Screen } from '../Screens/screens';
import { convertGooleApiResponseToProducts } from '../utils/textRecognision.utils';
import { Logo } from './Logo';
import { Button } from 'react-native-paper';

export const ImagePickerComponent = ({ navigation }: any) => {
  const env = NativeModules.RNConfig.env as 'dev' | 'production';
  const recipeContext = useRecipe();

  const takeImage = async () => {
    const imgPicked: ImagePicker.Image = await ImagePicker.openCamera({
      cropping: true,
      includeBase64: true,
      freeStyleCropEnabled: true,
      compressImageQuality: 0.3,
    });

    recipeContext.setRecipeImage(imgPicked.path);
    convertToText(imgPicked);
  };

  const convertToText = useCallback(
    async (img?: ImagePicker.Image, useMock?: boolean) => {
      console.log('CONVERT');

      const base64 = img?.data;
      // const uri = imgPicked.path;
      if (base64 || useMock) {
        //TOOD: fix base64 type
        const responseData: Array<Array<{ description: string }>> =
          await callGoogleVisionAsync(base64!, useMock);

        const productsWithPrices =
          convertGooleApiResponseToProducts(responseData);

        recipeContext.setProductsWithPrices(productsWithPrices);

        console.log(productsWithPrices);
        navigation.navigate(Screen.PRODUCTS);
      }
    },
    [navigation, recipeContext],
  );

  return (
    <View style={style.main}>
      <Logo />
      <Button style={style.button} mode="contained" onPress={takeImage}>
        Take image
      </Button>
      {env === 'dev' && (
        <Button mode="contained" onPress={() => convertToText(undefined, true)}>
          Use mocks
        </Button>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  main: {
    backgroundColor: '#3F454F',
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 20,
    width: '70%',
  },
});
