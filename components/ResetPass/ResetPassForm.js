import {
    View,
    Text,
    Keyboard,
    StyleSheet,
    SafeAreaView,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { validateSchema } from '../validateSchema';
import { Formik } from 'formik';
import callApi from '../../apis/axiosClient';

const IMAGE_BACKGROUND = require('../../assets/image/login_background.png');

const ResetPassForm = ({ navigation }) => {
    // const [text, onChangeText] = React.useState('');
    const [isSecureEntry, setIsSecureEntry] = useState(true);
    const changePass = async (oldPass, newPass, cfmpassword) => {
        await callApi('/api/patient/newPassword', 'post', {
            oldPassword: oldPass,
            newPassword: newPass,
        })
            .then((res) => {
                console.log(res.data);
                Alert.alert('Changed Passworl.Please again Login', res.message, [
                    {
                        text: 'Ok',
                        onPress: () => navigation.navigate('LoginScreen'),
                        style: 'cancel',
                    },
                ]);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <ImageBackground style={styles.backgroundImg} source={IMAGE_BACKGROUND}>
            <Formik
                initialValues={{ oldPass: '', newPass: '', cfPass: '' }}
                // onSubmit={() => {}}
                validationSchema={validateSchema}
                validateOnMount={true}
            >
                {({ handleChange, handleBlur, values, errors }) => (
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <SafeAreaView style={styles.container}>
                            <View style={{ flexDirection: 'row', marginLeft: 15 }}>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                    onPress={() => navigation.goBack('ProfilePatient')}
                                >
                                    <Ionicons name="chevron-back-outline" color="#121212" size={30}></Ionicons>
                                    <Text>Back</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ alignItems: 'center', marginTop: 70 }}>
                                <Text style={{ fontWeight: '600', fontSize: 19, lineHeight: 40, letterSpacing: 2 }}>
                                    Change Password
                                </Text>
                            </View>
                            <KeyboardAvoidingView
                                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                style={styles.w_Input}
                            >
                                <View style={styles.w_Input}>
                                    <View style={styles.boxInput}>
                                        <View style={{ alignItems: 'center' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <TextInput
                                                    style={styles.inputUser}
                                                    onBlur={handleBlur('oldPass')}
                                                    onChangeText={handleChange('oldPass')}
                                                    value={values.oldPass}
                                                    placeholder="Old password"
                                                    secureTextEntry={isSecureEntry}
                                                />

                                                <View
                                                    style={{
                                                        position: 'absolute',
                                                        right: 0,
                                                        top: 5,
                                                        padding: 10,
                                                    }}
                                                >
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setIsSecureEntry((prev) => !prev);
                                                        }}
                                                    >
                                                        {isSecureEntry ? (
                                                            <Ionicons name="eye-outline" size={20}></Ionicons>
                                                        ) : (
                                                            <Ionicons name="eye-off-outline" size={20}></Ionicons>
                                                        )}
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                            {errors.oldPass ? (
                                                <Text style={{ color: 'red', fontSize: 12, bottom: 10 }}>
                                                    {errors.oldPass}
                                                </Text>
                                            ) : null}
                                        </View>
                                        <View style={{ alignItems: 'center' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <TextInput
                                                    style={styles.inputUser}
                                                    onBlur={handleBlur('newPass')}
                                                    onChangeText={handleChange('newPass')}
                                                    value={values.newPass}
                                                    placeholder="Create new password"
                                                    secureTextEntry={isSecureEntry}
                                                />

                                                <View
                                                    style={{
                                                        position: 'absolute',
                                                        right: 0,
                                                        top: 5,
                                                        padding: 10,
                                                    }}
                                                >
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setIsSecureEntry((prev) => !prev);
                                                        }}
                                                    >
                                                        {isSecureEntry ? (
                                                            <Ionicons name="eye-outline" size={20}></Ionicons>
                                                        ) : (
                                                            <Ionicons name="eye-off-outline" size={20}></Ionicons>
                                                        )}
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                            {errors.newPass ? (
                                                <Text style={{ color: 'red', fontSize: 12, bottom: 10 }}>
                                                    {errors.newPass}
                                                </Text>
                                            ) : null}
                                        </View>
                                        <View style={{ alignItems: 'center' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <TextInput
                                                    style={styles.inputUser}
                                                    onBlur={handleBlur('cfPass')}
                                                    onChangeText={handleChange('cfPass')}
                                                    value={values.cfPass}
                                                    placeholder="Confirm new password"
                                                    secureTextEntry={isSecureEntry}
                                                />

                                                <View
                                                    style={{
                                                        position: 'absolute',
                                                        right: 0,
                                                        top: 5,
                                                        padding: 10,
                                                    }}
                                                >
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setIsSecureEntry((prev) => !prev);
                                                        }}
                                                    >
                                                        {isSecureEntry ? (
                                                            <Ionicons name="eye-outline" size={20}></Ionicons>
                                                        ) : (
                                                            <Ionicons name="eye-off-outline" size={20}></Ionicons>
                                                        )}
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                            {errors.cfPass ? (
                                                <Text style={{ color: 'red', fontSize: 12, bottom: 10 }}>
                                                    {errors.cfPass}
                                                </Text>
                                            ) : null}
                                        </View>
                                    </View>
                                    <View style={styles.w_BtnRegister}>
                                        <TouchableOpacity
                                            style={styles.btn_Register}
                                            onPress={() =>
                                                values.newPass.length < 6 || values.newPass !== values.cfPass
                                                    ? Alert.alert(
                                                          'Please enter correctly as required',
                                                          values.message,
                                                          [
                                                              {
                                                                  text: 'Ok',
                                                                  onPress: () => console.log('Ok'),
                                                                  style: 'cancel',
                                                              },
                                                          ],
                                                      )
                                                    : changePass(values.oldPass, values.newPass, values.cfPass)
                                            }
                                        >
                                            <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>
                                                Change
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </KeyboardAvoidingView>
                            {/*  */}
                            {/* <View style={styles.w_SignIn}>
                        <View style={styles.alreadyHaveAcc}>
                            <Text>Already have an account?</Text>

                            <TouchableOpacity onPress={() => navigation.goBack('LoginScreen')}>
                                <Text style={{ color: '#50C2C9', fontWeight: '700', fontSize: 14 }}>Sign In</Text>
                            </TouchableOpacity>
                        </View> */}
                            {/* </View> */}
                        </SafeAreaView>
                    </TouchableWithoutFeedback>
                )}
            </Formik>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImg: {
        width: '100%',
        height: '100%',
        sresizeMode: 'cover',
    },
    container: {
        flex: 1,
    },
    w_Title: {
        marginTop: 25,
        height: '25%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    title: {
        fontWeight: '600',
        fontSize: 19,
        lineHeight: 40,
        letterSpacing: 2,
    },
    w_Input: {
        height: '65%',
        alignItems: 'center',
    },
    boxInput: {
        paddingTop: 70,
    },
    inputUser: {
        width: 280,
        height: 50,
        fontSize: 13,
        marginBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderWidth: 1,
        borderRadius: 23,
        backgroundColor: 'rgba(106, 224, 217, 0.2)',
    },
    w_BtnRegister: {
        marginTop: 100,
    },
    btn_Register: {
        width: 280,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(80, 194, 201, 1)',
    },
    w_SignIn: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    alreadyHaveAcc: {
        flexDirection: 'row',
    },
});

export default ResetPassForm;
