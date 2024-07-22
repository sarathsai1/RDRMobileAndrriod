import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

// Define a type for the component props
interface StatusIndicatorProps {
    status: 'Not Started' | 'in_progress' | 'completed' | 'default'; // Add more status types as needed
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
    // Function to determine which content to render based on status
    const renderStatusContent = () => {
        switch (status) {
            case 'Not Started':
                return (
                    <View style={styles.statusImageContent}>
                        <Image
                            source={require('../../../../assets/icons/red_status.png')}
                            style={{ width: 30, height: 30 }}
                        />
                        <Text style={styles.statusYetText}>Not Yet Started</Text>
                    </View>
                );
            case 'in_progress':
                return (
                    <View style={styles.statusImageContent}>
                        <Image
                            source={require('../../../../assets/icons/pending_status.png')}
                            style={{ width: 30, height: 30 }}
                        />
                        <Text style={styles.statusPenText}>In Progress</Text>
                    </View>
                );
            case 'completed':
                return (
                    <View style={styles.statusImageContent}>
                        <Image
                            source={require('../../../../assets/icons/completed_status.png')}
                            style={{ width: 30, height: 30 }}
                        />
                        <Text style={styles.statusComplText}>Completed</Text>
                    </View>
                );
            // Add more cases for other statuses as needed
            default:
                // Default case if status doesn't match any of the above
                return null;
        }
    };

    return renderStatusContent();
};

// Styles for your components
const styles = StyleSheet.create({
    statusYetText:{
        color: '#FF2E00',
        fontSize: 12,
    },
    statusPenText:{
        color: '#FFA500',
        fontSize: 12,
    },
    statusComplText:{
        color: '#037948',
        fontSize: 12,
    },
    statusImageContent: {
        alignItems: 'center',
    },
});

export default StatusIndicator;
