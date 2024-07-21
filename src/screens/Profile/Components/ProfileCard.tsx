import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from "../../../theme";

const ProfileCard: React.FC = () => {
    const [userName, setUserName] = useState<string>('');
    const [profileImage, setProfileImage] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');

    useEffect(() => {
        const getUserData = async () => {
            try {
                const value = await AsyncStorage.getItem('sarath');
                if (value !== null) {
                    console.log("AsyncStorage value", value);
                    const userData = JSON.parse(value);
                    setUserName(userData.name);
                    setProfileImage(userData.userProfile);
                    setUserEmail(userData.email);
                }
            } catch (error) {
                console.error('Error retrieving item from AsyncStorage:', error);
            }
        };

        getUserData();
    }, []);

    return (
        <View style={styles.cardContent}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View>
                    <Image
                        source={profileImage ? { uri: profileImage } : require('../../../assets/images/profile.png')}
                        style={styles.profileImage}
                    />
                </View>
                <View>
                    <Text style={styles.nameText}>{userName}</Text>
                    <Text style={styles.emailText}>{userEmail}</Text>
                </View>
            </View>
            {/* Uncomment if edit icon is needed */}
            {/* <TouchableOpacity>
                <Image
                    source={require('../../../assets/icons/edit-2.png')}
                    style={styles.editIcon}
                />
            </TouchableOpacity> */}
        </View>
    );
};

const styles = StyleSheet.create({
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        borderRadius: 25,
        marginVertical: 25,
        position: 'relative',
        padding: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        marginRight: 20,
        borderRadius: 50,
    },
    nameText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    emailText: {
        color: 'black',
    },
    // Uncomment if edit icon is needed
    // editIcon: {
    //     width: 32,
    //     height: 32,
    // },
});

export default ProfileCard;
