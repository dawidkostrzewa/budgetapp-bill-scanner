import React, { useCallback, useEffect, useState } from 'react';
import { Button, View } from 'react-native';

import * as ImagePicker from 'react-native-image-crop-picker';
import callGoogleVisionAsync from './api';

// TODO: type https://github.com/goatandsheep/react-native-dotenv
// @ts-ignore
import { GOOGLE_API_TOKEN } from '@enviroment';
import { useRecipe } from './Context/useRecipe';
import { useNavigationContainerRef } from '@react-navigation/native';

export const ImagePickerComponent = ({ navigation }) => {
  const [image, setImage] = useState<ImagePicker.Image | undefined>(undefined);
  const navigationRef = useNavigationContainerRef();

  const recipeContext = useRecipe();

  const takeImage = async () => {
    const imgPicked: ImagePicker.Image = await ImagePicker.openCamera({
      cropping: true,
      includeBase64: true,
      freeStyleCropEnabled: true,
      compressImageQuality: 0.3,
    });

    setImage(imgPicked);
  };

  const pickImage = async () => {
    const imgPicked: ImagePicker.Image = await ImagePicker.openPicker({
      cropping: true,
      includeBase64: true,
      freeStyleCropEnabled: true,
      compressImageQuality: 0.3,
    });

    setImage(imgPicked);
  };

  const convertToText = useCallback(async () => {
    const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_API_TOKEN}`;
    console.log(API_URL);

    const base64 = image?.data;
    // const uri = imgPicked.path;
    if (base64) {
      const responseData: string[] = await callGoogleVisionAsync(
        base64,
        API_URL,
      );
      // console.log(responseData);
      console.log('convertToText');

      const items = responseData.length;
      const products = responseData.slice(0, items / 2);
      const prices = responseData.slice(items / 2).map(price => {
        const splitted = price.split(' ');
        return +splitted[splitted.length - 1].slice(0, -1).replace(',', '.');
      });

      const productsWithPrices = products.map((product, index) => {
        return {
          product,
          price: prices[index],
        };
      });

      recipeContext.onUpdatePrices(prices);
      recipeContext.onUpdateProducts(products);
      recipeContext.setProductsWithPrices(productsWithPrices);

      console.log(productsWithPrices);
      navigation.navigate('Products');

      // setResponse(productsWithPrices);
    }
  }, [image?.data, navigationRef, recipeContext]);

  useEffect(() => {
    convertToText();
  }, [image]);

  return (
    <View>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="Take image" onPress={takeImage} />
      {/* {image && (
        <Image
          source={{ uri: image.path }}
          style={{ width: 400, height: 300, resizeMode: 'contain' }}
        />
      )} */}
    </View>
  );
};
