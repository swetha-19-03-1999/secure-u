import React from 'react';
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    Button,
    Grid,
    Divider,
    List,
    ListItem,
    ListItemText,
    Link,
} from '@mui/material';
import "./weelbeing.css";

const WellbeingResources = () => {
    return (
        <Container className="grey-bg" maxWidth="md" style={{ margin: "40px auto" }}>
            <div className="weelbeing-img" />
            <Typography variant="h3" align="center" gutterBottom>
                Wellbeing Resources
            </Typography>

            <Typography variant="h4" gutterBottom>
                Online Resources
            </Typography>

            <Typography variant="h5" gutterBottom>
                Mental Health Articles:
            </Typography>
            <List>
                {mentalHealthArticles.map((article, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={<strong>{article.title}</strong>}
                            secondary={
                                <>
                                    {article.description}<br />
                                    <Link href={article.link} target="_blank" rel="noopener noreferrer">
                                        Read More
                                    </Link>
                                </>
                            }
                        />
                    </ListItem>
                ))}
            </List>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" gutterBottom>
                Physical Wellbeing Articles:
            </Typography>
            <List>
                {physicalWellbeingArticles.map((article, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={<strong>{article.title}</strong>}
                            secondary={
                                <>
                                    {article.description}<br />
                                    <Link href={article.link} target="_blank" rel="noopener noreferrer">
                                        Read More
                                    </Link>
                                </>
                            }
                        />
                    </ListItem>
                ))}
            </List>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h4" gutterBottom>
                Conversations with Experts
            </Typography>

            {experts.map((expert, index) => (
                <Card key={index} variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h5">{expert.name} ({expert.title})</Typography>
                        <Typography color="textSecondary">{expert.specialty}</Typography>
                        <Typography><strong>Availability:</strong> {expert.availability}</Typography>
                        <Typography>
                            <strong>Contact:</strong><br />
                            Phone: {expert.phone}<br />
                            Email: <Link href={`mailto:${expert.email}`}>{expert.email}</Link>
                        </Typography>
                    </CardContent>
                </Card>
            ))}

            <Divider sx={{ my: 4 }} />

            <Typography variant="h4" gutterBottom>
                Wellness Events & Workshops
            </Typography>

            {events.map((event, index) => (
                <Card key={index} variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h5">{event.title}</Typography>
                        <Typography>
                            <strong>Date:</strong> {event.date}<br />
                            <strong>Location:</strong> {event.location}<br />
                            <strong>Description:</strong> {event.description}<br />
                            <Link href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                                Register Here
                            </Link>
                        </Typography>
                    </CardContent>
                </Card>
            ))}

            <Divider sx={{ my: 4 }} />

            <Typography variant="h4" gutterBottom>
                Emergency Contacts
            </Typography>

            {emergencyContacts.map((contact, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="h5">{contact.title}</Typography>
                    <Typography>
                        Phone: {contact.phone}<br />
                        Location: {contact.location}<br />
                        Hours: {contact.hours}<br />
                        Email: <Link href={`mailto:${contact.email}`}>{contact.email}</Link>
                    </Typography>
                </Box>
            ))}

            <Divider sx={{ my: 4 }} />

            <Typography variant="h4" gutterBottom>
                Feedback and Suggestions
            </Typography>
            <Typography>
                We want to hear from you! If you have any feedback on our wellbeing resources or ideas for future content, let us know. Your input helps us improve this page and provide more targeted support.
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                <Link href="https://docs.google.com/forms/d/e/1FAIpQLSdnIioa3gKg1aE0Dk70UH5pTvlBjugAGb6JYsX9OUyD1fnSUA/viewform?usp=sf_link" color="inherit" underline="none" target="_blank">
                    Submit Feedback
                </Link>
            </Button>
            {/* <Button variant="outlined" color="secondary" sx={{ mt: 2, ml: 2 }}>
                <Link href="#" color="inherit" underline="none">
                    Request a Topic
                </Link>
            </Button> */}
        </Container>
    );
};

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

export default WellbeingResources;
