import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Image, TouchableOpacity } from 'react-native';
import { theme } from '../theme';

import LoginScreen from '../screens/login/LoginScreen';
import OtpVerification from '../screens/login/OtpVerification';
import RegistrationScreen from '../screens/RegistrationScreen';
import ApprovalStatus from '../components/ApprovalStatus';
import SubscriptionScreen from '../screens/subscription/SubscriptionScreen';
import HomeScreen from '../screens/home/HomeScreen';
import ClientsScreen from '../screens/Clients/ClientsScreen';
import ProjectsScreen from '../screens/Projects/ProjectsList/ProjectsScreen';
import OverviewProjectScreen from '../screens/Projects/OverViewProjects/OverviewProjectScreen';
import EmployeesScreen from '../screens/Employees/EmployeesScreen';
import ClientsDueScreen from '../screens/DuePayments/ClientsDuesScreen';
import DuesOverviewScreen from '../screens/DuePayments/DuesOverviewScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import HelpSupportScreen from '../screens/Help&Support/HelpSupportScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import MyMembershipScreen from '../screens/subscription/MyMembership/MyMembershipScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import ApprovalProjectsScreen from '../screens/Projects/ProjectsList/ApprovalRequestsScreen';
import DailyRemindersScreen from '../screens/DailyReminder/DailyRemindersScreen';
import MyaccountScreen from '../screens/MyaccountScreen';
import EditEmployeeScreen from '../screens/Employees/Components/EditEmployeeScreen';


const Stack = createNativeStackNavigator();

const getScreenOptions = (title: string, navigation: any): NativeStackNavigationOptions => ({
    title: title,
    headerTitleAlign: 'center',
    headerTitleStyle: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    headerStyle: {
        backgroundColor: theme.colors.background, // Sets the background of the header to transparent
    },
    headerShadowVisible: false,
    headerBackTitleVisible: false,
    headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
                source={require('../assets/icons/back.png')} // Replace with your actual back icon
                style={{ width: 40, height: 40 }} // Add style as needed
            />
        </TouchableOpacity>
    ),
});

const AppNavigator: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} /> 
             <Stack.Screen
                name="OtpVerify"
                component={OtpVerification}
                options={({ navigation }) => getScreenOptions('', navigation)}
            />
            <Stack.Screen
                name="Registration"
                component={RegistrationScreen}
                options={({ navigation }) => getScreenOptions('Registration', navigation) }
            />
            <Stack.Screen name="Approval" component={ApprovalStatus} options={{ headerShown: false }} />
            <Stack.Screen name="Subscription" component={SubscriptionScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen
                name="Clients"
                component={ClientsScreen}
                options={({ navigation }) => getScreenOptions('Clients', navigation)}
            /> 
             <Stack.Screen
                name="Projects"
                component={ProjectsScreen}
                options={({ navigation }) => getScreenOptions('Projects', navigation)}
            />
            <Stack.Screen
                name="ApprovalProjects"
                component={ApprovalProjectsScreen}
                options={({ navigation }) => getScreenOptions('Approval Requests', navigation)}
            />
            <Stack.Screen
                name="Overview"
                component={OverviewProjectScreen}
                options={({ navigation }) => getScreenOptions('Overview', navigation)}
            />
            <Stack.Screen
                name="Employees"
                component={EmployeesScreen}
                options={({ navigation }) => getScreenOptions('Employees', navigation)}
            />
            <Stack.Screen
                name="ClientsDues"
                component={ClientsDueScreen}
                options={({ navigation }) => getScreenOptions('Clients Dues', navigation)}
            />
            <Stack.Screen
                name="DueOverview"
                component={DuesOverviewScreen}
                options={({ navigation }) => getScreenOptions('Dues Overview', navigation)}
            />
            <Stack.Screen
                name="Notification"
                component={NotificationScreen}
                options={({ navigation }) => getScreenOptions('Notification', navigation)}
            />
           
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={({ navigation }) => getScreenOptions('Profile', navigation)}
            />
            <Stack.Screen
                name="HelpSupport"
                component={HelpSupportScreen}
                options={({ navigation }) => getScreenOptions('Help & Support', navigation)}
            />
            <Stack.Screen
                name="PrivacyPolicy"
                component={PrivacyPolicyScreen}
                options={({ navigation }) => getScreenOptions('Privacy Policy', navigation)}
            />
            <Stack.Screen
                name="MyMembership"
                component={MyMembershipScreen}
                options={({ navigation }) => getScreenOptions('My Membership', navigation)}
            />
            <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={({ navigation }) => getScreenOptions('Settings', navigation)}
            />
            <Stack.Screen
                name="DailyReminders"
                component={DailyRemindersScreen}
                options={({ navigation }) => getScreenOptions('Daily Reminders', navigation)}
            />
             <Stack.Screen
                name="MyAccount"
                component={MyaccountScreen}
                options={({ navigation }) => getScreenOptions('MyAccount', navigation)}
            />
             <Stack.Screen
                name="EditEmployee"
                component={EditEmployeeScreen}
                options={({ navigation }) => getScreenOptions('EditEmployee', navigation)}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;

