import React from 'react';
import { SafeAreaView } from 'react-native';
import ProfileForm from '../components/Profile/ProfileForm';
import BottomTab, { BottomTabIcon } from '../components/Home/HomePatient/BottomTabIcon';
import { View, StyleSheet } from 'react-native';

const ProfilePatient = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ProfileForm navigation={navigation} />
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
export default ProfilePatient;
