import React, { useState } from 'react';
import { View, Text, Button, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const LogoutDialogExample = () => {
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  // Function to toggle logout modal
  const toggleLogoutModal = () => {
    setLogoutModalVisible(!isLogoutModalVisible);
  };

  // Function to handle the logout action
  const handleLogout = () => {
    // Here, implement your logout logic (e.g., clearing user session, navigating to login screen)
    console.log('User has logged out');
    toggleLogoutModal();  // Close the dialog
  };

  return (
    <View style={styles.container}>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
});

export default LogoutDialogExample;
