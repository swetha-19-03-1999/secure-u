import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable, TouchableWithoutFeedback } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const HeaderComponent = () => {
  const navigation =  useNavigation();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  const logOut = () => {
    const db = SQLite.openDatabase({ name: 'mydb.db', location: 'default' });

    db.transaction(tx => {
      console.log("Logged out");
      tx.executeSql('DELETE FROM users');
      navigation.navigate('Landing');
    });
    setDropdownVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={closeDropdown}>
    <View style={styles.headerContainer}>
      <Image source={require('./Images/logo.png')} style={styles.image} />
      <View style={styles.text_view}>
        <Text style={styles.text_1}>Secure-</Text>
        <Text style={styles.text_2}>U</Text>
      </View>

      {/* Profile image and dropdown trigger */}
      <TouchableOpacity onPress={toggleDropdown}>
        <Image source={require('./Images/profile.jpg')} style={styles.profile} />
      </TouchableOpacity>

      {/* Dropdown menu */}
      {dropdownVisible && (
        <View style={styles.dropdownMenu}>
          <Pressable
            style={[
              styles.menuItem,
              isHovered && styles.menuItemHovered, // Apply hover effect
            ]}
            onPress={logOut}
            onPressIn={() => setIsHovered(true)} // Simulate hover when pressed
            onPressOut={() => {
              setIsHovered(false);
            }} // Remove hover effect when not pressed
          >
            <Text style={styles.menuItemText}>Logout</Text>
          </Pressable>
        </View>
      )}
    </View>
    </TouchableWithoutFeedback>
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
    height: 100,
    zIndex: 10, // Ensure it appears on top
  },
  image: {
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
  text_2: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3B9AB2',
  },
  profile: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    borderRadius: 75,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 70, // Adjusted to make the dropdown appear properly
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 5, // For shadow effect
    width: 120,
    zIndex: 20, // Ensures the menu appears on top of other components
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  menuItemHovered: {
    backgroundColor: '#3B9AB2', // Light gray for hover effect
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default HeaderComponent;
