import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';

const SOSButton = () => {
  const [countdown, setCountdown] = useState(0);
  const [location, setLocation] = useState(null);
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [sosDetails, setSosDetails] = useState({}); // State to hold SOS details
  const [securityNumber, setSecurityNumber] = useState('123-456-7890'); // Example security number
  const [userId,setuserid]=useState(0)
  const handleSOSPress = () => {
    setCountdown(5);
    setButtonEnabled(false); // Disable the button when clicked
  };

  useEffect(() => {



    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000); // Changed interval to 1000ms for 1-second countdown

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

     
  });
});
    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
                              
        

        const sosData = {
          user_id: userIds, // Replace with actual user ID
          incident_mode: 1, // Replace with actual accident mode
          description: 'SOS',
          latitude, // Fixed spelling from 'lattitude' to 'latitude'
          longitude,
        };
        try {
          const response = await axios.post('http://192.168.1.116:3001/newsosalert', sosData);
          setSosDetails(sosData); // Save SOS details
          setModalVisible(true); // Show modal on success
          setButtonEnabled(true);
        } catch (error) {
          Alert.alert('Error', 'Failed SOS Button');
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

  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('Reportincident');
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={[styles.sosButton, { backgroundColor: buttonEnabled ? '#3B9AB2' : '#484848' }]}
          onPress={handleSOSPress}
          disabled={!buttonEnabled}
        >
          <Text style={styles.sosButtonText}>SOS</Text>
        </TouchableOpacity>
        {countdown > 0 && <Text style={styles.countdownText}>Sec: {countdown}</Text>}
      </View>
      <TouchableOpacity onPress={handleNext}>
        <Text style={styles.nextbtn}>Next</Text>
      </TouchableOpacity>

      {/* Modal for SOS details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          {/* Card for security details */}
          <View style={styles.card}>
            <Text style={styles.cardText}>The Security is on the way</Text>
            <Text style={styles.cardText}>Security Number: {securityNumber}</Text>
          </View>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 110,
  },
  nextbtn: {
    marginLeft: 10,
    fontSize: 20,
    marginTop: -35,
    color: '#484848',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#3B9AB2',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  card: {
    backgroundColor: '#f7ddad',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: '90%', // Set the width of the card
    alignItems: 'center', // Center the text
  },
  cardText: {
    color: '#0d0c0d',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SOSButton;
