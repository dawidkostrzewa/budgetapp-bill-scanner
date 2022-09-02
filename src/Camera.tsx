import {
  useCameraDevices,
  Camera,
  useIsAppForeground,
} from 'react-native-vision-camera';
import React, {useEffect, useRef} from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import {CONTENT_SPACING, SAFE_AREA_PADDING} from './Constans';
import RNFS from 'react-native-fs';
const SCALE_FULL_ZOOM = 3;
const BUTTON_SIZE = 40;
import {URL as url} from 'react-native-url-polyfill';

export const CameraComponent = () => {
  const [auth, setAuth] = React.useState(false);
  const [photoPath, setPhotoPath] = React.useState('');

  const devices = useCameraDevices('wide-angle-camera');
  //   console.log(devices);
  const device = devices.back;

  const camera = useRef<Camera>(null);

  const takePoto = async () => {
    if (camera.current) {
      const photo = await camera.current.takePhoto({
        flash: 'on',
      });

      const localImgUrl = `file://${photo.path}`;

      setPhotoPath(localImgUrl);
      console.log(localImgUrl);
    }
  };

  const getPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    console.log(newCameraPermission);
    setAuth(newCameraPermission === 'authorized');
  };

  if (device == null || !auth) {
    return (
      <Button title="Permission" onPress={getPermission}>
        Get permission
      </Button>
    );
  }
  return (
    <View style={styles.container}>
      <Camera
        device={device}
        style={StyleSheet.absoluteFill}
        ref={camera}
        isActive={true}
        photo={true}
        orientation="portrait"
      />

      <Button onPress={takePoto} title="take" style={styles.captureButton}>
        Take foto
      </Button>

      {photoPath && (
        <Image
          source={{
            width: 300,
            height: 300,
            uri: photoPath,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'black',
    height: 500,
  },
  captureButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: SAFE_AREA_PADDING.paddingBottom,
  },
  button: {
    marginBottom: CONTENT_SPACING,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: 'rgba(140, 140, 140, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButtonRow: {
    position: 'absolute',
    right: SAFE_AREA_PADDING.paddingRight,
    top: SAFE_AREA_PADDING.paddingTop,
  },
  text: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
