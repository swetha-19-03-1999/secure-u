import React, { useState } from 'react';
import { View, Text,Image, Button, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const HeaderComponent = ({ navigation }) => {
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  // Function to toggle logout modal
  const toggleLogoutModal = () => {
    setLogoutModalVisible(!isLogoutModalVisible);
  };

  // Function to handle the logout action
  const handleLogout = () => {
    // Here, implement your logout logic (e.g., clearing user session, navigating to login screen)
    console.log('User has logged out');
    const db = SQLite.openDatabase({ name: 'mydb.db', location: 'default' });

    db.transaction(tx => {
        tx.executeSql(' DELETE FROM users') 
    });
  
    toggleLogoutModal();  // Close the dialog
    navigation.navigate('Login')
  };

  return (
    <View style={styles.headerContainer}>
            <Image source={require('./Images/logo.png')} style={styles.image} />
            <View style={styles.text_view}>
        <Text style={styles.text_1}>Secure-</Text>
        <Text style={styles.text_2}>U</Text>
      </View>

  {userDetails.user_profile_pic?  <TouchableOpacity onPress={toggleLogoutModal}> <Image source={{uri:'http://192.168.0.126:3001/'+userDetails.user_profile_pic}} style={styles.profile}  /></TouchableOpacity>
   : <TouchableOpacity onPress={() => toggleLogoutModal}><Image source={require('./Images/profile.jpg')}  style={styles.profile} onPress={()=>toggleLogoutModal} /></TouchableOpacity>} 
      {/* Button to open the logout dialog */}

      <Button title="Logout" onPress={toggleLogoutModal} />

      {/* Logout Confirmation Dialog */}
      <Modal
        visible={isLogoutModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleLogoutModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Logout</Text>
            <Text style={styles.modalMessage}>Are you sure you want to log out?</Text>

            <View style={styles.buttonContainer}>
              {/* Yes Button */}
              <TouchableOpacity style={styles.yesButton} onPress={handleLogout}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>

              {/* No Button */}
              <TouchableOpacity style={styles.noButton} onPress={toggleLogoutModal}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({


  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#484848',
    height:100,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height:100
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  yesButton: {
    flex: 1,
    backgroundColor: '#ff6347',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  noButton: {
    flex: 1,
    backgroundColor: '#32cd32',
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  text_view: {
    flexDirection: 'row',
  },
  text_1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  text_2:{
    fontSize: 28,
    fontWeight: 'bold',
    color:'#3B9AB2'
  },
  profile:{
    width: 40,
    height: 40,
    resizeMode: 'contain',
    borderRadius: 75,
  }
});

export default HeaderComponent;
