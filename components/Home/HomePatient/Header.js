import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getProfile } from '../../../apis/getApis';
import AsyncStorage from '@react-native-async-storage/async-storage';

const avatar = 'https://static.antoree.com/avatar.png';

const Header = ({ navigation }) => {
    const [datas, setDatas] = useState({});

    getProfile().then((res) => {
        setDatas(res);
    });
    useEffect(() => {}, [datas]);
    if (datas && datas?.accountResponse) {
        AsyncStorage.setItem('NamePatient', datas?.accountResponse?.name.toString());
        // AsyncStorage.setItem('BirthdayPatient', datas?.accountResponse?.birthday.toString());
        AsyncStorage.setItem('PhonePatient', datas?.accountResponse?.phone.toString());
        // AsyncStorage.setItem('AddressPatient', datas?.accountResponse?.name.toString());
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapperHeader}>
                <View style={styles.infor}>
                    <TouchableOpacity onPress={() => navigation.goBack('LoginScreen')}>
                        <Image
                            source={{
                                uri: 'https://revelogue.com/wp-content/uploads/2021/02/adam-levine-thu-linh-e1612443773933.jpg',
                            }}
                            style={styles.iconn0}
                        />
                    </TouchableOpacity>
                    <Text style={styles.name}>Hi, {datas?.accountResponse?.name}</Text>
                </View>
                <View>
                    <View style={styles.w_iconNofiti}>
                        <Image
                            source={{
                                uri: 'https://img.icons8.com/fluency-systems-regular/40/ffffff/appointment-reminders--v1.png',
                            }}
                            style={styles.iconn1}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#6AE0D9',
    },
    wrapperHeader: {
        margin: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        color: 'white',
        paddingLeft: 10,
        fontSize: 18,
        fontWeight: '600',
    },
    infor: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nofiticationIcon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconn0: {
        height: 60,
        width: 60,
        borderWidth: 3,
        borderColor: '#fff',
        borderRadius: 14,
    },
    w_iconNofiti: {
        padding: 8,
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 14,
    },
    iconn1: {
        height: 20,
        width: 20,
    },
});
export default Header;
