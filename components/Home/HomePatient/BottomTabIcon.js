import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';

export const BottomTabIcon = [
    {
        name: 'Home',
        active: 'https://img.icons8.com/win10/40/6AE0D9/home.png',
        inactive: 'https://img.icons8.com/win10/40/949191/home.png',
    },
    {
        name: 'Appointment',
        active: 'https://img.icons8.com/m_rounded/40/6AE0D9/event-accepted-tentatively.png',
        inactive: 'https://img.icons8.com/m_rounded/40/949191/event-accepted-tentatively.png',
    },
    {
        name: 'Message',
        active: 'https://img.icons8.com/m_outlined/40/6AE0D9/topic.png',
        inactive: 'https://img.icons8.com/m_outlined/40/949191/topic.png',
    },
    {
        name: 'Profile',
        active: 'https://img.icons8.com/fluent-systems-regular/40/6AE0D9/recent-actors.png',
        inactive: 'https://img.icons8.com/fluent-systems-regular/40/949191/recent-actors.png',
    },
];

const BottomTab = ({ icons, navigation }) => {
    const [activeTab, setActiveTab] = useState('Home');
    var flag = activeTab;
    const Icon = ({ icon }) => {
        const onChaneScreen = (element) => {
            flag = element;
            setActiveTab(element);

            switch (element) {
                case 'Home':
                    navigation.navigate('HomeScreen');
                    console.log(activeTab);
                    break;
                case 'Profile':
                    navigation.navigate('ProfilePatient');
                    console.log(activeTab);
                    break;
                case 'Appointment':
                    // navigation.navigate('ProfilePatient');

                    console.log(activeTab);
                    break;
                case 'Message':
                    // navigation.navigate('ProfilePatient');
                    console.log(activeTab);
                    break;
            }
        };
        return (
            <TouchableOpacity onPress={() => onChaneScreen(icon.name)}>
                <Image
                    source={{ uri: flag === icon.name && activeTab === icon.name ? icon.active : icon.inactive }}
                    style={styles.iconn}
                />
            </TouchableOpacity>
        );
    };
    return (
        <View style={styles.wrapper}>
            <Divider width={1} orientation="vertical" />
            <View style={styles.container}>
                {icons.map((icon, index) => (
                    <Icon key={index} icon={icon} />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        // position: 'absolute',
        bottom: 0,
        backgroundColor: '#E4E0E0',
        zIndex: 999,
        width: '100%',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 60,
    },
    iconn: {
        width: 35,
        height: 35,
    },
    profileTab: (activeTab = '') => ({
        borderRadius: 50,
    }),
});

export default BottomTab;
