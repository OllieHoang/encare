import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Animated,
    Platform,
    Alert,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';

import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDoctorId, getListFreeTime } from '../../../apis/getApis';
import callApi from '../../../apis/axiosClient';

import DatePicker from 'react-native-modern-datepicker';
var gettime;
var today = new Date();
const BookingInformation = ({ navigation }) => {
    const [datas, setDatas] = useState([]);
    const [freeTime, setFreeTime] = useState([]);
    const [symptom, setSymptom] = useState('');
    const [namePaitent, setNamePatient] = useState('');
    const [idDoc, setIdDoc] = useState(null);
    const [dateApp, setDateApp] = useState('');
    const [x, setX] = useState(null);
    const [nameDoctor, setNameDoctor] = useState('');
    const [location, setLocation] = useState('');

    const onGetTimeApp = (e) => {
        gettime = e;
        setX(e);
        // console.log(e);
    };

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(date) {
        return [padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join('/');
    }
    AsyncStorage.getItem('NameDoctor').then((result) => {
        setNameDoctor(result);
    });
    AsyncStorage.getItem('Location').then((result) => {
        setLocation(result);
    });
    AsyncStorage.getItem('IdDoctor').then((result) => {
        setIdDoc(result);
    });

    useEffect(() => {
        getListFreeTime(idDoc, formatDate(new Date(dateApp))).then((res) => {
            setFreeTime(res);
        });
    }, [idDoc, dateApp]);

    const onClickComfirm = async () => {
        return await callApi('api/patient/newAppointment', 'post', {
            doctorId: idDoc,
            time: x,
            day: formatDate(new Date(dateApp)),
            symptomps: symptom,
            description: '',
        })
            .then((res) => {
                console.log(res.data);
                Alert.alert('Confirm', 'You really want to make an appointment', [
                    {
                        text: 'Yes',
                        onPress: () => navigation.push('ConfirmScreen'),
                    },
                    {
                        text: 'No',
                    },
                ]);
            })
            .catch((err) => {
                console.log('booking' + err);
                console.log(idDoc);
                console.log(x);
                console.log(formatDate(new Date(dateApp)));
                console.log(symptom);
            });
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ height: 150, backgroundColor: '#6AE0D9' }}>
                <View style={{ flexDirection: 'row', marginLeft: 15 }}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => navigation.goBack('HomeScreen')}
                    >
                        <Ionicons name="chevron-back-outline" color="#121212" size={30}></Ionicons>
                        <Text>Back</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    <Text style={{ color: 'white', fontWeight: '600', fontSize: 20 }}>Booking Information</Text>
                </View>
            </SafeAreaView>
            {/* content */}
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : 'height'} style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={{ flex: 1, padding: 10 }}>
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
                                    source={{
                                        uri: 'https://www.meme-arsenal.com/memes/3e2b481b680239a88fcb3ff4e3744f51.jpg',
                                    }}
                                    style={{ height: 60, width: 60, borderRadius: 90, left: 5 }}
                                ></Image>
                                <View style={{ height: 80, left: 28, justifyContent: 'center' }}>
                                    <Text style={{ padding: 10 }}>Patient</Text>
                                    <Text style={{ paddingLeft: 10, fontWeight: '700' }}>{namePaitent}</Text>
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
                                <View style={{ height: 80, left: 48, justifyContent: 'center' }}>
                                    <Text style={{ padding: 10 }}>Doctor</Text>
                                    <Text style={{ marginLeft: 10, fontWeight: '700' }}>Dr. {nameDoctor}</Text>
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
                                <View style={{ height: 80, left: 48, justifyContent: 'center' }}>
                                    <Text style={{ padding: 10 }}>Hospital/Clinic</Text>
                                    <Text style={{ marginLeft: 10, fontWeight: '700' }}>{location}</Text>
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
                                <View style={{ height: 80, left: 54, justifyContent: 'center' }}>
                                    <Text style={{ padding: 10 }}>Service</Text>
                                    <Text style={{ marginLeft: 10, fontWeight: '700' }}>Medical Examination</Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    // maxHeight: 150,
                                    backgroundColor: '#e9e7e7',
                                    borderRadius: 8,
                                    marginTop: 6,
                                    padding: 10,
                                }}
                            >
                                <Text style={{ paddingBottom: 5 }}>Choose Date</Text>

                                <View style={{ alignItems: 'center', paddingBottom: 10 }}>
                                    {/* ngay book lich */}
                                    <DatePicker
                                        options={{
                                            backgroundColor: '#fff',
                                            selectedTextColor: '#fff',
                                            mainColor: '#00C7C7',
                                            textSecondaryColor: '#000',
                                            borderColor: 'rgba(122, 146, 165, 0.1)',
                                        }}
                                        // current={today.toISOString()}
                                        minimumDate={today.toISOString()}
                                        maximumDate="2025-01-01"
                                        mode="calendar"
                                        onSelectedChange={setDateApp}
                                        minuteInterval={30}
                                        style={{ borderRadius: 10 }}
                                    />
                                </View>
                                <View>
                                    <Text style={{ paddingBottom: 5 }}>Choose Time</Text>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                        <View style={{ width: '100%', flexDirection: 'row' }}>
                                            {/* thoi gian book lich */}
                                            {freeTime &&
                                                freeTime.map((e, index) => {
                                                    return (
                                                        <TouchableOpacity key={index} onPress={() => onGetTimeApp(e)}>
                                                            <View
                                                                style={{
                                                                    width: 80,
                                                                    marginRight: 15,
                                                                    borderRadius: 12,
                                                                    backgroundColor:
                                                                        e === x && e === gettime ? '#00C7C7' : '#fff',
                                                                    alignItems: 'center',
                                                                }}
                                                            >
                                                                <Text
                                                                    style={{
                                                                        padding: 5,
                                                                        color:
                                                                            e === x && e === gettime ? '#fff' : '#000',
                                                                    }}
                                                                >
                                                                    {e}:00
                                                                </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    );
                                                })}
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                            <View style={{ backgroundColor: '#e9e7e7', borderRadius: 8, marginTop: 6 }}>
                                <View style={{ left: 9, flexDirection: 'row', top: 8 }}>
                                    <Ionicons name="reader-outline" size={30} color="#00C7C7"></Ionicons>
                                    <Text style={{ top: 8 }}>Symptoms</Text>
                                </View>
                                <View style={{ padding: 10 }}>
                                    <TextInput
                                        height={100}
                                        paddingLeft={10}
                                        paddingRight={10}
                                        multiline={true}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        numberOfLines={4}
                                        backgroundColor="white"
                                        value={symptom}
                                        onChangeText={(text) => setSymptom(text)}
                                        placeholder={'Enter your symptoms here!'}
                                        keyboardType="default"
                                    />
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ScrollView>
            <SafeAreaView style={{ margin: 10 }}>
                <TouchableOpacity
                    style={{
                        height: 50,
                        backgroundColor: '#50C2C9',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={() => onClickComfirm()}
                >
                    <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>Confirm</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    inputUser1: {
        width: 60,
        height: 30,
        backgroundColor: 'white',
        borderColor: '#949191',
        borderWidth: 1,
        borderRadius: 8,
    },
    inputUser1: {
        width: 80,
        height: 30,
        backgroundColor: 'white',
        borderColor: '#949191',
        borderWidth: 1,
        borderRadius: 8,
    },
    selectedText: {
        width: 80,
        height: 30,
        fontSize: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255,1)',
    },
    viewTime: {
        width: 60,
        height: 30,
        fontSize: 10,
        // marginBottom: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#00C7C7',
        backgroundColor: 'white',
        // right: 21,
    },
});

export default BookingInformation;
