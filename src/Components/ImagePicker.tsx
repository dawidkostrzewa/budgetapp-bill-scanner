import React from 'react';
import { NativeModules, StyleSheet, View } from 'react-native';

import * as ImagePicker from 'react-native-image-crop-picker';
import callGoogleVisionAsync from '../api';

import { useRecipe } from '../Context/RecipeContext/useRecipe';
import { Screen } from '../Screens/screens';
import { convertGooleApiResponseToProducts } from '../utils/textRecognision.utils';
import { Logo } from './Logo';
import { Button } from 'react-native-paper';

export const ImagePickerComponent = ({ navigation }: any) => {
  // const env = NativeModules.RNConfig.env as 'dev' | 'production';
  const env = 'production';
  const recipeContext = useRecipe();

  // TODO: move to cameera utils
  const takeImage = async (picker?: boolean) => {
    console.log('asdsa');

    if (picker) {
      return openPicked();
    }

    const imgPicked: ImagePicker.Image = await ImagePicker.openCamera({
      cropping: true,
      includeBase64: true,
      freeStyleCropEnabled: true,
      compressImageQuality: 0.3,
    });
    return imgPicked;
  };

  const openPicked = async () => {
    const imgPicked: ImagePicker.Image = await ImagePicker.openPicker({
      cropping: true,
      includeBase64: true,
      freeStyleCropEnabled: true,
      compressImageQuality: 0.3,
      smartAlbums: [
        'PhotoStream',
        'Generic',
        'Panoramas',
        'Videos',
        'Favorites',
        'Timelapses',
        'AllHidden',
        'RecentlyAdded',
        'Bursts',
        'SlomoVideos',
        'UserLibrary',
        'SelfPortraits',
        'Screenshots',
        'DepthEffect',
        'LivePhotos',
        'Animated',
        'LongExposure',
      ],
    });
    return imgPicked;
  };

  const convertToText = async (img?: ImagePicker.Image, useMock?: boolean) => {
    const base64 = img?.data;
    console.log(img);
    if (base64 || useMock) {
      //TOOD: fix base64 type
      const responseData: Array<Array<{ description: string }>> =
        await callGoogleVisionAsync(base64!, useMock);

      const productsWithPrices =
        convertGooleApiResponseToProducts(responseData);

      recipeContext.setProductsWithPrices(productsWithPrices);

      console.log(productsWithPrices);
    }
  };

  const convertImageToRecipe = async (picker?: boolean) => {
    console.log('here');
    try {
      const image = await takeImage(picker);
      recipeContext.setRecipeImage(image.path);
      recipeContext.handleProductsLoading(true);
      navigation.navigate(Screen.PRODUCTS);
      await convertToText(image);
      recipeContext.handleProductsLoading(false);
    } catch (e) {
      console.log('error', e);
      navigation.navigate(Screen.MAIN);
    }
  };

  const runMocks = () => {
    convertToText(undefined, true);
    navigation.navigate(Screen.PRODUCTS);
  };

  return (
    <View style={style.main}>
      <Logo />
      <Button
        style={style.button}
        mode="contained"
        onPress={() => convertImageToRecipe(false)}>
        Take image
      </Button>
      <Button
        style={style.button}
        mode="contained"
        onPress={() => convertImageToRecipe(true)}>
        Select from gallery
      </Button>
      {env === 'dev' && (
        <Button mode="contained" onPress={runMocks}>
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
