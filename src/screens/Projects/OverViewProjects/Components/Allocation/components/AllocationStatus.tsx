import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface AllocationStatusProps {
    status: 'accepted' | 'pending' | 'default' | any; // Add more status types as needed
}

const AllocationStatus: React.FC<AllocationStatusProps> = ({ status }) => {
    const renderStatusContent = () => {
        switch (status) {
            case 'accepted':
                return (
                    <>
                        <Text style={styles.assignmentAccepted}>
                            Accepted
                        </Text>
                    </>
                );
            case 'pending':
                return (
                    <>
                        <Text style={styles.assignmentPending}>
                            Pending
                        </Text>
                    </>
                );
            // Add more cases for other statuses as needed
            default:
                // Default case if status doesn't match any of the above
                return null;
        }
    };

    return renderStatusContent();
};

const styles = StyleSheet.create({
    assignmentAccepted: {
        fontSize: 12,
        backgroundColor: '#049659',
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

export default AllocationStatus;