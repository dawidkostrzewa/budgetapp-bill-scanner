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

  const convertToText = useCallback(
    async (useMock?: boolean) => {
      const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_API_TOKEN}`;
      console.log(API_URL);

      const base64 = image?.data;
      // const uri = imgPicked.path;
      if (base64 || useMock) {
        //TOOD: fix base64 type
        const responseData: Array<Array<{ description: string }>> =
          await callGoogleVisionAsync(base64!, API_URL, useMock);

        const productsWithPrices = responseData.map(data => {
          const lineArrLenth = data.length;
          const nameSections = data
            .slice(0, lineArrLenth - 3)
            .map(item => item.description)
            .join(' ')
            .slice(0, 20);
          const priceSections = data
            .slice(lineArrLenth - 2)
            .map(item => item.description)
            .join(' ')
            .slice(0, -1)
            .split(' ')
            .filter(item => !!item)
            .map(item => item.replace(',', '.'));

          return {
            product: nameSections,
            price: +(priceSections.length === 2
              ? priceSections[1]
              : priceSections[0]),
          };
        });
        recipeContext.setProductsWithPrices(productsWithPrices);

        console.log(productsWithPrices);
        navigation.navigate('Products');
      }
    },
    [image?.data, navigation, recipeContext],
  );

  useEffect(() => {
    if (image) {
      convertToText();
    }
  }, [image]);

  return (
    <View>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="Take image" onPress={takeImage} />
      <Button title="Use mocks" onPress={() => convertToText(true)} />
      {/* {image && (
        <Image
          source={{ uri: image.path }}
          style={{ width: 400, height: 300, resizeMode: 'contain' }}
        />
      )} */}
    </View>
  );
};
