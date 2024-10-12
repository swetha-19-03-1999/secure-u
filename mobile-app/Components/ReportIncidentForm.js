import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image, Modal } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-crop-picker';
import SQLite from 'react-native-sqlite-storage';

const IncidentReportScreen = () => {
    const [showForm, setShowForm] = useState(false);
    const [user_name, setUserName] = useState('');
    const [incident_mode, setIncidentMode] = useState('');
    const [description, setDescription] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [user_id, setUserId] = useState('');  
    const [date, setDate] = useState(new Date());
    const [images, setImages] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);



    useEffect(() => {
        const db = SQLite.openDatabase({ name: 'mydb.db', location: 'default' });
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM users', [], (tx, results) => {
                const rows = results.rows;
                for (let i = 0; i < rows.length; i++) {
                    setUserId(rows.item(i).user_id); 
                }
            });
        });

       
        setIncidentMode(0);
        Geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            },
            (error) => {
                console.log(error.code, error.message);
                Alert.alert('Error', 'Could not get location. Please try again.');
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }, []);

    const showDatePicker = () => {
        DateTimePickerAndroid.open({
            value: date,
            onChange: (event, selectedDate) => {
                const currentDate = selectedDate || date;
                setDate(currentDate);
            },
            mode: 'date',
            is24Hour: true,
        });
    };

    const showTimePicker = () => {
        DateTimePickerAndroid.open({
            value: date,
            onChange: (event, selectedTime) => {
                const currentTime = selectedTime || date;
                setDate(currentTime);
            },
            mode: 'time',
            is24Hour: true,
        });
    };

    const submitForm = () => {
        const db = SQLite.openDatabase({ name: 'mydb.db', location: 'default' });
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM users', [], (tx, results) => {
                const rows = results.rows;
                userIds=rows.item(0).user_id; 

                for (let i = 0; i < rows.length; i++) {
                }
            });
        });

        const formData2 = new FormData();

        formData2.append( "user_id",userIds)
            formData2.append("user_name",user_name)
            formData2.append("incident_mode",incident_mode)
           formData2.append("description",description)
          formData2.append("lattitude",latitude)
           formData2.append("longitude",longitude)
           formData2.append("alert_date_time", date.toISOString())
           formData2.append("images",images) // You can adjust the filename
        


    //console.log("every thing good form data :: "+JSON.stringify(formData) )

        axios.post('http://192.168.1.116:3001/newreportincidentalert', formData2,{
        
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type for the request
                },
        })
            .then(response => {
                Alert.alert('Success', 'Incident Created Successfully');
                setShowForm(false);
            })
            .catch(error => {
                Alert.alert('Error', 'Something went wrong');
                console.log(error);
            });
    };

    const openGallery = () => {
        ImagePicker.openPicker({
            multiple: true,
            mediaType: 'photo',
            cropping: true,
        }).then(selectedImages => {
            setImages([...images, ...selectedImages]);
            setModalVisible(false);
        }).catch(error => {
            console.log('Gallery access error', error);
        });
    };

    const openCamera = () => {
        ImagePicker.openCamera({
            mediaType: 'photo',
            cropping: true,
        }).then(image => {
            setImages([...images, image]);
            setModalVisible(false);
        }).catch(error => {
            console.log('Camera access error', error);
        });
    };

    const removeImage = (index) => {
        const updatedImages = images.filter((_, imgIndex) => imgIndex !== index);
        setImages(updatedImages);
    };

    const navigation = useNavigation();

    const handleNext = () => {
        navigation.navigate('Mdicalemergency');
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            {!showForm ? (
                <View style={styles.buttoncontainer}>
                    <TouchableOpacity style={styles.roundButton} onPress={() => setShowForm(true)}>
                        <Text style={styles.buttonText}>Report Incident</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleNext}>
                        <Text style={styles.nextbtn}>Next</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.formWrapper}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                        <View style={styles.formContainer}>
                            <Text style={styles.label}>Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your name"
                                value={user_name}
                                onChangeText={setUserName}
                            />

                            <Text style={styles.label}>Issue Faced</Text>
                            <TextInput
                                style={styles.textArea}
                                placeholder="Describe the issue"
                                value={description}
                                onChangeText={setDescription}
                                multiline={true}
                                numberOfLines={4}
                            />

                            <Text style={styles.label}>Date</Text>
                            <TouchableOpacity style={styles.datePickerButton} onPress={showDatePicker}>
                                <Text style={styles.datePickerText}>
                                    {date.toDateString()}
                                </Text>
                            </TouchableOpacity>

                            <Text style={styles.label}>Time</Text>
                            <TouchableOpacity style={styles.datePickerButton} onPress={showTimePicker}>
                                <Text style={styles.datePickerText}>
                                    {date.toLocaleTimeString()}
                                </Text>
                            </TouchableOpacity>

                            <Text style={styles.label}>Upload File</Text>
                            <TouchableOpacity style={styles.uploadButton} onPress={openModal}>
                                <Text style={styles.buttonText}>Upload File</Text>
                            </TouchableOpacity>

                            <ScrollView horizontal>
                                {images.map((image, index) => (
                                    <View key={index} style={styles.imageContainer}>
                                        <Image
                                            source={{ uri: image.path }}
                                            style={styles.imagePreview}
                                        />
                                        <TouchableOpacity
                                            style={styles.removeButton}
                                            onPress={() => removeImage(index)}
                                        >
                                            <Text style={styles.removeButtonText}>Remove</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </ScrollView>

                            {/* Move the Done button here to be after the image preview */}
                            <TouchableOpacity style={styles.doneButton} onPress={submitForm}>
                                <Text style={styles.doneButtonText}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            )}

            {/* Modal for selecting gallery or camera */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.modalOption} onPress={openGallery}>
                            <Text style={styles.modalText}>Select from Gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalOption} onPress={openCamera}>
                            <Text style={styles.modalText}>Take Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalCancel} onPress={closeModal}>
                            <Text style={styles.modalCancelText}>Cancel</Text>
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
        marginTop: 40,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    buttoncontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    roundButton: {
        backgroundColor: '#3B9AB2',
        borderRadius: 200,
        width: 300,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -50,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
    },
    formWrapper: {
        flex: 1,
        justifyContent: 'space-between',
    },
    scrollViewContainer: {
        paddingBottom: 120, // Ensure scrolling content isn't hidden behind the button
    },
    formContainer: {
        width: '90%',
        padding: 16,
        color: 'black',
    },
    label: {
        fontSize: 20,
        marginVertical: 8,
        color: 'black',
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        height: 100,
        marginBottom: 16,
    },
    datePickerButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        marginBottom: 16,
    },
    datePickerText: {
        fontSize: 16,
        color: '#000',
    },
    uploadButton: {
        backgroundColor: '#3B9AB2',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        marginBottom: 16,
    },
    imageContainer: {
        alignItems: 'center',
        marginHorizontal: 5,
    },
    imagePreview: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    removeButton: {
        marginTop: 5,
        padding: 5,
        backgroundColor: '#FF0000',
        borderRadius: 5,
    },
    removeButtonText: {
        color: '#fff',
    },
    doneButton: {
        backgroundColor: '#3B9AB2',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        marginBottom: 16,
        marginTop:20,
    },
    doneButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    nextbtn: {
        marginLeft: 10,
        fontSize: 20,
        marginTop: -35,
        color: '#484848',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        width: 300,
        alignItems: 'center',
    },
    modalOption: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        color: '#000',
    },
    modalCancel: {
        padding: 16,
        width: '100%',
        alignItems: 'center',
    },
    modalCancelText: {
        fontSize: 18,
        color: '#FF0000',
    },
});

export default IncidentReportScreen;
