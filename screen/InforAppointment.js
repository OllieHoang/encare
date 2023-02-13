import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import callApi from '../apis/axiosClient';
import { getAppId } from '../apis/getApis';

const InforAppointment = ({ navigation }) => {
    const [datas, setDatas] = useState({});

    AsyncStorage.getItem('IdApp').then((result) => {
        getAppId(setDatas, result);
    });

    // const checkStatus = (temp) => {
    //     if (temp === 2) {
    //         return 'Confirmed';
    //     } else if (temp === 1) {
    //         return 'Waiting';
    //     } else if (temp === 3) {
    //         return 'Done';
    //     } else {
    //         return;
    //     }
    // };
    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <SafeAreaView style={{ height: 150, backgroundColor: '#6AE0D9' }}>
                <View style={{ flexDirection: 'row', marginLeft: 15 }}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => navigation.goBack('AppointmentScreen')}
                    >
                        <Ionicons name="chevron-back-outline" color="#121212" size={30}></Ionicons>
                        <Text>Back</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    <Text style={{ color: 'white', fontWeight: '600', fontSize: 20 }}>Information Appointment</Text>
                </View>
            </SafeAreaView>
            <ScrollView>
                <View style={{ padding: 10 }}>
                    <View
                        style={{
                            width: '100%',
                            backgroundColor: '#e9e7e7',
                            borderRadius: 8,
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}
                    >
                        <Image
                            source={{ uri: 'https://www.meme-arsenal.com/memes/3e2b481b680239a88fcb3ff4e3744f51.jpg' }}
                            style={{ height: 60, width: 60, borderRadius: 90, left: 5 }}
                        ></Image>
                        <View style={{ height: 70, left: 28, justifyContent: 'center' }}>
                            <Text style={{ padding: 10 }}>Patient</Text>
                            <Text style={{ paddingLeft: 10, fontWeight: '700' }}>
                                {datas?.userResponse?.accountResponse?.name}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            backgroundColor: '#e9e7e7',
                            borderRadius: 8,
                            marginTop: 6,
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}
                    >
                        <View style={{ left: 16 }}>
                            <Ionicons name="heart-circle-outline" size={40} color="#00C7C7"></Ionicons>
                        </View>
                        <View style={{ height: 70, left: 48, justifyContent: 'center' }}>
                            <Text style={{ padding: 10 }}>Doctor</Text>
                            <Text style={{ marginLeft: 10, fontWeight: '700' }}>Dr. mm</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            backgroundColor: '#e9e7e7',
                            borderRadius: 8,
                            marginTop: 6,
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}
                    >
                        <View style={{ left: 16 }}>
                            <Ionicons name="location-outline" size={40} color="#00C7C7"></Ionicons>
                        </View>
                        <View style={{ height: 70, left: 48, justifyContent: 'center' }}>
                            <Text style={{ padding: 10 }}>Hospital/Clinic</Text>
                            <Text style={{ marginLeft: 10, fontWeight: '700' }}>mm</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            backgroundColor: '#e9e7e7',
                            borderRadius: 8,
                            marginTop: 6,
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}
                    >
                        <View style={{ left: 16 }}>
                            <Ionicons name="receipt-outline" size={35} color="#00C7C7"></Ionicons>
                        </View>
                        <View style={{ height: 70, left: 54, justifyContent: 'center' }}>
                            <Text style={{ padding: 10 }}>Service</Text>
                            <Text style={{ marginLeft: 10, fontWeight: '700' }}>Hello hello</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            backgroundColor: '#e9e7e7',
                            borderRadius: 8,
                            marginTop: 6,
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}
                    >
                        <View style={{ left: 16 }}>
                            <Ionicons name="time-outline" size={40} color="#00C7C7" />
                        </View>
                        <View style={{ height: 70, left: 48, justifyContent: 'center' }}>
                            <Text style={{ padding: 10 }}>DateTime</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginLeft: 10, fontWeight: '700' }}>mm</Text>
                                <Text style={{ marginLeft: 80, fontWeight: '700' }}>mm</Text>
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            backgroundColor: '#e9e7e7',
                            borderRadius: 8,
                            marginTop: 6,
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}
                    >
                        <View style={{ left: 16 }}>
                            <MaterialCommunityIcons name="list-status" size={40} color="#00C7C7" />
                        </View>
                        <View style={{ height: 70, left: 48, justifyContent: 'center' }}>
                            <Text style={{ padding: 10 }}>Status</Text>
                            <Text style={{ marginLeft: 10, fontWeight: '700' }}>mm</Text>
                        </View>
                    </View>
                    <View style={{ minHeight: 150, backgroundColor: '#e9e7e7', borderRadius: 8, marginTop: 6 }}>
                        <View style={{ left: 9, flexDirection: 'row', top: 8 }}>
                            <Ionicons name="reader-outline" size={30} color="#00C7C7"></Ionicons>
                            <Text style={{ top: 8 }}>Symptoms</Text>
                        </View>
                        <View style={{ padding: 10, borderRadius: 10 }}>
                            <Text style={{ minHeight: 100, width: '100%', backgroundColor: '#fff', padding: 5 }}>
                                mm
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default InforAppointment;
