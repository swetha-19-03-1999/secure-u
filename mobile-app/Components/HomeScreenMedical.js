
// HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import SQLite from 'react-native-sqlite-storage';
import HeaderComponent from './Header';
import BottomNavigation from './bottom_nav';
// import SOSButton from './SOSButton'
import ReportIncidentButton from './ReportIncidents';
import MedicalEmergencyButton from './MedicalEmergency';

const HomeScreenMedical = ({route, navigation}) => {
  const profileImage = route?.params?.user_profileImage;
  const [userInfo, setUserInfo] = useState({});
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    // Function to get the user ID from the local SQLite database
    const getUserId = () => {
        const db = SQLite.openDatabase({ name: 'mydb.db' });

        db.transaction(tx => {
            tx.executeSql('SELECT * FROM users', [], (tx, results) => {
                if (results.rows.length > 0) {
                    const userIdFromDb = results.rows.item(0).user_id;
                    setUserId(userIdFromDb); // Set the user ID in state
                }
            });
        });
    };

    // Call the function to get the user ID
    getUserId();
}, []);

useEffect(() => {
    if (userId) {
        // Make the API request only after userId is set
        axios.get(`http://192.168.1.116:3001/user-info?user_id=${userId}`)
            .then(response => {
                setUserInfo(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }
}, [userId]);
  return (
    <View style={styles.container}>
      <HeaderComponent user_profileImage={profileImage || userInfo.user_profile_pic}/>
      <MedicalEmergencyButton/>
      <BottomNavigation user_profileImage={profileImage || userInfo.user_profile_pic}/>
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
