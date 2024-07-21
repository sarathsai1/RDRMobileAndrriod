import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../../../../../theme";
import AllocationStatus from "./AllocationStatus";

interface AssigmentNamesProps {
    name: string;
    status: string;
}

interface AssigmentContentProps {
    PocNames: AssigmentNamesProps[];
    AssistantNames: AssigmentNamesProps[];
}

const AssigmentContent: React.FC<AssigmentContentProps> = ({ PocNames, AssistantNames }) => {
    return (
        <View style={styles.assignmentContent}>
            <View style={styles.pocContent}>
                <Text style={styles.nameOfTitle}>POC of assigment:</Text>
                <View style={styles.assignmentList}>
                    {PocNames.map((poc, index) => (
                        <View key={index} style={styles.assignmentItem}>
                            <Text style={styles.assignmentName}>• {poc.name}</Text>
                            <AllocationStatus status={poc.status} />
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.assistantContent}>
                <Text style={styles.nameOfTitle}>Assistant of assigment:</Text>
                <View style={styles.assignmentList}>
                    {AssistantNames.map((assistant, index) => (
                        <View key={index} style={styles.assignmentItem}>
                            <Text style={styles.assignmentName}>• {assistant.name}</Text>
                            <AllocationStatus status={assistant.status} />
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    assignmentContent: {
        margin: 15,
    },
    pocContent: {
        marginBottom: 20,
    },
    assistantContent: {
    },
    nameOfTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: theme.colors.text
    },
    assignmentList: {
        marginTop: 10,
        marginLeft: 10,
    },
    assignmentItem: {
        flexDirection: 'row',
        marginBottom: 5,
        alignItems: 'center',
    },
    assignmentName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    assignmentAccepted: {
        fontSize: 12,
        backgroundColor: 'green',
        borderRadius: 50,
        paddingHorizontal: 8,
        paddingVertical: 2,
        color: 'white',
        marginHorizontal: 6,
    },
    assignmentPending: {
        fontSize: 12,
        backgroundColor: '#FFA500',
        borderRadius: 50,
        paddingHorizontal: 8,
        paddingVertical: 2,
        color: 'white',
        marginHorizontal: 6,
    },
});

export default AssigmentContent;