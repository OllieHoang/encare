import React from 'react';
import { View } from 'react-native';
import BottomTab, { BottomTabIcon } from '../components/Home/HomePatient/BottomTabIcon';
import AppointmentView from '../components/Appointment/AppointmentView';

const LoginScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <AppointmentView navigation={navigation} />
            {/* <BottomTab icons={BottomTabIcon} navigation={navigation} /> */}
        </View>
    );
};

export default LoginScreen;
