import React from "react";
import BackGround from "../../components/BackGround";
import { StyleSheet, Text, View } from "react-native";
import defaults from "../../styles/defaults";
import ProfileCard from "./Components/ProfileCard";
import ProfileMenu from "./Components/ProfileMenu";
import { theme } from "../../theme";

const ProfileScreen: React.FC = () => {
    return (
        <BackGround safeArea={true} style={defaults.flex}>
            <View style={styles.container}>
                <ProfileCard />

                <ProfileMenu />

                <View style={styles.companyLogoContent}>
                    <Text style={styles.companyLogoText}>RDR.</Text>
                    <Text style={styles.desText}>Designed By ASAR IT</Text>
                    <Text style={styles.verisionText}>Version 1.0.0</Text>
                </View>
            </View>
        </BackGround>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    companyLogoContent: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    companyLogoText:{
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.colors.text
    },
    desText:{
        fontSize: 14,
        color: theme.colors.textSecondary
    },
    verisionText:{
        color: theme.colors.textSecondary
    }

});

export default ProfileScreen;