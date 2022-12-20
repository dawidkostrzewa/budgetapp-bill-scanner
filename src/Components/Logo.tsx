import React from 'react';
import { Image, StyleSheet } from 'react-native';

export const Logo = () => (
  <Image style={style.logo} source={require('../images/bbs-logo.png')} />
);

const style = StyleSheet.create({
  logo: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    justifyContent: 'center',
  },
});
