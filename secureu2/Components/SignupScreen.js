// SignUpScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
const SignUpScreen = ({ navigation }) => {
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        user_password: '',
        confirmPassword: '',
    });

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {

        const { user_name, user_email, user_password, confirmPassword } = formData;
        // Alert(user_name,user_email,user_password)
        // Basic validation
        if (!user_name || !user_email || !user_password || !confirmPassword) {
            Alert.alert('Error', 'All fields are required.');
            return;
        }
        if (user_password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }
        
        // Communicate with backend
        try {

            console.log(JSON.stringify({
                user_name:user_name,
                user_email:user_email,
                user_password:user_password,
            }))
            const response = await axios.post('http://192.168.0.126:3001/users',{
                user_name:user_name,
                user_email:user_email,
                user_password:user_password,
            } );
            if (response.status === 201) {
                Alert.alert('Success', 'User registered successfully!');
                navigation.navigate('Login')
            } else {
                Alert.alert('Error', 'Registration failed.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred during registration.');
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('./Images/logo.png')} // Ensure the logo path is correct
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.header}>Sign Up</Text>
            <View >
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor="#ffffff"
                    value={formData.user_name}
                    onChangeText={(text) => handleChange('user_name', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#ffffff"
                    value={formData.user_email}
                    onChangeText={(text) => handleChange('user_email', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#ffffff"
                    value={formData.user_password}
                    onChangeText={(text) => handleChange('user_password', text)}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Re-enter Password"
                    placeholderTextColor="#ffffff"
                    value={formData.confirmPassword}
                    onChangeText={(text) => handleChange('confirmPassword', text)}
                    secureTextEntry
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
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
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white'
    },
    logo: {
        width: 150,
        height: 150,

    },
    input: {
        width: 300,
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#7b959c',
        borderRadius: 5,
        borderColor: '#778899',
        borderWidth: 1,
        borderRadius: 25,
    },
    button: {
        backgroundColor: '#3B9AB2', // Button color
        paddingVertical: 7, // Vertical padding
        paddingHorizontal: 30, // Horizontal padding
        borderRadius: 25, // Rounded corners
        width: '70%', // Button width
        alignItems: 'center', // Center text
        justifyContent:'center',
        marginTop: 50,
        marginLeft:80
    },
    buttonText: {
        color: '#fff', // Text color
        fontSize: 18, // Font size
        fontWeight: 'bold',
    },
});

export default SignUpScreen;
