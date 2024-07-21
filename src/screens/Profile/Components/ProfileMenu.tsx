import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../../theme";
import { useNavigation } from "@react-navigation/native";

const ProfileMenu: React.FC = () => {
    const navigation = useNavigation<any>();

    const menuList = [
        {
            Image: require('../../../assets/icons/my_account.png'),
            title: 'My Account',
            subTitle: 'Make changes to your account',
            navigationUrl: 'MyAccount',
        },
        {
            Image: require('../../../assets/icons/my_account.png'),
            title: 'My Membership',
            subTitle: '',
            navigationUrl: 'MyMembership',
        },
        {
            Image: require('../../../assets/icons/my_account.png'),
            title: 'Help & Support',
            subTitle: '',
            navigationUrl: 'HelpSupport',
        },
        {
            Image: require('../../../assets/icons/my_account.png'),
            title: 'Privacy Policy',
            subTitle: '',
            navigationUrl: 'PrivacyPolicy',
        },

    ]

    return (
        <View style={styles.cardContent}>
            {menuList.map((item, index) => (
                <TouchableOpacity key={index} style={styles.menuItem} onPress={() => { navigation.navigate(item.navigationUrl) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <Image
                                source={item.Image}
                                style={styles.profileImage}
                            />
                        </View>
                        <View>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.subTitle}>{item.subTitle}</Text>
                        </View>
                    </View>

                    <Image
                        source={require('../../../assets/icons/arrow_withoutbg.png')}
                        style={styles.arrowIcon}
                    />
                </TouchableOpacity>
            ))}


            <TouchableOpacity style={styles.menuItem} onPress={() => { navigation.navigate('Login') }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View>
                        <Image
                            source={require('../../../assets/icons/logout.png')}
                            style={styles.profileImage}
                        />
                    </View>
                    <View>
                        <Text style={styles.title}>Log Out</Text>
                        <Text style={styles.subTitle}>Further secure your account for safety</Text>
                    </View>
                </View>

                <Image
                    source={require('../../../assets/icons/arrow_withoutbg.png')}
                    style={styles.arrowIcon}
                />
            </TouchableOpacity>
        </View>
    )
};


const styles = StyleSheet.create({
    cardContent: {
        backgroundColor: theme.colors.secondary,
        borderRadius: 25,
        marginVertical: 10,
        position: 'relative',
        padding: 20,
        paddingVertical: 2,
    },

    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 15,
    },

    profileImage: {
        width: 50,
        height: 50,
        marginRight: 10
    },

    title: {
        color: theme.colors.text, // The color of the menu item text
        fontSize: 18, // The font size of the menu item text
        fontWeight: 'bold',
    },

    subTitle: {
        fontSize: 12,
        color: 'grey',
    },

    arrowIcon: {
        width: 14,
        height: 24,
    },
})


export default ProfileMenu;