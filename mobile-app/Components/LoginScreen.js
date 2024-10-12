// SignUpScreen.js
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
             console.log("user login"+JSON.stringify({
                user_email: user_email,
                user_password: user_password,
            }) )
            const response = await axios.post('http://192.168.1.116:3001/login', {
                user_email: user_email,
                user_password: user_password,
            });
            if (response.status === 200) {
                if (response.data.length > 0) {
                    // await AsyncStorage.setItem('userId', response.data[0]);
                    //Set User_id in Sqlite Local storage
                    const db = SQLite.openDatabase({ name: 'mydb.db' });

                    // Create table and insert data
                    db.transaction(tx => {
                        tx.executeSql('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY,  user_id INTEGER,status INTEGER)');
                        tx.executeSql('DELETE FROM users')

                        tx.executeSql('INSERT INTO users (user_id,status) VALUES (?,?)', [response.data[0].user_id,1]);
                        tx.executeSql('SELECT * FROM users', [], (tx, results) => {
                            const rows = results.rows;
                            for (let i = 0; i < rows.length; i++) {
                                console.log("everything good :: "+JSON.stringify(rows.item(i).user_id) );
                              //  rows.item(i).status==1?navigation.replace('Home'):navigation.replace('Landing')
                                
                            }
                        });
                    
                    });
                    Alert.alert('Success', 'Login successfull' +response.data[0].user_id);


                    // Handle successful login, like navigating to another screen
                    navigation.navigate('Profile',{userId:response.data[0].user_id})
                }
                else {
                    Alert.alert('Error', 'Invalid credentials');
                }

            } else {
                Alert.alert('Error', 'Login failed.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred during login.' + error);
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
        backgroundColor: '#3B9AB2', // Button color
        paddingVertical: 7, // Vertical padding
        paddingHorizontal: 30, // Horizontal padding
        borderRadius: 25, // Rounded corners
        width: '70%', // Button width
        alignItems: 'center', // Center text
        marginTop: 100
    },
    buttonText: {
        color: '#fff', // Text color
        fontSize: 18, // Font size
        fontWeight: 'bold',
    },
});

export default LoginScreen;
