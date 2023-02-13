import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screen/HomeScreen';
import RegisterScreen from './screen/RegisterScreen';
import LoginScreen from './screen/LoginScreen';
import ForgotPassScreen from './screen/ForgotPassScreen';
import ResetPassScreen from './screen/ResetPassScreen';
import ListCategoryScreen from './screen/ListCategoryScreen';
import ListDoctorScreen from './screen/ListDoctorScreen';
import InforDoctorScreen from './screen/InforDoctorScreen';
import BookingScreen from './screen/BookingScreen';
import ConfirmScreen from './screen/ConfirmScreen';
import ProfilePatient from './screen/ProfilePatient';
import AppointmentScreen from './screen/AppointmentScreen';
import InforAppointment from './screen/InforAppointment';
import ChangePassScreen from './screen/ChangePassScreen';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions = {
    headerShown: false,
};

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarInactiveTintColor: '#949191',
                tabBarActiveTintColor: '#6AE0D9',
            }}
        >
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="AppointmentScreen"
                component={AppointmentScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name="calendar" color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="ProfilePatient"
                component={ProfilePatient}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />,
                }}
            />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeTab " screenOptions={screenOptions}>
                {/* <Stack.Screen name="LoginScreen" component={LoginScreen} /> */}
                <Stack.Screen name="HomeTab" component={MyTabs} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen name="ForgotPassScreen" component={ForgotPassScreen} />
                <Stack.Screen name="ResetPassScreen" component={ResetPassScreen} />
                <Stack.Screen name="ListCategoryScreen" component={ListCategoryScreen} />
                <Stack.Screen name="ListDoctorScreen" component={ListDoctorScreen} />
                <Stack.Screen name="InforDoctorScreen" component={InforDoctorScreen} />
                <Stack.Screen name="BookingScreen" component={BookingScreen} />
                <Stack.Screen name="ConfirmScreen" component={ConfirmScreen} />
                <Stack.Screen name="InforAppointment" component={InforAppointment} />
                <Stack.Screen name="ChangePassScreen" component={ChangePassScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
