import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ReportIncidentButton = () => {
  const navigation =  useNavigation()
  
  const handleNext = () =>{
    navigation.navigate('Mdicalemergency');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Report Incidents</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNext}>
        <Text style={styles.nextbtn}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginTop:-80,
     flexDirection:'row'
  },
  button: {
    backgroundColor: '#3B9AB2', // Button background color
    paddingVertical: 145,
    paddingHorizontal: 80,
    borderRadius: 300, // Border radius for rounded corners
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white', // Text color
    fontSize: 20,
    fontWeight: 'bold',
  },
  nextbtn:{
    marginLeft:10,
    fontSize:20,
    color:'#484848',
  }
});

export default ReportIncidentButton;
