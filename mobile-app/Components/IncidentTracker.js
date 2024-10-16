import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import HeaderComponent from './Header';
import BottomNavigation from './bottom_nav';
import axios from 'axios';
import SQLite from 'react-native-sqlite-storage';

const IncidentTrackerComponent = ({route}) => {
    const { user_profileImage } = route?.params;
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const userId = 13; // Replace with the actual user ID
    useEffect(() => {
        const fetchIncidents = async () => {
            setLoading(true);

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
                const response = await axios.get(`http://192.168.1.116:3001/students/${userIds}`); // Replace with your API endpoint
                setIncidents(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchIncidents();
    }, [userId]);

    

    const [selectedIncident, setSelectedIncident] = useState(null);

    const handleIncidentPress = (incident) => {
        setSelectedIncident(incident);
    };

    const closeModal = () => {
        setSelectedIncident(null);
    };

    if (loading) {
        return <Text>Loading incidents...</Text>;
    }

    if (error) {
        return <Text>Error fetching incidents: {error.message}</Text>;
    }
    return (
        <View style={styles.container}>
            <HeaderComponent user_profileImage={user_profileImage}/>
            <View style={styles.header}>
                <Text style={styles.headerText}>Incident Tracker</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>My Incident Tracker</Text>
                <FlatList
                    data={incidents}
                    renderItem={({ item }) => (
                        <View style={styles.incidentCard}>
                            <View style={styles.horizontalline}></View>
                            <TouchableOpacity onPress={() => handleIncidentPress(item)}>
                                <View style={styles.incidentlist}>
                                    <Text style={styles.cardText}>Incident:{item.alert_id}</Text>
                                    <Text style={styles.cardText}>ID:{!item.assigned_to?'N/A':item.assigned_to}</Text>
                                    <Text style={styles.cardText}>Security:{!item.first_name?'N/A':item.first_name}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item) => item.alert_id.toString()}
                />
            </View>

            <Modal isVisible={selectedIncident !== null} onBackdropPress={closeModal}>
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Incident:{selectedIncident?.alert_id}</Text>
                        <View style={styles.modalbody}>
                            <Text style={styles.modalText}>Security id:{selectedIncident?.assigned_to}</Text>
                            <Text style={styles.modalText}>{selectedIncident?.alert_type}</Text>
                            <Text style={styles.modalText}>Security: {selectedIncident?.user_name}</Text>
                        </View>
                        <Text style={styles.modalText}>Status: {selectedIncident?.status}</Text>
                        <Text style={styles.modalText}>{selectedIncident?.description}</Text>
                    </View>
                </View>
            </Modal>
            <BottomNavigation user_profileImage={user_profileImage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        alignItems: 'center',
        marginVertical: 0,
        color: 'white',
        backgroundColor: '#3B9AB2',
        padding: 10
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    card: {
        borderRadius: 15,
        backgroundColor: '#484848',
        marginTop: 30,
        margin: 10,
        marginBottom:140,
    },
    cardTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 8,
        color: 'white',
    },
    incidentCard: {
        padding: 10,
        margin: 5,

    },
    horizontalline: {
        height: 1, // Adjust the height as needed
        width: '100%', // Adjust the width as needed
        backgroundColor: 'white',
    },
    incidentlist: {
        flexDirection: "row"
    }
    ,
    cardText: {
        color: 'white',
        margin: 10,
        marginRight: 60
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#3B9AB2',
        padding: 20,
        borderRadius: 10,
    },
    modalbody: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    modalTitle: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    },
    modalText: {
        color: 'white',
        margin: 13,


    },
});

export default IncidentTrackerComponent;
