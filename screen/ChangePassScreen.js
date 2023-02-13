import { View, Text } from 'react-native';
import React from 'react';
import ChangePassForm from '../components/ChangePass/ChangePassForm';
import ResetPassForm from '../components/ResetPass/ResetPassForm';

const ChangePassScreen = ({ navigation }) => {
    return <ResetPassForm navigation={navigation} />;
};

export default ChangePassScreen;
