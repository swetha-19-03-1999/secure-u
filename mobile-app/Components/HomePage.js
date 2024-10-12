import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import SOSButton from './SOSButton';
import { useNavigation } from '@react-navigation/native';

function HomePage() {
  const [showAlert, setShowAlert] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setShowAlert(false);
  }, []);

  const onHandleNavigation = (val) => {
    setShowAlert(true);
    if(val !== "help"){
        navigation.navigate(val);
    }
  };
console.log('ddjf')
  return (
    // !showAlert &&
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.subHeadingText}>Please select the respective alert button</Text>
      </View>
      {/* Row 1: Two Buttons */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: 'red'}]}
          onPress={()=>onHandleNavigation('Sos')}>
          {/* <Text style={styles.buttonText}> */}
          <Image source={require('./Images/emergency.png')} style={styles.image} />
          {/* </Text> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: 'green'}]}
          onPress={() => onHandleNavigation('Mdicalemergency')}>
          {/* <Text style={styles.buttonText}> */}
          <Image source={require('./Images/medical.png')} style={styles.image} />
          {/* </Text> */}
        </TouchableOpacity>
      </View>

      {/* Row 2: Two Buttons */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: 'blue'}]}
          onPress={() => onHandleNavigation("Reportincident")}>
          {/* <Text style={styles.buttonText}> */}
          <Image source={require('./Images/incident.png')} style={styles.image} />
          {/* </Text> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: 'yellow'}]}
          onPress={()=>onHandleNavigation('help')}>
          <Text style={styles.buttonText}>Help</Text>
        </TouchableOpacity>
      </View>

      {/* Conditional rendering for SOS Button */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center buttons vertically
    alignItems: 'center', // Center buttons horizontally
    backgroundColor: 'lightgray',
  },
  row: {
    flexDirection: 'row', // Align buttons in a row
    marginBottom: 20, // Add space between rows
  },
  button: {
    marginHorizontal: 10, // Space between buttons
    width: 150, // Set width for equal sizing
    height: 100, // Set height for the buttons
    justifyContent: 'center', // Center the text vertically
    alignItems: 'center', // Center the text horizontally
    borderRadius: 10, // Rounded corners
  },
  buttonText: {
    color: '#fff', // White text color for contrast
    fontSize: 16, // Font size for readability
    fontWeight: 'bold',
  },
  subHeadingText: {
    fontSize: 24, // Font size for readability
    fontWeight: 'bold',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
});

export default HomePage;
