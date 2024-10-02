import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ProfileComponent = ({ navigation }) => {
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => navigation.navigate('Login') },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <TouchableOpacity
        style={styles.profileContainer}
        onPress={() => setShowLogout(!showLogout)} // Toggle the logout button visibility
      >
        <Image
          source={{ uri: 'https://images.pexels.com/photos/28578372/pexels-photo-28578372/free-photo-of-portrait-of-senior-man-with-beard-and-chain.jpeg' }} // Replace with your profile image URL
          style={styles.profileImage}
        />
      </TouchableOpacity>

      {/* Conditional Logout Button */}
      {showLogout && (
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  
  profileContainer: {
    position: 'absolute', // Position absolute to place it in the top-right corner
    top: 30,
    right: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Circle image
    borderWidth: 2,
    borderColor: '#ddd',
  },
  logoutButton: {
    marginTop: 10,
    backgroundColor: '#FF6347',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    position: 'absolute',
    top: 90, // Adjust this value based on where you want the logout button to appear
    right: 20,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
});





export default ProfileComponent;
