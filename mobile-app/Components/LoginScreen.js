import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const LoginScreen = ({ navigation }) => {
    const [user_email, setUserEmail] = useState('');
    const [user_password, setUser_Password] = useState('');

    const handleLogin = async () => {
        // Basic validation
        if (!user_email || !user_password) {
            Alert.alert('Error', 'Email and password are required.');
            return;
        }
        // Send login request to the backend
        try {
            const response = await axios.post('http://192.168.1.116:3001/login', {
                user_email: user_email,
                user_password: user_password,
            });
            if (response.status === 200) {
                if (response.data.length > 0) {
                    const db = SQLite.openDatabase({ name: 'mydb.db' });
                    db.transaction(tx => {
                        tx.executeSql('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, user_id INTEGER, status INTEGER)');
                        tx.executeSql('DELETE FROM users');
                        tx.executeSql('INSERT INTO users (user_id, status) VALUES (?,?)', [response.data[0].user_id, 1]);
                        tx.executeSql('SELECT * FROM users', [], (tx, results) => {
                            const rows = results.rows;
                            for (let i = 0; i < rows.length; i++) {
                                console.log("everything good :: " + JSON.stringify(rows.item(i).user_id));
                            }
                        });
                    });
                    // Alert.alert('Success', 'Login successful');
                    if(response.data[0]?.user_profile_pic){
                        navigation.navigate('Home', { user_profileImage: response.data[0].user_profile_pic })
                    }else{
                        navigation.navigate('Profile', { userId: response.data[0].user_id, user_profileImage: response.data[0].user_profile_pic });
                    }
                } else {
                    Alert.alert('Error', 'Invalid credentials');
                }
            } else {
                Alert.alert('Error', 'Login failed.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred during login.');
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('./Images/logo.png')} // Ensure the logo path is correct
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.header}>Log In</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#ffffff"
                value={user_email}
                onChangeText={setUserEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#ffffff"
                value={user_password}
                onChangeText={setUser_Password}
                secureTextEntry
            />
            {/* Forgot Password Link */}
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>Login</Text>
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
        color: 'white'
    },
    logo: {
        width: 150,
        height: 150,
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
        paddingVertical: 7,
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
    forgotPasswordText: {
        color: '#ffffff',
        marginTop: 15,
        fontSize: 16,
        textDecorationLine: 'underline',
    }
});

export default LoginScreen;
