import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
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
    if (val !== "help") {
      navigation.navigate(val);
    }
  };

  return (
    <View style={styles.container}>

      {/* Row 1: Images in vertical layout */}
      <View style={styles.column}>
        <TouchableOpacity onPress={() => onHandleNavigation('Sos')}>
          <Image source={require('./Images/emergency.png')} style={styles.image} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onHandleNavigation('Reportincident')}>
          <Image source={require('./Images/Report.png')} style={styles.image} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onHandleNavigation('Mdicalemergency')}>
          <Image source={require('./Images/medical.png')} style={styles.image} />
        </TouchableOpacity>
      </View>
      <Text style={styles.subHeadingText}>Once you press the buttons below, your information will be instantly sent to University Security, and immediate action will be taken to ensure your safety.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top', // Center the entire view vertically
    alignItems: 'center', // Center the entire view horizontally
    backgroundColor: 'lightgray',
    paddingHorizontal: 20, // Add some horizontal padding for better layout
  },
  subHeadingText: {
    fontSize: 20, // Font size for readability
    // fontWeight: 'bold',
    marginTop: 60, // Margin below the subheading
    color: "#3B9AB2",
    textAlign: 'center', // Center align the heading text
  },
  column: {
    flexDirection: 'column', // Align images vertically
    justifyContent: 'center', // Center the images vertically
    alignItems: 'center', // Center the images horizontally
    marginTop: 80,
  },
  image: {
    width: 350, // Same width for all images
    height: 100, // Same height for all images
    resizeMode: 'contain',
    marginBottom: 0, // Removed space between images
  },
});

export default HomePage;
