import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../../../../../theme";

const NewRequestsAssistant: React.FC = () => {
    return (
        <View style={styles.newRequestsContent}>
            <Text style={styles.nameOfTitle}>New Requests for Assistant</Text>

            <View style={styles.assignmentList}>
                <View style={[styles.assignmentItem, styles.newRequestsContentAssignmentItem]}>
                    <Text style={styles.assignmentName}>Ram Charan</Text>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={[styles.button, styles.reject]}>
                            <Text style={[styles.buttonText, styles.danger]}>Reject</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.approve]}>
                            <Text style={styles.buttonText}>Approve</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[styles.assignmentItem, styles.newRequestsContentAssignmentItem]}>
                    <Text style={styles.assignmentName}>Prasad</Text>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={[styles.button, styles.reject]}>
                            <Text style={[styles.buttonText, styles.danger]}>Reject</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.approve]}>
                            <Text style={styles.buttonText}>Approve</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
    newRequestsContent: {

    },
    assignmentApproval: {

    },
    newRequestsContentAssignmentItem: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttons: {
        flexDirection: 'row',
    },
    button: {
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginLeft: 10,
    },
    reject: {
        borderColor: '#FD2E00', // Red
        borderWidth: 1,
    },
    approve: {
        backgroundColor: '#049659', // Light green
        borderColor: '#049659', // Green
        borderWidth: 1,
    },
    buttonText: {
        fontSize: 14,
        textAlign: 'center',
        color: 'white'
    },
    danger: {
        color: '#FD2E00'
    },
});

export default NewRequestsAssistant;