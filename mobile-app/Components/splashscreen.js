// SplashScreen.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { NetworkInfo } from 'react-native-network-info';

// 
const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        // Set a timeout for 5 seconds before navigating to the Login screen

        // Get Local IP address
    NetworkInfo.getIPAddress().then(ip => {
        console.log("current ip address :: "+ip);
      });
        const timer = setTimeout(() => {
            navigation.replace('Landing')
            // try {
            //     const value =  AsyncStorage.getItem("loginStatus");
            //     console.error(value);
            //     if(value==true){
            //    navigation.replace('Home') 
            // }else{
            //      navigation.replace('Landing'); 
            //     }
            //   } catch (e) {
            //     console.error("Error fetching data", e);
            //     navigation.replace('Landing')
            //   }

            const db = SQLite.openDatabase({ name: 'mydb.db', location: 'default' });
            db.transaction(tx => {
             //  tx.executeSql('DELETE FROM users')
                tx.executeSql('SELECT * FROM users', [], (tx, results) => {
                    const rows = results.rows;
                    for (let i = 0; i < rows.length; i++) {
                        rows.item(i).status==1?navigation.replace('Home'):navigation.replace('Landing')
                        console.log("splash screen :: "+JSON.stringify(rows.item(i)) );
                    }
                });
            });
        //Use replace to prevent going back to the splash screen
        }, 2000);

        // Clear the timer if the component is unmounted before the timeout
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image
                source={require('./Images/logo.png')} // Make sure the image path is correct
                style={styles.image}
                resizeMode="contain"
            />
            <View style={styles.appname}>
                <Text style={styles.text1}>Secure-</Text>
                <Text style={styles.text2}>U</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#484848', // Set a background color
    },
    appname: {
        justifyContent: 'center', // Center elements vertically
        alignItems: 'center',
        flexDirection: 'row', 
    },
    text1: {
        fontSize: 50,
        fontWeight: 'bold',
    },
    text2: {
        fontSize: 50,
        fontWeight: 'bold',
        color:'#3B9AB2'
    },
    image: {
        width: 200, // Width of the image
        height: 200, // Height of the image
        marginBottom:40
    },
});

export default SplashScreen;
