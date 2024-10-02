import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, ActivityIndicator, Alert } from 'react-native';
import HeaderComponent from './Header';
import BottomNavigation from './bottom_nav';
import axios from 'axios';

const SecureZoneComponent = ({ navigation }) => {
    const [selectedZone, setSelectedZone] = useState(null);

    const [safeZonedata, setSafeZoneData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Define an async function to fetch data
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.0.126:3001/safe-zones');
                setSafeZoneData(response.data); // Set the data from the response
                if(response.data.length>0){

                }else{
                    Alert.alert("NO Record Found")
                }
            } catch (err) {
                setError(err); // Handle any errors
            } finally {
                setLoading(false); // Set loading to false once the request is complete
            }
        };

        // Call the function to fetch data
        fetchData();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return (
            <View>
                <Text>Error: {error.message}</Text>
            </View>
        );
    }


    const renderList = () => (
        <View style={styles.card}>
            {safeZonedata.map((item) => (
                <TouchableOpacity
                    key={item.zone_id}
                    style={styles.cardlist}
                    onPress={() => setSelectedZone(item)}
                >
                    <Text style={styles.title}>{item.zone_name}</Text>
                    <View style={styles.separator} />
                </TouchableOpacity>
            ))}
        </View>
    );

    const renderDetails = () => (
        <View style={styles.detailsContainer}>
            <Image source={{uri:'http://192.168.0.126:3001/'+selectedZone.zone_img}} style={styles.image} />
            <Text style={styles.detailsTitle}>{selectedZone.title}</Text>
            <Text style={styles.detailsText}>Number of Incidents: {selectedZone.number_of_incidents}</Text>
            <Text style={styles.detailsText}>Note: {selectedZone.note}</Text>
            <Text style={styles.detailsText}>Safe Time: {selectedZone.safe_times}</Text>
            <Text style={styles.detailsText}>Time to be Aware: {selectedZone.danger_time}</Text>
            <TouchableOpacity onPress={() => setSelectedZone(null)} style={styles.backButton}>
                <Text style={styles.backButtonText}>Back to List</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <HeaderComponent  navigation={navigation}/>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Secure Zones</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {selectedZone ? renderDetails() : renderList()}
            </ScrollView>
            <BottomNavigation />
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
        alignItems: 'center',
        marginVertical: 0,
        color: 'white',
        backgroundColor: '#3B9AB2',
        padding: 10
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    scrollContainer: {
        padding: 16,
    },
    card: {
        backgroundColor: '#484848',
        borderRadius: 30,
        marginBottom: 120,
    },
    cardlist:{
        padding: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    separator: {
        height: 1,
        backgroundColor: '#000000',
        marginVertical: 8,
    },
    detailsContainer: {
        padding: 16,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 16,
    },
    detailsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 16,
    },
    detailsText: {
        fontSize: 18,
        color: 'black',
        marginBottom: 8,
    },
    backButton: {
        marginTop: 16,
        padding: 12,
        backgroundColor: '#3B9AB2',
        borderRadius: 8,
        alignItems: 'center',
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SecureZoneComponent;
