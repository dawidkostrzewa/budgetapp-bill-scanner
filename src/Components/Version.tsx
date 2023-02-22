import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useConfig } from '../Context/ConfigContext/useConfig';

export const Version = () => {
  const { env } = useConfig();
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
