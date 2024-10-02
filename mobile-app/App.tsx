// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './Components/splashscreen';
import HomeScreen from './Components/HomeScreen';
import SignUpScreen from './Components/SignupScreen';
import LandingScreen from './Components/LandingScreen';
import LoginScreen from './Components/LoginScreen';
import ProfileDetails1 from './Components/Profile/Profile1';
import ProfileEmergencyContact from './Components/Profile/ProfileEmergencyContact';
import ProfileMedicalDetails from './Components/Profile/ProfileMedicalDetails';
import ProfileThanku from './Components/Profile/ThankYouProfile';
import WellbeingComponent from './Components/Wellbeing';
import HomeScreenReportInceident from './Components/HomeScreenReportInceident';
import IncidentTrackerComponent from './Components/IncidentTracker';
import SecureZoneComponent from './Components/SecureZones';
import MedicalEmergencyButton from './Components/MedicalEmergency';
import HomeScreenMedical from './Components/HomeScreenMedical';
import IncidentReportScreen from './Components/ReportIncidentForm';
import CommunityPosts from './Components/Community';


const Stack = createNativeStackNavigator();

const App = () => {




  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }} // Hide the header for splash screen
        />
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Profile"
          component={ProfileDetails1}
        />

        <Stack.Screen
          name="EmergencyContact"
          component={ProfileEmergencyContact}
        />

        <Stack.Screen
          name="MedicalDetails"
          component={ProfileMedicalDetails}
        />
        <Stack.Screen
          name="ProfileThanku"
          component={ProfileThanku}
        />

        <Stack.Screen
          name="Wellbeing"
          component={WellbeingComponent}
        />
        <Stack.Screen
          name="Reportincident"
          component={HomeScreenReportInceident}
        />
        <Stack.Screen
          name="Mdicalemergency"
          component={HomeScreenMedical}
        />
        <Stack.Screen
          name="Incidenttracker"
          component={IncidentTrackerComponent}
        />

        <Stack.Screen
          name="Securezone"
          component={SecureZoneComponent}
        />

        <Stack.Screen
          name="Community"
          component={CommunityPosts}
        />
      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default App;
