import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import HeaderComponent from '../Header';
import BottomNavigation from '../bottom_nav';
import axios from 'axios';
import SQLite from 'react-native-sqlite-storage';

const ProfileEmergencyContact = ({ route, navigation }) => {
    const { user_profileImage } = route?.params;
    const [formData, setFormData] = useState({
        user_id:'',
        user_emergency_contact_name: '',
        user_emergency_contact_relationship: '',
        user_emergency_contact_number: ''
    });

    const handleChange = (name, value) => {
        
        setFormData({ ...formData, [name]: value });
    };

    const [userDetails , setUserDetails]=useState([])
    const [error, setError] = useState(null);

    useEffect(() => {

        
        const db = SQLite.openDatabase({ name: 'mydb.db', location: 'default' });

        db.transaction(tx => {
            console.log("hhhh1")

            tx.executeSql('SELECT * FROM users', [], (tx, results) => {
                const rows = results.rows;
                

                for (let i = 0; i < rows.length; i++) {
                    
                    userIds=rows.item(i).user_id;
                    console.log("data getting :: "+rows.item(i));
                    setUserId(rows.item(i).user_id);
                }
            });
        });
        // Fetch user details when the component mounts
        const fetchUserDetails = async () => {
          try {
            console.log("profile emergency :: "+`http://192.168.1.116:3001/profilebyid/${userIds}`)

            const response = await axios.get(`http://192.168.1.116:3001/profilebyid/${userIds}`); // Replace with your API endpoint
            setUserDetails(response.data[0]);
console.log("user details :: "+userDetails)

          } catch (error) {
            setError(error);
          } 
        };
    
        fetchUserDetails();
      }, []);
    const handleNext = async () => {
        const { user_emergency_contact_name, user_emergency_contact_relationship, user_emergency_contact_number } = formData;

        if (!user_emergency_contact_name) {
            Alert.alert('Error', 'user user_emergency_contact_name are required.');
            return;
        }else if(!user_emergency_contact_relationship){
            Alert.alert('Error', 'user_emergency_contact_relationship are required.');
            return;
        }else if(!user_emergency_contact_number){
            Alert.alert('Error', 'user_emergency_contact_number are required.');
            return;
        }else{
        

            const db = SQLite.openDatabase({ name: 'mydb.db', location: 'default' });

            db.transaction(tx => {
                console.log("hhhh1")
    
                tx.executeSql('SELECT * FROM users', [], (tx, results) => {
                    const rows = results.rows;
                    
    
                    for (let i = 0; i < rows.length; i++) {
                        
                        userIds=rows.item(i).user_id;
                        console.log("data getting :: "+rows.item(i));
                        setUserId(rows.item(i).user_id);
                    }
                });
            });


        try {
          const response = await axios.put('http://192.168.1.116:3001/updateusersprofileemergencycontact', {"user_id":userIds, 
            "user_emergency_contact_name":user_emergency_contact_name,
             "user_emergency_contact_relationship":user_emergency_contact_relationship, 
             "user_emergency_contact_number":user_emergency_contact_number });
            navigation.navigate('MedicalDetails');
          
        } catch (error) {
          Alert.alert('Error', 'Failed to update Emergency Contact details');
          console.error(error);
        }
    }
      };
    return (
        <View style={styles.container}>
            <HeaderComponent user_profileImage={user_profileImage}/>
            <ScrollView>
            <Text style={styles.header}>Profile</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.emergencycontacttext}>Emergency Contact</Text>
                <TextInput
                    style={styles.input}
                    placeholder={userDetails.user_emergency_contact_name==''?'Name':userDetails.user_emergency_contact_name}
                    placeholderTextColor="#ffffff"
                    value={formData.user_emergency_contact_name || userDetails.user_emergency_contact_name || ''}
                    onChangeText={(value) => handleChange('user_emergency_contact_name', value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder={userDetails.user_emergency_contact_relationship==''?'Relationship':userDetails.user_emergency_contact_relationship}
                    placeholderTextColor="#ffffff"
                    value={formData.user_emergency_contact_relationship || userDetails.user_emergency_contact_relationship || ''}
                    onChangeText={(value) => handleChange('user_emergency_contact_relationship', value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder={userDetails.user_emergency_contact_number==''?'Phone Number':userDetails.user_emergency_contact_number}
                    placeholderTextColor="#ffffff"
                    value={formData.user_emergency_contact_number || userDetails.user_emergency_contact_number || ''}
                    onChangeText={(value) => handleChange('user_emergency_contact_number', value)}
                    keyboardType="phone-pad"
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleNext}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <BottomNavigation user_profileImage={user_profileImage} />
            </ScrollView>
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
    emergencycontacttext: {
        fontSize: 40,
        textAlign: 'center',
        marginTop: -20,
        marginBottom: 30,
        color:'#484848'
    },
    inputContainer: {
        marginTop: 30,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 40,
        marginBottom: 15,
        paddingHorizontal: 10,
        padding: 5,
        backgroundColor: '#7b959c',
        borderColor: '#778899',
        fontSize: 20,

    },
    buttonContainer: {
        alignItems: 'center', // Center the button horizontally
        marginTop: 140,
        marginBottom: 140
    },
    button: {
        backgroundColor: '#3B9AB2', // Button color
        borderRadius: 25, // Rounded corners
        borderWidth: 2, // Border width
        borderColor: '#3B9AB2', // Border color
        paddingVertical: 0,
        paddingHorizontal: 120,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
    },
});

export default ProfileEmergencyContact;
