import React from "react";
import defaults from "../../../../../styles/defaults";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../../../../theme"
import AssigmentContent from "./components/AssigmentContent";
import NewRequestsAssistant from "./components/NewRequestsAssistant";

interface AllocationProps {

}

const Allocation: React.FC<AllocationProps> = () => {

    const pocNames = [
        {
            name: 'Prasad',
            status: 'accepted'
        },
        {
            name: 'Charan',
            status: 'pending'
        },
        {
            name: 'Kgp',
            status: 'accepted'
        },
    ];

    const AssistantNames = [
        {
            name: 'Guru',
            status: 'accepted'
        },
        {
            name: 'Ram',
            status: 'accepted'
        },
    ];

    return (
        <View style={styles.cardContent}>
            <Text style={styles.nameText}>Allocation</Text>

            <AssigmentContent PocNames={pocNames} AssistantNames={AssistantNames} />

            <View style={styles.divideLine}></View>

            <NewRequestsAssistant />
        </View>
    );
};

const styles = StyleSheet.create({
    cardContent: {
        backgroundColor: theme.colors.secondary,
        borderRadius: 25,
        marginVertical: 10,
        position: 'relative',
        padding: 20,
    },

    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text,
    },

    divideLine: {
        height: 2,
        backgroundColor: '#D8D9DD',
        marginVertical: 10,
        marginHorizontal: 25,
    },
});

export default Allocation;