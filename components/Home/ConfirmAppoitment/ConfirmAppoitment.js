import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';

const IMAGE_TITLELOGIN = require('../../../assets/image/image_title_login.jpeg');
const ConfirmAppoitment = ({ navigation }) => {
    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View
                style={{
                    flex: 1,
                    height: 300,
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    borderBottomLeftRadius: 45,
                    borderBottomRightRadius: 45,
                    backgroundColor: '#6AE0D9',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <View style={{ width: 60, height: 60, backgroundColor: 'white', borderRadius: 90 }}></View>
                <View style={{ marginTop: -70, marginRight: -5 }}>
                    <Ionicons name="checkmark-circle-outline" size={75} color="#6AE0D9"></Ionicons>
                </View>

                <Text style={{ fontSize: 25, color: 'white', fontWeight: '700' }}>Booking Confirmed!!</Text>
                <View style={{ height: 30 }}></View>
                <View style={{ marginLeft: 15, marginRight: 15, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, color: 'white' }}>Your appointment has been sent.</Text>

                    <Text
                        style={{
                            fontSize: 15,
                            color: 'white',
                            textAlign: 'center',
                        }}
                    >
                        You will receive a notification when the appointment is confirmed.
                    </Text>
                </View>
            </View>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <Image source={IMAGE_TITLELOGIN} style={{ height: 240, width: 350, borderRadius: 8 }}></Image>
            </View>
            <View style={{ top: 100, padding: 10, alignItems: 'center' }}>
                <TouchableOpacity
                    style={{
                        height: 60,
                        width: '100%',
                        backgroundColor: '#00C7C7',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={() => navigation.navigate('HomeTab')}
                >
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>Done</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({});

export default ConfirmAppoitment;
