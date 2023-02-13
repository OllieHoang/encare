import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getListDoctor } from '../../../apis/getApis';
import AsyncStorage from '@react-native-async-storage/async-storage';
const avatar = 'https://static.antoree.com/avatar.png';

const ListDoctor = ({ navigation }) => {
    const Header = () => {
        return (
            <View style={styles.search}>
                <Text style={styles.text}>Find a doctor </Text>
                <View style={styles.w_inputSearch}>
                    <TextInput
                        style={styles.inputSearch}
                        placeholder="Search"
                        placeholderTextColor="white"
                        autoCorrect={false}
                    />
                    <TouchableOpacity style={styles.w_iconSearch}>
                        <Image
                            source={{ uri: 'https://img.icons8.com/fluent-systems-filled/40/07AEB8/search.png' }}
                            style={styles.iconSearch}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const ListItem = ({ props }) => {
        const [datas, setDatas] = useState([]);
        const [appID, setAppID] = useState('');

        AsyncStorage.getItem('IdCategory').then((result) => {
            getListDoctor(result).then((res) => {
                setDatas(res);
            });
        });
        // useEffect(() => {}, [datas]);

        const _storeData = async (IdDoctor) => {
            try {
                await AsyncStorage.setItem('IdDoctor', IdDoctor);
                props.push('InforDoctorScreen');
            } catch (error) {
                console.log(error);
            }
        };

        return (
            // <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                {datas &&
                    datas.map((e, index) => {
                        return (
                            <View style={styles.viewAppointment} key={index}>
                                <Image
                                    style={styles.avatarD}
                                    source={{
                                        uri: e?.accountResponse?.avatar === null ? avatar : e?.accountResponse?.avatar,
                                    }}
                                />
                                <View style={styles.inforApppointment}>
                                    <View style={{ flex: 0.65, justifyContent: 'space-around' }}>
                                        <View>
                                            <Text style={{ fontSize: 13, fontWeight: '600' }}>
                                                {e.accountResponse.name}
                                            </Text>
                                            {/* <Text style={{ fontSize: 10 }}>4 sao</Text> */}
                                        </View>
                                        <Text style={{ fontSize: 10 }}>{e.hospitalResponse.name}</Text>
                                        <Text style={{ fontSize: 10, flexWrap: 'wrap' }}>
                                            {e.hospitalResponse.address}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 0.35, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                        <TouchableOpacity
                                            style={{ padding: 6, backgroundColor: '#50C2C9', borderRadius: 8 }}
                                            onPress={() => _storeData(e.doctorId.toString())}
                                        >
                                            <Text style={{ color: 'white' }}> More </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        );
                    })}
            </View>
            // </ScrollView>
        );
    };
    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack('ListCategoryScreen')}>
                    <Image
                        source={{ uri: 'https://img.icons8.com/ios-filled/40/000000/back.png' }}
                        style={styles.backIcon}
                    />
                    <Text style={{ fontWeight: '500' }}>Back</Text>
                </TouchableOpacity>
                <Header />
            </SafeAreaView>
            <ScrollView>
                <View style={{ padding: 10 }}>
                    <ListItem props={navigation} />
                </View>
            </ScrollView>
            <SafeAreaView
                style={{ height: 30, width: '100%', bottom: 0, position: 'absolute', backgroundColor: 'transparent' }}
            ></SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#6AE0D9',
    },
    search: {
        paddingRight: 25,
        paddingLeft: 25,
        paddingBottom: 15,
        alignItems: 'center',
        backgroundColor: '#6AE0D9',
    },
    text: {
        fontSize: 17,
        fontWeight: '600',
        color: 'white',
        marginBottom: 5,
    },

    w_inputSearch: {},
    inputSearch: {
        minWidth: '100%',
        height: 46,
        paddingLeft: 20,
        borderRadius: 14,
        backgroundColor: 'rgba(255, 253, 253, 0.45)',
    },
    w_iconSearch: {
        height: 46,
        width: 46,
        right: 0,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: 'white',
    },
    iconSearch: {
        height: 27,
        width: 27,
    },
    back: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
    },
    backIcon: {
        height: 20,
        width: 20,
    },
    w_Item: {
        marginBottom: 10,
        height: 43,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 8,
        justifyContent: 'center',
        backgroundColor: '#F4F3F3',
    },
    viewAppointment: {
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 8,
        flexDirection: 'row',
        backgroundColor: '#F4F3F3',
    },
    inforApppointment: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    avatarD: {
        height: 80,
        width: 80,
        marginRight: 15,
        borderRadius: 8,
    },
});

export default ListDoctor;
