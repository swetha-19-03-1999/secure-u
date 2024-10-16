import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, Image, Modal } from 'react-native';
import HeaderComponent from '../Header';
import BottomNavigation from '../bottom_nav';
import axios from 'axios';
import SQLite from 'react-native-sqlite-storage';
import ImagePicker from 'react-native-image-crop-picker';

const ProfileDetails1 = ({ route,navigation }) => {
   const { user_profileImage } = route?.params;
    const [formData, setFormData] = useState({
        user_id: '',
        user_university_name: '',
        user_student_id: '',
        user_mobile_number: '',
        user_academic_program: ''
    });

    const [userDetails, setUserDetails] = useState([]);
    const [error, setError] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [userId, setUserId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                // Open the SQLite database
                const db = SQLite.openDatabase({ name: 'mydb.db', location: 'default' });

                // Wait for the userId to be fetched
                const userIdFromDb = await new Promise((resolve, reject) => {
                    db.transaction(tx => {
                        tx.executeSql('SELECT * FROM users', [], (tx, results) => {
                            const rows = results.rows;
                            if (rows.length > 0) {
                                const userIdFromDb = rows.item(0).user_id; // Assuming first item is the target
                                console.log("User ID from DB: ", userIdFromDb);
                                resolve(userIdFromDb); // Resolve the userId
                            } else {
                                reject(new Error('No user found in the database'));
                            }
                        });
                    });
                });

                // Set the userId in the state
                setUserId(userIdFromDb);

                // Now make the axios call with the userId
                const url = `http://192.168.1.116:3001/profilebyid/${userIdFromDb}`;
                const response = await axios.get(url);

                // Set user details from the API response
                setUserDetails(response.data[0]);
                console.log(response.data[0], 'profile data');

                // Optionally, if you need to navigate based on the user details
                if (response.data[0]?.user_university_name) {
                    // navigation.replace("Home");
                    console.log('Navigating to Home screen...');
                }

            } catch (error) {
                console.error('Error fetching user details:', error);
                setError(error);
            }
        };

        // Call the async function to fetch user details
        fetchUserDetails();
    }, []); // Empty dependency array to run on first load

    // useEffect(() => {
    //     const fetchUserDetails = async () => {
    //         try {
    //             const db = SQLite.openDatabase({ name: 'mydb.db', location: 'default' });

    //             db.transaction(tx => {
    //                 tx.executeSql('SELECT * FROM users', [], (tx, results) => {
    //                     const rows = results.rows;
    //                     for (let i = 0; i < rows.length; i++) {
    //                         userIds=rows.item(i).user_id;
    //                         console.log("data getting :: "+rows.item(i));
    //                         setUserId(rows.item(i).user_id);
    //                     }
    //                 });
    //             });
    //              const url=`http://192.168.1.116:3001/profilebyid/${userIds}`
    //             const response = await axios.get(`http://192.168.1.116:3001/profilebyid/${userIds}`);
    //             setUserDetails(response.data[0]);
    //             console.log(response.data[0],'profilllee')
    //          if(response.data[0].user_university_name!=''){
    //       // navigation.replace("Home")
    //          }
               


    //         } catch (error) {
    //             setError(error);
    //         }
    //     };

    //     fetchUserDetails();
    // }, []);

    const handleChange = (name, value) => {
        // Update formData only if value is not empty
        if (value) {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleNext = async () => {
        const { user_university_name, user_student_id, user_mobile_number, user_academic_program } = formData;
        
        if (!user_university_name) {
            Alert.alert('Error', 'user university name are required.');
            return;
        }else if(!user_student_id){
            Alert.alert('Error', 'user studentid are required.');
            return;
        }else if(!user_mobile_number){
            Alert.alert('Error', 'user mobile number are required.');
            return;
        }else if(!user_academic_program){
            Alert.alert('Error', 'user academic program are required.');
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


            const formData2 = new FormData();
            //formData2.append('user_university_name',user_university_name);

            formData2.append('user_university_name',user_university_name);
            formData2.append('user_student_id', user_student_id);  // Make sure this is the file object
            formData2.append('user_mobile_number', user_mobile_number);
            formData2.append('user_academic_program', user_academic_program);
            formData2.append('user_id',userId);
            formData2.append('user_profile_pic', {
                uri: imageUri,
                type: 'image/jpeg', // Adjust type based on image format
                name: userId+'.jpg', // You can adjust the filename
            });

            try{
            const json=JSON.stringify(formData2)
            console.log("formdata2 json"+json)
          const response = await axios.post('http://192.168.1.116:3001/updatedatabyimage', formData2, {
               headers: {
                   'Content-Type': 'multipart/form-data', // Set the content type for the request
               },
           }); 
               navigation.navigate('EmergencyContact', {user_profileImage: user_profileImage});
           
       } catch (error) {
           Alert.alert('Error', 'Failed to update Profile details');
           console.error(error);
       }
        }
        
      
    };

    const handleImagePicker = (type) => {
        const options = {
            cropping: true,
            width: 300,
            height: 300,
            cropperCircleOverlay: true,
            compressImageQuality: 0.8,
        };

        const picker = type === 'gallery' ? ImagePicker.openPicker : ImagePicker.openCamera;

        picker(options)
            .then(image => {
                setImageUri(image.path);
                setModalVisible(false); // Close the modal after selecting an image
            })
            .catch(error => {
                if (error.message !== 'User cancelled image selection') {
                    console.error(error);
                }
            });
    };

    const handleRemoveImage = () => {
        setImageUri(null);
    };

    return (
        <View style={styles.container}>
            <HeaderComponent user_profileImage={user_profileImage} />
            {userDetails ? (
            <ScrollView>
                <Text style={styles.header}>Profile</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="University Name"
                        placeholderTextColor="#ffffff"
                        value={formData.user_university_name || userDetails.user_university_name || ''}
                        onChangeText={(value) => handleChange('user_university_name', value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Student Id"
                        placeholderTextColor="#ffffff"
                        value={formData.user_student_id || userDetails.user_student_id || ''}
                        onChangeText={(value) => handleChange('user_student_id', value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        placeholderTextColor="#ffffff"
                        value={formData.user_mobile_number || userDetails.user_mobile_number || ''}
                        onChangeText={(value) => handleChange('user_mobile_number', value)}
                        keyboardType="phone-pad"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Academic Program"
                        placeholderTextColor="#ffffff"
                        value={formData.user_academic_program || userDetails.user_academic_program || ''}
                        onChangeText={(value) => handleChange('user_academic_program', value)}
                    />

                    <View style={styles.profilepicture}>
                        <Text style={styles.profileText}>Profile Picture:</Text>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <Text style={styles.uploadButton}>Upload File</Text>
                        </TouchableOpacity>
                    </View>

                    {imageUri && (
                        <View style={styles.imagePreviewContainer}>
                            <Image
                                source={{ uri: imageUri }}
                                style={styles.imagePreview}
                            />
                            <TouchableOpacity onPress={handleRemoveImage} style={styles.removeButton}>
                                <Text style={styles.removeButtonText}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleNext}>
                            <Text style={styles.buttonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <BottomNavigation user_profileImage={user_profileImage} />
            </ScrollView>
            ) : (
                <Text>Loading user details...</Text>
            )
        }
            {/* Modal for Image Upload Options */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Image Source</Text>
                        <TouchableOpacity onPress={() => handleImagePicker('gallery')} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>From Gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleImagePicker('camera')} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>Take a Picture</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 0,
        color: 'white',
        backgroundColor: '#3B9AB2',
        padding: 10,
    },
    inputContainer: {
        marginTop: 50,
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
    profilepicture: {
        marginTop: 25,
        flexDirection: 'row',
    },
    profileText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#484848',
        marginBottom: 10,
        marginRight: 25,
    },
    uploadButton: {
        fontSize: 18,
        color: '#3B9AB2',
        marginTop: 5,
    },
    imagePreviewContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    imagePreview: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    removeButton: {
        marginTop: 10,
        backgroundColor: 'red',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 10,
    },
    removeButtonText: {
        color: 'white',
        fontSize: 16,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 120,
    },
    button: {
        backgroundColor: '#3B9AB2',
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#3B9AB2',
        paddingVertical: 0,
        paddingHorizontal: 120,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    modalButton: {
        backgroundColor: '#3B9AB2',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default ProfileDetails1;
