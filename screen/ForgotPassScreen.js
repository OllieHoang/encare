import React from 'react';
import { Button, SafeAreaView, Text, View, StyleSheet } from 'react-native';
import ForgotPassForm from '../components/ForgotPass/ForgotPassForm';

const ForgotPassScreen = ({ navigation }) => {
    return <ForgotPassForm navigation={navigation} />;
};

export default ForgotPassScreen;
