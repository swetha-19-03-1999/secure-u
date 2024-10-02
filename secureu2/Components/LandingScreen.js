// LoginScreen.js
import React from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';

const LandingScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('./Images/logo.png')} // Ensure the logo path is correct
                style={styles.logo}
                resizeMode="contain"
            />
            <View style={styles.appname}>
                <Text style={styles.text1}>Secure-</Text>
                <Text style={styles.text2}>U</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button1}
                    
                    onPress={() => {
                        // Handle login navigation
                        navigation.navigate('Login')
                    }}
                >
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
                <View style={styles.spacer} />
                <TouchableOpacity
                    style={styles.button2}
                    onPress={() => {
                        navigation.navigate('SignUp')
                       
                    }}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#484848',
        paddingHorizontal: 20,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom:40
    },
    appname: {
        justifyContent: 'center', // Center elements vertically
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom:70
    },
    text1: {
        fontSize: 50,
        fontWeight: 'bold',
    },
    text2: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#3B9AB2'
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    spacer: {
        height: 20, // Space between buttons
    },

    button1: {
        backgroundColor: '#3B9AB2', // Button color
        paddingVertical: 7, // Vertical padding
        paddingHorizontal: 30, // Horizontal padding
        borderRadius: 25, // Rounded corners
        width: '70%', // Button width
        alignItems: 'center', // Center text
    },
    button2: {
        backgroundColor: '#3FB6D3', // Button color
        paddingVertical: 7, // Vertical padding
        paddingHorizontal: 30, // Horizontal padding
        borderRadius: 25, // Rounded corners
        width: '70%', // Button width
        alignItems: 'center', // Center text
    },
    buttonText: {
        color: '#fff', // Text color
        fontSize: 18, // Font size
        fontWeight: 'bold',
    },
});

export default LandingScreen;
