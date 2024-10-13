
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderComponent from './Header';
import BottomNavigation from './bottom_nav';
import SOSButton from './SOSButton';

const SosButtonWrapper = ({navigation}) => {
  return (
    <View style={styles.container}>
      <HeaderComponent/>
      <SOSButton/>
      <BottomNavigation/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
  },
});

export default SosButtonWrapper;
