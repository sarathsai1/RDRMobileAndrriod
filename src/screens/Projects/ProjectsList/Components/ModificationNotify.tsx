import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ModificationNotifyProps {
    message: string;
}

const ModificationNotify: React.FC<ModificationNotifyProps> = ({ message }) => {
    // Determine if message is empty and adjust styles and content accordingly
    const isEmptyMessage = message.trim().length === 0;
    const containerStyle = isEmptyMessage ? styles.emptyHeadingNotifyContent : styles.headingNotifyContent;
    const displayMessage = isEmptyMessage ? "" : message;

    return (
        <View style={containerStyle}>
            <Text style={styles.notifyText}>{displayMessage}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headingNotifyContent: {
        padding: 8,
        paddingHorizontal: 20,
        backgroundColor: '#F9D593', // Original background color
        borderTopStartRadius: 25,
        borderTopEndRadius: 25,
    },
    emptyHeadingNotifyContent: {
        padding: 1,
        paddingHorizontal: 20,
        backgroundColor: 'transparent', // Transparent background for empty message
        borderTopStartRadius: 25,
        borderTopEndRadius: 25,
    },
    notifyText: {
        color: '#252525',
        fontWeight: 'bold',
    },
});

export default ModificationNotify;
