import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert, Image} from 'react-native';

const BottomNavigation = ({}) => {
 const navigation =  useNavigation()
  
  const handlePressHome = () =>{
    navigation.navigate('Home');
  }

  const handlePressProfile = () =>{
    navigation.navigate('Profile');
  }

  const handlePressWellbeing = () =>{
    navigation.navigate('Wellbeing');
  }

  const handlePressIncidenttracker = () =>{
    navigation.navigate('Incidenttracker');
  }

  const handlePressSecureZone = () =>{
    navigation.navigate('Securezone');
  }

  const handlePressCommunity = () =>{
    navigation.navigate('Community');
  }
  
  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={handlePressHome}>
        {/* <Text style={styles.iconText}>Home</Text> */}
        <Image source={require('./Images/home.png')} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={handlePressSecureZone}>
        {/* <Text style={styles.iconText}>Secure Zone</Text> */}
        <Image source={require('./Images/Tracker1.png')} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={handlePressIncidenttracker}>
        {/* <Text style={styles.iconText}>Tracker</Text> */}
        <Image source={require('./Images/Tracker.png')} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={handlePressWellbeing}>
      <Image source={require('./Images/Wellbeing1.png')} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={handlePressProfile}>
        {/* <Text style={styles.iconText}>Profile</Text> */}
        <Image source={require('./Images/Profile.png')} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={handlePressCommunity}>
        {/* <Text style={styles.iconText}>Community</Text> */}
        <Image source={require('./Images/Community.png')} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 100,
    backgroundColor: '#484848',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 12,
    color: '#3B9AB2',
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default BottomNavigation;
