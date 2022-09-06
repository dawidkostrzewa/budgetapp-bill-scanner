import React, {useCallback, useEffect, useState} from 'react';
import {Button, Image, Text, View} from 'react-native';

import * as ImagePicker from 'react-native-image-crop-picker';
import callGoogleVisionAsync from './api';

// TODO: type https://github.com/goatandsheep/react-native-dotenv
// @ts-ignore
import {GOOGLE_API_TOKEN} from '@enviroment';

export const ImagePickerComponent = () => {
  const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_API_TOKEN}`;
  console.log(API_URL);
  const [image, setImage] = useState<ImagePicker.Image | undefined>(undefined);
  const [response, setResponse] = useState<{product: string; price: number}[]>(
    [],
  );

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
    const base64 = image?.data;
    // const uri = imgPicked.path;
    if (base64) {
      const responseData: string[] = await callGoogleVisionAsync(
        base64,
        API_URL,
      );
      console.log(responseData);

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

      console.log(products, prices);

      setResponse(productsWithPrices);
    }
  }, [API_URL, image?.data]);

  useEffect(() => {
    convertToText();
  }, [convertToText, image]);

  return (
    <View>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="Take image" onPress={takeImage} />
      {image && (
        <Image
          source={{uri: image.path}}
          style={{width: 400, height: 300, resizeMode: 'contain'}}
        />
      )}
      {response.map((x, idx) => (
        <View
          key={idx}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Text>{x.product}</Text>
          <Text>{x.price}</Text>
        </View>
      ))}
    </View>
  );
};
