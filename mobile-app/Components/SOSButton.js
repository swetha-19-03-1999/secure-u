import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal, Linking, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { launchCamera } from 'react-native-image-picker'; // For video recording
import { getLocation } from './helper/getGeoLocation';

const SOSButton = ({userInfo}) => {
  const [countdown, setCountdown] = useState(0);
  const [location, setLocation] = useState(null);
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [sosDetails, setSosDetails] = useState({});
  const [securityNumber, setSecurityNumber] = useState('+61 456 252 985');

  const audioRecorderPlayer = new AudioRecorderPlayer();

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.CAMERA,
        ]);

        return granted;
      } catch (err) {
        console.warn(err);
        return null;
      }
    }
  };

  const handleSOSPress = () => {
    setCountdown(5);
    setButtonEnabled(false);
  };

  useEffect(()=>{
    handleSOSPress();
  },[])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (countdown === 0 && location === null && !buttonEnabled) {
      triggerSOS();
    }
  }, [countdown]);

  const triggerSOS = () => {
    const db = SQLite.openDatabase({ name: 'mydb.db' });

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM users', [], (tx, results) => {
        const rows = results.rows;
        userIds = rows.item(0).user_id;
      });
    });

    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        const locations = await getLocation();
        const sosData = {
          user_id: userIds,
          incident_mode: 1,
          description: 'SOS',
          latitude: locations.latitude,
          longitude: locations.longitude,
        };
        
        try {
          const response = await axios.post('http://192.168.1.116:3001/newsosalert', sosData);
          setSosDetails(sosData);
          setModalVisible(true); // Open the modal after SOS is triggered
          setButtonEnabled(true);
        } catch (error) {
          Alert.alert('Error', 'Failed to send SOS alert');
          setButtonEnabled(true);
          console.error(error);
        }
      },
      error => {
        console.error('Error getting location:', error);
        setButtonEnabled(true);
        Alert.alert('Error', 'Error getting location');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
    );
  };

  // Function to send the SMS when the button inside the modal is clicked
  const sendSMSToEmergencyContact = () => {
    const message = 'This is an automated message. I am in danger and need immidiate help. University security is on the way to help me.';
    const smsUrl = `sms:${userInfo?.user_emergency_contact_number}?body=${encodeURIComponent(message)}`;
    
    Linking.openURL(smsUrl)
      .then(() => console.log('SMS sent successfully'))
      .catch(err => console.error('Failed to send SMS:', err));
  };

  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('Reportincident');
  };

  const dialSecurityNumber = () => {
    Linking.openURL(`tel:${securityNumber}`);
  };

  const recordAudio = async () => {
    await requestPermissions();
    try {
      const path = Platform.select({
        ios: 'hello.m4a',
        android: '/sdcard/hello.mp4',
      });
      await audioRecorderPlayer?.startRecorder(path);
      audioRecorderPlayer.addRecordBackListener(e => {
        console.log('Recording time: ', e.current_position);
        return;
      });
    } catch (error) {
      console.error('Audio recording error: ', error);
    }
  };

  const stopRecordingAudio = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    console.log('Audio file path: ', result);
    // You can send the file to the backend here
  };

  const recordVideo = async () => {
    await requestPermissions();
    launchCamera(
      {
        mediaType: 'video',
        videoQuality: 'high',
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled video recording');
        } else if (response.errorCode) {
          console.log('Video recording error: ', response.errorMessage);
        } else {
          console.log('Video file path: ', response.uri);
          // You can send the video file to the backend here
        }
      }
    );
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
      {/* <TouchableOpacity onPress={handleNext}>
        <Text style={styles.nextbtn}>Next</Text>
      </TouchableOpacity> */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.card}>
            <Text style={styles.cardText}>The Security is on the way</Text>

            <TouchableOpacity onPress={dialSecurityNumber}>
              <Text style={[styles.cardText, styles.linkText]}>
                Security Number: {securityNumber}
              </Text>
            </TouchableOpacity>
          </View>

          {/* SMS Button inside Modal */}
          <TouchableOpacity
            style={styles.smsButton}
            onPress={sendSMSToEmergencyContact} // Trigger SMS when this button is clicked
          >
            <Text style={styles.smsButtonText}>Send SMS</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.recordButton}
            onPress={recordAudio}
          >
            <Text style={styles.recordButtonText}>Record Audio</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.recordButton}
            onPress={recordVideo}
          >
            <Text style={styles.recordButtonText}>Record Audio and Video</Text>
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
  smsButton: {
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  smsButtonText: {
    color: '#fff',
    fontSize: 18,
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
  recordButton: {
    marginTop: 10,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  recordButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  card: {
    backgroundColor: '#f7ddad',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
  },
  cardText: {
    color: '#0d0c0d',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default SOSButton;

