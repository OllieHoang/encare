import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getListCategory } from '../../../apis/getApis';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListCategogy = ({ navigation }) => {
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        getListCategory().then((res) => {
            setDatas(res);
        });
    }, []);

    const _storeData = async (idcat) => {
        try {
            await AsyncStorage.setItem('IdCategory', idcat);

            navigation.push('ListDoctorScreen');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack('HomeScreen')}>
                    <Image
                        source={{ uri: 'https://img.icons8.com/ios-filled/40/000000/back.png' }}
                        style={styles.backIcon}
                    />
                    <Text style={{ fontWeight: '500' }}>Back</Text>
                </TouchableOpacity>
                <Header />
            </SafeAreaView>
            <View style={{ padding: 10 }}>
                {datas &&
                    datas.map((e, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.w_Item}
                            onPress={() => _storeData(e.categoryId.toString())}
                        >
                            <Text>{e.name}</Text>
                        </TouchableOpacity>
                    ))}
            </View>
            {/* <TouchableOpacity onPress={() => _retrieveData()}>
                <Text>test</Text>
            </TouchableOpacity> */}
        </View>
    );
};
const Header = () => {
    return (
        <View style={styles.search}>
            <Text style={styles.text}>Find a category </Text>
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
});

export default ListCategogy;
