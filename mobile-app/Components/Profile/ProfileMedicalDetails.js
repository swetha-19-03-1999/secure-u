import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import HeaderComponent from '../Header';
import BottomNavigation from '../bottom_nav';
import axios from 'axios';
import SQLite from 'react-native-sqlite-storage';

const ProfileMedicalDetails= ({ route, navigation }) => {
    const { user_profileImage } = route?.params;
    //const userId = ; // Replace with the actual user ID

    const [formData, setFormData] = useState({
        user_id:'',
        user_blood_group: '',
        user_medical_condition: '',
        user_special_requirement: ''
    });

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };
    const [userDetails , setUserDetails]=useState([])
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch user details when the component mounts
        const fetchUserDetails = async () => {

            
        const db = SQLite.openDatabase({ name: 'mydb.db', location: 'default' });

        db.transaction(tx => {
            console.log("hhhh1")

            tx.executeSql('SELECT * FROM users', [], (tx, results) => {
                const rows = results.rows;
                console.log("hhhh2")

                for (let i = 0; i < rows.length; i++) {
                    console.log("hhhh3")
                    userIds=rows.item(i).user_id;
                    console.log("data getting :: "+rows.item(i));
                    setUserId(rows.item(i).user_id);
                }
            });
        });
        
          try {
            const response = await axios.get(`http://192.168.1.116:3001/profilebyid/${userIds}`); // Replace with your API endpoint
            setUserDetails(response.data[0]);
          } catch (error) {
            setError(error);
          } 
        };
    
        fetchUserDetails();
      }, []);

    const handleNext = async () => {
       console.log("")
        const { user_blood_group, user_medical_condition, user_special_requirement } = formData;

        if (!user_blood_group) {
            Alert.alert('Error', 'user_blood_group are required.');
            return;
        }else if(!user_medical_condition){
            Alert.alert('Error', 'user_medical_condition are required.');
            return;
        }else if(!user_special_requirement){
            Alert.alert('Error', 'user_special_requirement are required.');
            return;
        }else{


        try {
          const response = await axios.put('http://192.168.1.116:3001/updateusersprofilemedicaldetails', { "user_blood_group":user_blood_group,
             "user_medical_condition":user_medical_condition, 
             "user_special_requirement":user_special_requirement,
            "user_id": userIds});
          if (response.status === 204) {
            navigation.navigate('ProfileThanku');
          }
        } catch (error) {
          Alert.alert('Error', 'Failed to update Medical details');
          console.error(error);
        }
    }
      };
    // const handleNext = () => {
    //     navigation.navigate('ProfileThanku'); // Navigate to the NextScreen
    //   };
    return (
        <View style={styles.container}>
            <HeaderComponent user_profileImage={user_profileImage} />
            <ScrollView>
            <Text style={styles.header}>Profile</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.emergencycontacttext}>Medical Details</Text>
                <TextInput
                    style={styles.input}
                    placeholder={userDetails.user_blood_group==''?'Blood Group':userDetails.user_blood_group}
                    placeholderTextColor="#ffffff"
                    value={formData.user_blood_group || userDetails.user_blood_group || ''}
                    onChangeText={(value) => handleChange('user_blood_group', value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder={userDetails.user_medical_condition==''?'Medical Condition':userDetails.user_medical_condition}
                    placeholderTextColor="#ffffff"
                    value={formData.user_medical_condition || userDetails.user_medical_condition || ''}
                    onChangeText={(value) => handleChange('user_medical_condition', value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder={userDetails.user_special_requirement==''?'Special Requirement':userDetails.user_special_requirement}
                    placeholderTextColor="#ffffff"
                    value={formData.user_special_requirement  || userDetails.user_medical_condition || ''}
                    onChangeText={(value) => handleChange('user_special_requirement', value)}
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
        marginBottom:140,
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

export default ProfileMedicalDetails;
