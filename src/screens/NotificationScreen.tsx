import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BackGround from "../components/BackGround";
import defaults from "../styles/defaults";
import { theme } from "../theme";

const NotificationScreen: React.FC = () => {
    return (
        <BackGround safeArea={true} style={defaults.flex}>
            <View style={styles.container}>
                <View style={styles.cardContent}>
                    <Text style={styles.notifyText}>Prasad has <Text style={{fontWeight: '800', color: theme.colors.text}}>approved</Text> your project allocation request!</Text>
                </View>
            </View>
        </BackGround>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    cardContent: {
        backgroundColor: theme.colors.secondary,
        borderRadius: 25,
        marginVertical: 10,
        position: 'relative',
        padding: 20,
    },

    notifyText:{
        fontSize: 16
    }
})

export default NotificationScreen;