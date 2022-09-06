import React, {useState} from 'react';
import {Button, Image, Text, View} from 'react-native';

import * as ImagePicker from 'react-native-image-crop-picker';
import callGoogleVisionAsync from './api';

// TODO: type https://github.com/goatandsheep/react-native-dotenv
// @ts-ignore
import {GOOGLE_API_TOKEN} from '@enviroment';

export const ImagePickerComponent = () => {
  const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_API_TOKEN}`;
  console.log(API_URL);
  const [image, setImage] = useState('');
  const [response, setResponse] = useState<{product: string; price: number}[]>(
    [],
  );
  const pickImage = async () => {
    const imgPicked: ImagePicker.Image = await ImagePicker.openCamera({
      cropping: true,
      includeBase64: true,
      freeStyleCropEnabled: true,
      compressImageQuality: 0.3,
    });

    const base64 = imgPicked.data;
    const uri = imgPicked.path;
    setImage(uri);

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
  };
  return (
    <View>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image
          source={{uri: image}}
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
