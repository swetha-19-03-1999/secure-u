import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import HeaderComponent from '../Header';
import BottomNavigation from '../bottom_nav';
import SQLite from 'react-native-sqlite-storage';

const ProfileThanku= ({ route, navigation }) => {
    const { user_profileImage } = route?.params;
    const handleNext = async () => {
        navigation.navigate('Home', {user_profileImage: user_profileImage}); // Navigate to the NextScreen
      };
    return (
        <View style={styles.container}>
            <HeaderComponent user_profileImage={user_profileImage} />
            <Text style={styles.header}>Profile</Text>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Thank You !</Text>
                    <Text style={styles.text}>Your Profile is set</Text>
                    <Text style={styles.text}>up</Text>
                    <TouchableOpacity style={styles.button} onPress={handleNext}>
                        <Text style={styles.buttonText}>Done</Text>
                    </TouchableOpacity>
                </View>
            <BottomNavigation user_profileImage={user_profileImage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white', // Light blue background color
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 0,
        color: 'white',
        backgroundColor: '#3B9AB2',
        padding: 10
    },
    
    textContainer: {
        alignItems: 'center', // Center the button horizontally
        marginTop: 140,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    text:{
        fontSize:40,
        color:'#484848'
    },
    button: {
        backgroundColor: '#3B9AB2', // Button color
        borderRadius: 25, // Rounded corners
        borderWidth: 2, // Border width
        borderColor: '#3B9AB2', // Border color
        paddingVertical: 0,
        paddingHorizontal: 120,
        marginTop:120,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
    },
});

export default ProfileThanku;
