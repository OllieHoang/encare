import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import callApi from '../../apis/axiosClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CURRENTLY = 'Curently';
const HISTORY = 'History';
const avatar = 'https://static.antoree.com/avatar.png';

const AppointmentView = ({ navigation }) => {
    const [dataComfirmed, setComfirmed] = useState([]);
    const [dataWaitting, setWaitting] = useState([]);
    const [dataSuccess, setSuccess] = useState([]);
    const [dataSuccess2, setSuccess2] = useState([]);

    const [page, setPage] = useState(CURRENTLY);

    useEffect(() => {
        const link = `api/patient/listAppointment?status=2&page=2`;
        callApi(link, 'get')
            .then((res) => {
                setComfirmed(res.data.data);
            })
            .catch((e) => {
                console.log('list appointment:' + e);
            });

        const link2 = `api/patient/listAppointment?status=1&page=2`;
        callApi(link2, 'get')
            .then((res) => {
                setWaitting(res.data.data);
            })
            .catch((e) => {
                console.log('list appointment:' + e);
            });

        const link3 = `api/patient/listAppointment?status=3&page=0`;
        callApi(link3, 'get')
            .then((res) => {
                setSuccess(res.data.data);
            })
            .catch((e) => {
                console.log('list appointment:' + e);
            });

        const link4 = `api/patient/listAppointment?status=3&page=1`;
        callApi(link4, 'get')
            .then((res) => {
                setSuccess2(res.data.data);
            })
            .catch((e) => {
                console.log('list appointment:' + e);
            });
    }, [dataWaitting, dataComfirmed, dataSuccess2]);
    const result = dataComfirmed.concat(dataWaitting);
    const sortResult = result.sort((a, b) => a.day.split(' ', 1) - b.day.split(' ', 1));
    const sortResultTime = sortResult.sort((a, b) => a.time - b.time);

    const resultSS = dataSuccess.concat(dataSuccess2);

    const CurentlyHistory = ({ temp }) => {
        const onGetID = async (IdApp) => {
            try {
                await AsyncStorage.setItem('IdApp', IdApp.toString());
                navigation.push('InforAppointment');
            } catch (error) {
                console.log(error);
            }
        };
        const checkStatus = (temp) => {
            if (temp === 2) {
                return 'Confirmed';
            } else if (temp === 1) {
                return 'Waiting';
            } else if (temp === 3) {
                return 'Done';
            } else {
                return;
            }
        };
        return (
            <View>
                {temp.map((e, index1) => {
                    return (
                        <TouchableOpacity
                            style={styles.viewAppointment}
                            key={index1}
                            onPress={() => onGetID(e?.appointmentId)}
                        >
                            <Image
                                style={styles.avatarD}
                                source={{
                                    uri:
                                        e?.doctorResponse?.accountResponse?.avatar === null
                                            ? avatar
                                            : e?.doctorResponse?.accountResponse?.avatar,
                                }}
                            />
                            <View style={styles.inforApppointment}>
                                <View style={{ flex: 0.64, justifyContent: 'space-around' }}>
                                    <Text style={{ fontSize: 13, fontWeight: '600' }}>
                                        Dr. {e?.doctorResponse?.accountResponse?.name}
                                    </Text>
                                    <Text style={{ fontSize: 13 }}>{e?.doctorResponse?.categoryResponse?.name}</Text>
                                    <Text style={{ fontSize: 12, flexWrap: 'wrap' }}>
                                        {e?.doctorResponse?.hospitalResponse?.address}
                                    </Text>
                                </View>
                                <View style={{ flex: 0.36, alignItems: 'flex-end', marginTop: 7 }}>
                                    <Text style={{ fontSize: 13 }}>{e?.day.split(' ', 1)}</Text>
                                    <Text style={{ marginTop: 5, fontSize: 13, fontWeight: '600' }}>{e?.time}:00</Text>
                                    <View
                                        style={{
                                            marginTop: 10,
                                            // backgroundColor: e?.statusResponse?.statusId !== 1 ? 'green' : 'yellow',
                                            borderWidth: 1,
                                            backgroundColor: '#fff',
                                            borderColor: '#949191',
                                            padding: 6,
                                            borderRadius: 8,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: '#949191',
                                                fontSize: 13,
                                                fontWeight: '600',
                                            }}
                                        >
                                            {/* {e?.statusResponse?.statusId === 1 ? 'Confirmed' : 'Waitting'} */}
                                            {checkStatus(e?.statusResponse?.statusId)}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };
    const PageCurrentlyHistory = () => (
        <View
            style={{
                height: 40,
                flexDirection: 'row',
            }}
        >
            <TouchableOpacity
                style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}
                onPress={() => setPage(CURRENTLY)}
                disabled={page === CURRENTLY ? true : false}
            >
                <Text>Currently</Text>
                {page === CURRENTLY ? (
                    <View style={{ width: '70%', height: 2, borderWidth: 1, position: 'absolute', bottom: 0 }}></View>
                ) : null}
            </TouchableOpacity>

            <TouchableOpacity
                style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}
                onPress={() => setPage(HISTORY)}
                disabled={page === HISTORY ? true : false}
            >
                <Text>History</Text>
                {page === HISTORY ? (
                    <View style={{ width: '70%', height: 2, borderWidth: 1, position: 'absolute', bottom: 0 }}></View>
                ) : null}
            </TouchableOpacity>
        </View>
    );
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <SafeAreaView style={{ backgroundColor: '#6AE0D9' }}>
                <View style={styles.search}>
                    <Text style={styles.text}>Appointment </Text>
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
            </SafeAreaView>
            <PageCurrentlyHistory />
            <ScrollView>
                <View style={{ padding: 10 }}>
                    <CurentlyHistory temp={page === CURRENTLY ? sortResultTime : resultSS} />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    search: {
        marginTop: 30,
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
export default AppointmentView;
