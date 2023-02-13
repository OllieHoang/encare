import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import callApi from '../../../apis/axiosClient';
import { getListDoctor, getListCategory, getDataSS } from '../../../apis/getApis';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import second from '../../../assets/image/Rectangle.png'

const Category = [
    {
        name: 'Eye',
        categoryIcon: 'https://media.benhvienhathanh.vn/media/specialist/icon-07.png',
    },
    {
        name: 'Orthopedics',
        categoryIcon: 'https://media.benhvienhathanh.vn/media/specialist/icon-06.png',
    },
    {
        name: 'Endocrinology',
        categoryIcon: 'https://media.benhvienhathanh.vn/media/specialist/icon-11.png',
    },
    {
        name: 'More',
        categoryIcon: 'https://img.icons8.com/m_outlined/40/0d6db7/more.png',
    },
];
const avatar = 'https://static.antoree.com/avatar.png';

const Content = ({ navigation }) => {
    const [datas, setDatas] = useState([]);
    const [datas2, setDatas2] = useState([]);
    const stringg = 'You dont have an\nappointment yet.';
    const [appointment, setAppoitment] = useState({
        nameDoctor: '',
        category: '',
        address: '',
        date: '',
        time: '',
        avatar: '',
    });

    // const link = `api/patient/listAppointment?status=2&page=0`;
    // callApi(link, 'get')
    //     .then((res) => {
    //         setDatas(res.data.data);
    //     })
    //     .catch((e) => {
    //         console.log('list appointment:' + e);
    //     });
    getDataSS(1).then((res) => {
        setDatas2(res);
    });
    // useEffect(() => {}, []);
    // const result = datas.concat(datas2);
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.search}>
                <Text style={styles.text}>Find a service or doctor</Text>
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
            <View style={styles.content}>
                <View style={styles.banner}>
                    <Image
                        source={{
                            uri: 'https://www.rheumatology.org/portals/0/Images/Health%20Care%20Team/Patient-Role.jpg',
                        }}
                        style={styles.imgBanner}
                    />
                </View>
                <View style={styles.category}>
                    <Text style={{ fontSize: 17, fontWeight: '600' }}>Category</Text>

                    <View style={styles.w_category}>
                        {Category.map((icon, index) => (
                            <View style={{ alignItems: 'center' }} key={index}>
                                <TouchableOpacity
                                    style={styles.w_icon}
                                    onPress={() =>
                                        icon === 'More'
                                            ? navigation.push('ListDoctorScreen')
                                            : navigation.push('ListCategoryScreen')
                                    }
                                >
                                    <Image source={{ uri: icon.categoryIcon }} style={styles.iconn} />
                                </TouchableOpacity>
                                <Text>{icon.name}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                <View style={{ maxHeight: 250 }}>
                    {/* <TouchableOpacity onPress={() => navigation.push('BookingScreen')}> */}
                    <Text style={{ fontSize: 17, fontWeight: '600' }}>Upcomming Appointment</Text>
                    {/* </TouchableOpacity> */}
                    {datas2.length === 0 ? (
                        <View>
                            <Image
                                source={require('../../../assets/image/Rectangle.png')}
                                style={{ width: '100%', borderRadius: 8 }}
                                resizeMode="cover"
                            />
                            <Text style={{ top: 30, left: 30, position: 'absolute' }}>{stringg}</Text>
                        </View>
                    ) : (
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* Call api lịch khám và để một cái banner nếu ko có lịch */}
                            {datas2 &&
                                datas2.map((e, index1) => {
                                    return (
                                        <TouchableOpacity style={styles.viewAppointment} key={index1}>
                                            <Image
                                                style={styles.avatarD}
                                                source={{
                                                    uri:
                                                        result?.doctorResponse?.accountResponse?.avatar === null
                                                            ? avatar
                                                            : e?.doctorResponse?.accountResponse?.avatar,
                                                }}
                                            />
                                            <View style={styles.inforApppointment}>
                                                <View style={{ flex: 0.65, justifyContent: 'space-around' }}>
                                                    <Text style={{ fontSize: 13, fontWeight: '600' }}>
                                                        Dr. {e?.doctorResponse?.accountResponse?.name}
                                                    </Text>
                                                    <Text style={{ fontSize: 13 }}>
                                                        {e?.doctorResponse?.categoryResponse?.name}
                                                    </Text>
                                                    <Text style={{ fontSize: 12, flexWrap: 'wrap' }}>
                                                        {e?.doctorResponse?.hospitalResponse?.address}
                                                    </Text>
                                                </View>
                                                <View style={{ flex: 0.35, alignItems: 'flex-end' }}>
                                                    <Image
                                                        style={{ height: 20, width: 20 }}
                                                        source={{
                                                            uri: 'https://img.icons8.com/fluency-systems-regular/40/6AE0D9/planner.png',
                                                        }}
                                                    />
                                                    <Text style={{ fontSize: 13 }}>{e?.day.split(' ', 1)}</Text>
                                                    <Text style={{ marginTop: 5, fontSize: 15, fontWeight: '600' }}>
                                                        {e?.time}:00
                                                    </Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                })}
                        </ScrollView>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    wrapperContent: {},
    search: {
        paddingRight: 25,
        paddingLeft: 25,
        paddingBottom: 15,
        backgroundColor: '#6AE0D9',
    },
    content: {
        padding: 10,
    },
    text: {
        fontSize: 17,
        fontWeight: '600',
        color: 'white',
        marginBottom: 15,
    },
    w_inputSearch: {},
    inputSearch: {
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
    banner: {
        paddingBottom: 15,
    },
    imgBanner: {
        width: '100%',
        height: 190,
        borderRadius: 15,
        resizeMode: 'cover',
    },
    category: {},
    w_category: {
        paddingTop: 5,
        paddingBottom: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    w_icon: {
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#F4F3F3',
    },
    iconn: {
        height: 40,
        width: 40,
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
    avatarFD: {
        height: 120,
        width: 120,
        borderRadius: 8,
    },
});

export default Content;
