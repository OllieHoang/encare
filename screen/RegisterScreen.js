import React from 'react';
import { Button, SafeAreaView, Text, View, StyleSheet } from 'react-native';
import RegisterForm from '../components/Register/RegisterForm';

const RegisterScreen = ({ navigation }) => {
    return <RegisterForm navigation={navigation} />;
};

export default RegisterScreen;
