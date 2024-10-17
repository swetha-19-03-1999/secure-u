// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderComponent from './Header';
import BottomNavigation from './bottom_nav';
import SOSButton from './SOSButton';
import ReportIncidentButton from './ReportIncidents';
import HomePage from './HomePage';

const HomeScreen = ({route, navigation}) => {
  const profileImage = route?.params?.user_profileImage;
  return (
    <View style={styles.container}>
      <HeaderComponent user_profileImage={profileImage}/>
      <HomePage />
      {/* <SOSButton/> */}
      {/* <ReportIncidentButton/> */}
      <BottomNavigation user_profileImage={profileImage} />
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

export default HomeScreen;
