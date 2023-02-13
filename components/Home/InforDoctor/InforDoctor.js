import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDoctorId } from '../../../apis/getApis';

const InforDoctor = ({ navigation }) => {
    const [datas, setDatas] = useState([]);
    const [docID, setDocID] = useState('');

    AsyncStorage.getItem('IdDoctor').then((result) => {
        getDoctorId(result).then((res) => {
            setDatas(res);
        });
    });
    // useEffect(() => {}, [datas]);
    const _storeData = async () => {
        try {
            await AsyncStorage.setItem('NameDoctor', datas?.accountResponse?.name.toString());
            await AsyncStorage.setItem('Location', datas?.hospitalResponse?.address.toString());

            navigation.push('BookingScreen');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <SafeAreaView style={{ margin: 20 }}>
                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10, marginTop: 15 }}
                    onPress={() => navigation.goBack('ListDoctorScreen')}
                >
                    <Image
                        source={{ uri: 'https://img.icons8.com/ios-filled/40/000000/back.png' }}
                        style={{ height: 20, width: 20 }}
                    />
                    <Text>Details</Text>
                </TouchableOpacity>
                <View>
                    <Image
                        style={{ width: '100%', height: 180, borderRadius: 8, resizeMode: 'contain' }}
                        source={{
                            uri: datas?.accountResponse?.avatar === null ? avatar : datas?.accountResponse?.avatar,
                        }}
                    />
                </View>
                <View style={{ paddingTop: 20 }}>
                    <Text style={{ fontWeight: '600', fontSize: 16 }}>Dr. {datas?.accountResponse?.name}</Text>
                    <View
                        style={{
                            paddingBottom: 10,
                            paddingTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text>{datas?.categoryResponse?.name}</Text>
                        <Text>{datas?.accountResponse?.birthday.split(' ', 1)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={styles.w_info}>
                            <Text style={{ paddingLeft: 5, fontWeight: '600', fontSize: 14 }}>Hospital</Text>
                            <View style={{ paddingTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    style={styles.iconInfo}
                                    source={{ uri: 'https://img.icons8.com/ios11/40/07AEB8/hospital-3.png' }}
                                />
                                <Text style={{ paddingLeft: 5, fontSize: 8 }}>{datas?.hospitalResponse?.name}</Text>
                            </View>
                        </View>
                        <View style={styles.w_info}>
                            <Text style={{ paddingLeft: 5, fontWeight: '600', fontSize: 14 }}>Experience</Text>
                            <View style={{ paddingTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    style={styles.iconInfo}
                                    source={{ uri: 'https://img.icons8.com/ios11/40/07AEB8/overview-pages-1.png' }}
                                />
                                <Text style={{ paddingLeft: 5, fontSize: 8 }}>? years</Text>
                            </View>
                        </View>
                        <View style={styles.w_info}>
                            <Text style={{ paddingLeft: 5, fontWeight: '600', fontSize: 14 }}>Reviews</Text>
                            <View style={{ paddingTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    style={styles.iconInfo}
                                    source={{ uri: 'https://img.icons8.com/ios11/40/07AEB8/star.png' }}
                                />
                                <Text style={{ paddingLeft: 5, fontSize: 8 }}>{datas?.rating} rating</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={{ paddingBottom: 10, paddingTop: 10, fontWeight: '600', fontSize: 14 }}>
                            Discription
                        </Text>
                        <Text style={{ fontSize: 12 }}>{datas?.accountResponse?.description}</Text>
                    </View>
                    <View>
                        <Text style={{ paddingBottom: 5, paddingTop: 10, fontWeight: '600', fontSize: 14 }}>
                            Location
                        </Text>
                        <Text style={{ fontSize: 12 }}>{datas?.hospitalResponse?.address}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.btn_book} onPress={() => _storeData()}>
                    <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>Book Appoinment</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    w_info: {
        width: '30%',
        padding: 5,
        borderRadius: 8,
        backgroundColor: '#F4F3F3',
    },
    btn_book: {
        marginTop: '45%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#50C2C9',
    },
    iconInfo: {
        height: 20,
        width: 20,
    },
});

export default InforDoctor;
