import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Home/HomePatient/Header';
import Content from '../components/Home/HomePatient/Content';
import BottomTab, { BottomTabIcon } from '../components/Home/HomePatient/BottomTabIcon';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <Content navigation={navigation} />
            {/* <BottomTab icons={BottomTabIcon} navigation={navigation} /> */}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
});

export default HomeScreen;
