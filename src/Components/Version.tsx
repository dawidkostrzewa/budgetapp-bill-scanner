import React from 'react';
import { NativeModules, StyleSheet, Text } from 'react-native';

export const Version = () => {
  const env = NativeModules.RNConfig.env as 'dev' | 'production';
  return <Text style={styles.text}>{env}</Text>;
};

const styles = StyleSheet.create({
  text: {
    position: 'absolute',
    right: 10,
    bottom: 5,
    color: 'black',
  },
});
