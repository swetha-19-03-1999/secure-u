
// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderComponent from './Header';
import BottomNavigation from './bottom_nav';
// import SOSButton from './SOSButton'
import ReportIncidentButton from './ReportIncidents';
import MedicalEmergencyButton from './MedicalEmergency';

const HomeScreenMedical = ({navigation}) => {
  return (
    <View style={styles.container}>
      <HeaderComponent/>
      <MedicalEmergencyButton/>
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

export default HomeScreenMedical;
