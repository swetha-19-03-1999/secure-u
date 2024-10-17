import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import HeaderComponent from './Header';
import BottomNavigation from './bottom_nav';

const WellbeingComponent = ({route}) => {
    const { user_profileImage } = route?.params;
    return (
        <View style={styles.container}>
            <HeaderComponent user_profileImage={user_profileImage}/>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.banner}>
                    <Text style={styles.header}>Mental Health and Wellbeing</Text>
                </View>
                {/* <View style={styles.textcontainer}>
                    <Text style={styles.articleText}>
                        Mental health, often overshadowed by its physical counterpart, is an integral component of overall well-being.
                        It encompasses our emotional, psychological, and social states, influencing how we think, feel, and interact with the world. 
                        Just as physical health is essential for our bodies to function optimally, mental health is crucial for our minds to thrive.
                    </Text>
                    
                    <Text style={styles.articleText}>
                        A state of mental well-being allows individuals to harness their full potential, build resilient relationships, and contribute meaningfully to society. 
                        It is characterized by a sense of purpose, optimism, and the ability to cope with life's challenges. 
                        Conversely, mental health problems can manifest as a range of conditions, from mild to severe, impacting thoughts, moods, and behaviors.
                    </Text>

                    <Text style={styles.articleText}>
                        For too long, mental health has been shrouded in stigma, leading to fear, shame, and isolation for those affected. 
                        This stigma prevents people from seeking help, exacerbating their suffering. It is imperative to challenge these misconceptions and foster a culture of understanding and acceptance.
                    </Text>

                    <Text style={styles.articleText}>
                        The Importance of Prevention and Early Intervention:
                        Early intervention and prevention are crucial in addressing mental health challenges. 
                        By promoting mental well-being and providing support systems, we can reduce the incidence and severity of mental health disorders.
                    </Text>
                </View> */}

                <Text style={styles.sectionTitle}>Wellbeing Resources</Text>

                <Text style={styles.subHeader}>Online Resources</Text>

                <Text style={styles.subSectionTitle}>Mental Health Articles:</Text>
                {mentalHealthArticles.map((article, index) => (
                    <View key={index} style={styles.articleContainer}>
                        <Text style={styles.articleTitle}>{article.title}</Text>
                        <Text style={styles.articleDescription}>{article.description}</Text>
                        <TouchableOpacity onPress={() => Linking.openURL(article.link)}>
                            <Text style={styles.articleLink}>Read More</Text>
                        </TouchableOpacity>
                    </View>
                ))}

                <Text style={styles.subSectionTitle}>Physical Wellbeing Articles:</Text>
                {physicalWellbeingArticles.map((article, index) => (
                    <View key={index} style={styles.articleContainer}>
                        <Text style={styles.articleTitle}>{article.title}</Text>
                        <Text style={styles.articleDescription}>{article.description}</Text>
                        <TouchableOpacity onPress={() => Linking.openURL(article.link)}>
                            <Text style={styles.articleLink}>Read More</Text>
                        </TouchableOpacity>
                    </View>
                ))}

                <Text style={styles.sectionTitle}>Conversations with Experts</Text>
                {experts.map((expert, index) => (
                    <View key={index} style={styles.card}>
                        <Text style={styles.cardTitle}>{expert.name} ({expert.title})</Text>
                        <Text style={styles.cardText}>{expert.specialty}</Text>
                        <Text style={styles.cardText}><Text style={styles.boldText}>Availability:</Text> {expert.availability}</Text>
                        <Text style={styles.cardText}><Text style={styles.boldText}>Contact:</Text></Text>
                        <Text style={styles.cardText}>Phone: {expert.phone}</Text>
                        <TouchableOpacity onPress={() => Linking.openURL(`mailto:${expert.email}`)}>
                            <Text style={styles.articleLink}>{expert.email}</Text>
                        </TouchableOpacity>
                    </View>
                ))}

                <Text style={styles.sectionTitle}>Wellness Events & Workshops</Text>
                {events.map((event, index) => (
                    <View key={index} style={styles.card}>
                        <Text style={styles.cardTitle}>{event.title}</Text>
                        <Text style={styles.cardText}><Text style={styles.boldText}>Date:</Text> {event.date}</Text>
                        <Text style={styles.cardText}><Text style={styles.boldText}>Location:</Text> {event.location}</Text>
                        <Text style={styles.cardText}><Text style={styles.boldText}>Description:</Text> {event.description}</Text>
                        <TouchableOpacity onPress={() => Linking.openURL(event.registrationLink)}>
                            <Text style={styles.articleLink}>Register Here</Text>
                        </TouchableOpacity>
                    </View>
                ))}

                <Text style={styles.sectionTitle}>Emergency Contacts</Text>
                {emergencyContacts.map((contact, index) => (
                    <View key={index} style={styles.contactContainer}>
                        <Text style={styles.contactTitle}>{contact.title}</Text>
                        <Text style={styles.contactText}>Phone: {contact.phone}</Text>
                        <Text style={styles.contactText}>Location: {contact.location}</Text>
                        <Text style={styles.contactText}>Hours: {contact.hours}</Text>
                        <TouchableOpacity onPress={() => Linking.openURL(`mailto:${contact.email}`)}>
                            <Text style={styles.articleLink}>{contact.email}</Text>
                        </TouchableOpacity>
                    </View>
                ))}

                <Text style={styles.sectionTitle}>Feedback and Suggestions</Text>
                <Text style={styles.articleDescription}>
                    We want to hear from you! If you have any feedback on our wellbeing resources or ideas for future content, let us know. Your input helps us improve this page and provide more targeted support.
                </Text>
                <TouchableOpacity style={styles.feedbackButton}>
                    <Text style={styles.feedbackButtonText}>Submit Feedback</Text>
                </TouchableOpacity>
            </ScrollView>
            <BottomNavigation user_profileImage={user_profileImage} />
        </View>
    );
};

// Sample Data from Web Component
const mentalHealthArticles = [
    {
        title: "Coping with Academic Stress",
        description: "This article provides practical techniques for managing academic pressure, including time management strategies, mindfulness practices, and tips for staying organized during high-stress periods like exams.",
        link: "https://www.unh.edu/pacs/academic-stress-coping-strategies",
    },
    {
        title: "Managing Anxiety in University Life",
        description: "University life can be overwhelming, but managing anxiety is possible with proper techniques. Learn how to handle academic, social, and personal stressors with this guide.",
        link: "https://www.deakin.edu.au/students/student-life-and-services/health-wellbeing-and-safety/hwb/counselling/hwb-resources/managing-anxiety",
    },
    {
        title: "Building Resilience: Strategies for Mental Toughness",
        description: "Resilience is key to bouncing back from challenges. This guide explores ways to strengthen mental resilience, manage setbacks, and develop a positive outlook.",
        link: "https://www.mayoclinic.org/tests-procedures/resilience-training/in-depth/resilience/art-20046311",
    },
];

const physicalWellbeingArticles = [
    {
        title: "The Importance of Sleep for Academic Success",
        description: "Getting enough sleep is essential for concentration, memory, and overall health. Discover how to create a healthy sleep routine that supports your academic goals.",
        link: "https://www.cdc.gov/healthyschools/sleep.htm#:~:text=Adequate%20sleep%20contributes%20to%20a,concentration%2C%20and%20improve%20academic%20performance.",
    },
    {
        title: "Eating Right: Nutrition Tips for Students on a Budget",
        description: "Learn how to maintain a balanced diet with affordable, healthy meal options that keep you energized throughout your busy student life.",
        link: "https://nutritionaustralia.org/fact-sheets/healthy-eating-on-a-budget/",
    },
    {
        title: "Exercise and Mental Health: How Moving Your Body Boosts Your Mood",
        description: "Regular physical activity can have a powerful effect on your mental health. Find out how to incorporate quick, effective workouts into your daily routine.",
        link: "https://www.betterhealth.vic.gov.au/health/healthyliving/exercise-and-mental-health",
    },
];

const experts = [
    {
        name: "Dr. Sarah Johnson",
        title: "Counselor",
        specialty: "Anxiety, depression, crisis intervention",
        availability: "Monday to Friday, 9 AM - 5 PM",
        phone: "+61 456287987",
        email: "sjohnson@university.edu",
    },
    {
        name: "Dr. Michael Evans",
        title: "Psychiatrist",
        specialty: "Long-term mental health conditions, medication management",
        availability: "Tuesday and Thursday, 1 PM - 4 PM",
        phone: "+61 453278765",
        email: "michael.evans@university.edu",
    },
];

const events = [
    {
        title: "Mindfulness and Meditation Workshop",
        date: "12th October, 5 PM",
        location: "Wellbeing Center, Room 204",
        description: "Learn practical meditation techniques to reduce stress and improve focus. Open to all students.",
        registrationLink: "#", // Replace with actual link
    },
    {
        title: "\"Dealing with Exam Anxiety\" Webinar",
        date: "24th October, 3 PM",
        location: "Online (Zoom)",
        description: "This session will guide students through coping mechanisms for handling exam-related stress and anxiety.",
        registrationLink: "#", // Replace with actual link
    },
    {
        title: "Weekly Yoga Sessions",
        date: "Every Wednesday, 7 AM",
        location: "Student Union Gym",
        description: "Join us for an hour of beginner-friendly yoga to relieve stress and rejuvenate your mind and body. No prior experience required.",
        registrationLink: "#", // Replace with actual link
    },
];

const emergencyContacts = [
    {
        title: "Campus Counseling Services",
        phone: "4221 4900",
        location: "Student Wellbeing Center, Building 17",
        hours: "Monday – Friday",
        email: "security@uow.edu.au",
    },
    {
        title: "University Health Center",
        phone: "+61453237654",
        location: "Building 17, Health and Wellness Center",
        hours: "Monday – Friday, 9 AM – 6 PM",
        email: "healthcenter@university.edu",
    },
];

// Styles for the Component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContainer: {
        padding: 20,
    },
    banner: {
        backgroundColor: '#3B9AB2',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subSectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    articleContainer: {
        marginBottom: 20,
    },
    articleTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    articleDescription: {
        fontSize: 14,
        marginBottom: 5,
    },
    articleLink: {
        fontSize: 14,
        color: '#1E90FF',
    },
    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardText: {
        fontSize: 14,
    },
    boldText: {
        fontWeight: 'bold',
    },
    contactContainer: {
        marginBottom: 15,
    },
    contactTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    contactText: {
        fontSize: 14,
    },
    feedbackButton: {
        backgroundColor: '#3B9AB2',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    feedbackButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default WellbeingComponent;
