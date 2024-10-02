import { View, Text, StyleSheet, ScrollView } from 'react-native';
import HeaderComponent from './Header';
import BottomNavigation from './bottom_nav';

const WellbeingComponent = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <HeaderComponent  navigation={navigation}/>
            <ScrollView>
                <Text style={styles.header}>Wellbeing</Text>
                <View style={styles.textcontainer}>
                    <Text style={styles.title}>Mental Health</Text>
                    <Text style={styles.decerption}>Key facts
                        Affordable, effective and feasible strategies exist to promote, protect and restore mental health.
                        The need for action on mental health is indisputable and urgent.
                        Mental health has intrinsic and instrumental value and is integral to our well-being.
                        Mental health is determined by a complex interplay of individual, social and structural stresses and vulnerabilities.
                        Concepts in mental health
                        Mental health is a state of mental well-being that enables people to cope with the stresses of life, realize their abilities, learn well and work well, and contribute to their community. It is an integral component of health and well-being that underpins our individual and collective abilities to make decisions, build relationships and shape the world we live in. Mental health is a basic human right. And it is crucial to personal, community and socio-economic development.
                        Mental health is more than the absence of mental disorders. It exists on a complex continuum, which is experienced differently from one person to the next, with varying degrees of difficulty and distress and potentially very different social and clinical outcomes.
                        Mental health conditions include mental disorders and psychosocial disabilities as well as other mental states associated with significant distress, impairment in functioning, or risk of self-harm. People with mental health conditions are more likely to experience lower levels of mental well-being, but this is not always or necessarily the case.</Text>
                </View>
                <BottomNavigation />
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
        padding: 10,
    },

    textcontainer: {
        color: 'black',
        marginBottom:190
    },
    title:{
        textAlign:'center',
        fontSize:40,
        color:'black',
        fontWeight: 'bold',
        padding:10,
        
    },
    decerption:{
        textAlign:'center',
        color:'black'
    },
});

export default WellbeingComponent;
