import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';

const MedicalEmergencyButton = () => {
  const [countdown, setCountdown] = useState(0);
  const [location, setLocation] = useState(null);
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const [userId,setuserid]=useState(0)

  const handleSOSPress = () => {
    setCountdown(5);
    setButtonEnabled(false); // Disable the button when clicked
  };

  useEffect(()=>{
    handleSOSPress();
  },[])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(countdown - 1);
      }, 500);

      return () => clearInterval(timer);
    } else if (countdown === 0 && location === null && !buttonEnabled) {
      triggerSOS();
    }
  }, [countdown]);

  const triggerSOS = () => {
    const db = SQLite.openDatabase({ name: 'mydb.db' });

    // Create table and insert data
db.transaction(tx => {
  console.log("everything good :: 2 " );
   tx.executeSql('SELECT * FROM users', [], (tx, results) => {
      const rows = results.rows;
      userIds=rows.item(0).user_id

      for (let i = 0; i < rows.length; i++) {
        setuserid(rows.item(i).user_id)
          //console.log("everything good medical emergency:: "+JSON.stringify(rows.item(i)) );
          //rows.item(i).status==1?navigation.replace('Home'):navigation.replace('Landing')
          
      }
  });
});
    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });


        const sosData = {
          user_id: userIds, // Replace with actual user ID
          incident_mode: 2, // Replace with actual accident mode
          description: 'Medical Emergency',
          latitude: latitude,
          longitude: longitude,
        };

 console.log("everything good medical :: "+JSON.stringify(sosData))

        try {
          const response = await axios.post('http://192.168.1.116:3001/newsosalert', sosData);

          Alert.alert('Success', 'Medical Emergency Button Trigered  ');
          setButtonEnabled(true);
        } catch (error) {
          Alert.alert('Error', 'Failed Medical Emergency Button ');
          setButtonEnabled(true);
          console.error(error);
        }

      },
      error => {
        console.error('Error getting location:', error);

        setButtonEnabled(true); // Re-enable the button even if there is an error
        Alert.alert('Error', 'Error getting location', error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
    );
  };
  const navigation = useNavigation()

  const handleNext = () => {
    navigation.navigate('Home');
  }
  return (
    <View style={styles.container}>
      <View >
        <TouchableOpacity
          style={[
            styles.sosButton,
            { backgroundColor: buttonEnabled ? '#3B9AB2' : '#484848' } // Change color when disabled
          ]}
          onPress={handleSOSPress}
          disabled={!buttonEnabled}
        >
          <Text style={styles.sosButtonText}>Medical Emergency</Text>
        </TouchableOpacity>
        {countdown > 0 && <Text style={styles.countdownText}>Sec:{countdown}</Text>}
      </View>
      {/* <TouchableOpacity onPress={handleNext}>
        <Text style={styles.nextbtn}>Next</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  sosButton: {
    width: 300,
    height: 300,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50,
  },
  sosButtonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  countdownText: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft:130,
  },
  nextbtn: {
    marginTop:-35,
    marginLeft: 10,
    fontSize: 20,
    color:'#484848',
  }
});

export default MedicalEmergencyButton;
