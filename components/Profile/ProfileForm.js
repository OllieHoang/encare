import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import callApi from '../../apis/axiosClient';
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';

const Edit = 'Edit Profile';
const Show = 'No Change';
const ProfileForm = ({ navigation }) => {
    const [change, setChange] = useState(Show);
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [phoneN, setPhoneN] = useState('');

    AsyncStorage.getItem('NamePatient').then((result) => {
        setName(result);
    });
    AsyncStorage.getItem('BirthdayPatient').then((result) => {
        setBirthday(result);
    });
    AsyncStorage.getItem('PhonePatient').then((result) => {
        setPhoneN(result);
    });
    useEffect(() => {}, [name]);
    const ViewInfo = () => (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: '600' }}>Personal Information</Text>
                <TouchableOpacity onPress={() => setChange(Edit)}>
                    <Text style={{ color: '#00C7C7' }}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
            <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                <Text style={{ fontWeight: '600' }}>Name</Text>
                <Text style={{ paddingTop: 5 }}>{name}</Text>
                <View style={{ height: 1, backgroundColor: '#949191' }} />
            </View>
            <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                <Text style={{ fontWeight: '600' }}>Birthday</Text>
                <Text style={{ paddingTop: 5 }}>{birthday.split(' ', 1)}</Text>
                <View style={{ height: 1, backgroundColor: '#949191' }} />
            </View>
            <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                <Text style={{ fontWeight: '600' }}>Phone Number</Text>
                <Text style={{ paddingTop: 5 }}>{phoneN}</Text>
                <View style={{ height: 1, backgroundColor: '#949191' }} />
            </View>
            <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                <Text style={{ fontWeight: '600' }}>Address</Text>
                <Text style={{ paddingTop: 5 }}>Da Nang, Viet Nam</Text>
                <View style={{ height: 1, backgroundColor: '#949191' }} />
            </View>
        </View>
    );
    const ViewEditInfo = () => {
        const saveInformation = async (name, birthday) => {
            await callApi('api/user/update', 'post', {
                name: name,
                description: '',
                birthDay: birthday,
            })
                .then((res) => {
                    setName(name);
                    setBirthday(birthday);
                    console.log(res.data);
                    Alert.alert('Changed Success', res.message, [
                        {
                            text: 'Ok',
                            onPress: () => setChange(Show),
                            style: 'cancel',
                        },
                    ]);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        return (
            <Formik
                initialValues={{ userName: '', birthday: '' }}
                // onSubmit={() => {}}
                validateOnMount={true}
            >
                {({ handleChange, handleBlur, values, errors }) => (
                    <>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontWeight: '600' }}>Personal Information</Text>
                            <TouchableOpacity onPress={() => setChange(Show)}>
                                <Text style={{ color: '#00C7C7' }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                            <Text style={{ fontWeight: '600' }}>Name</Text>
                            <TextInput
                                style={{ paddingTop: 5 }}
                                placeholder="Change Name"
                                onChangeText={handleChange('userName')}
                                onBlur={handleBlur('userName')}
                                value={values.userName}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            <View style={{ height: 1, backgroundColor: '#949191' }} />
                        </View>
                        <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                            <Text style={{ fontWeight: '600' }}>Birthday</Text>
                            <TextInput
                                style={{ paddingTop: 5 }}
                                placeholder="Change Birthday (Format: DD/MM/YYYY)"
                                onChangeText={handleChange('birthday')}
                                onBlur={handleBlur('birthday')}
                                value={values.birthday}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            <View style={{ height: 1, backgroundColor: '#949191' }} />
                        </View>
                        <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                            <Text style={{ fontWeight: '600' }}>Phone Number</Text>
                            <Text style={{ paddingTop: 5 }}>{phoneN}</Text>
                            <View style={{ height: 1, backgroundColor: '#949191' }} />
                        </View>
                        <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                            <Text style={{ fontWeight: '600' }}>Address</Text>
                            <Text style={{ paddingTop: 5 }}>Da Nang, Viet Nam</Text>
                            <View style={{ height: 1, backgroundColor: '#949191' }} />
                        </View>
                        <View style={{ top: 20 }}>
                            <TouchableOpacity
                                onPress={() => navigation.push('ChangePassScreen')}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{ color: '#00C7C7' }}>Change Password</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                height: 43,
                                top: 70,
                                backgroundColor: '#00C7C7',
                                borderRadius: 8,
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onPress={() => saveInformation(values.userName, values.birthday)}
                            >
                                <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
        );
    };
    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ alignItems: 'center', padding: 20 }}>
                    <Text style={{ fontWeight: '600', fontSize: 20 }}>Profile</Text>
                </View>
                <View>
                    <Image
                        source={{
                            uri: 'https://revelogue.com/wp-content/uploads/2021/02/adam-levine-thu-linh-e1612443773933.jpg',
                        }}
                        style={{ height: 120, width: 120, borderRadius: 14 }}
                    />
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                    <Text style={{ fontWeight: '600' }}>{name}</Text>
                    <Text>Patient</Text>
                </View>
            </SafeAreaView>
            <View style={{ padding: 15 }}>{change && change === Show ? <ViewInfo /> : <ViewEditInfo />}</View>
        </View>
    );
};

export default ProfileForm;
