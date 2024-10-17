import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handleForgotPassword = async () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email.');
            return;
        }

        try {
            const response = await axios.post('http://192.168.1.116:3001/forgot-password', {
                email: email,
            });

            if (response.status === 200) {
                Alert.alert('Success', 'Password reset link sent to your email.');
                navigation.goBack(); // Navigate back to the login screen
            } else {
                Alert.alert('Error', 'Failed to send password reset link.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred while sending the reset link.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Forgot Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#ffffff"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleForgotPassword}
            >
                <Text style={styles.buttonText} onPress={()=>navigation.navigate('Login')}>Send Reset Link</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#484848',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    input: {
        width: '100%',
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#778899',
        borderRadius: 5,
        borderColor: '#778899',
        borderWidth: 1,
        borderRadius: 25,
    },
    button: {
        backgroundColor: '#3B9AB2',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 25,
        width: '70%',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ForgotPasswordScreen;