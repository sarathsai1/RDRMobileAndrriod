import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

// Define a type for the component props
interface StatusIndicatorProps {
    status: 'active' | 'deActive' | 'default' | any; // Add more status types as needed
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
    // Function to determine which content to render based on status
    const renderStatusContent = () => {
        switch (status) {
            case 'deActive':
                return (
                    <View style={styles.statusImageContent}>
                        <Image
                            source={require('../../../../assets/icons/red_status.png')}
                            resizeMode='contain'
                            style={{ width: 30, height: 30 }}
                        />
                    </View>
                );
            case 'active':
                return (
                    <View style={styles.statusImageContent}>
                        <Image
                            source={require('../../../../assets/icons/completed_status.png')}
                            resizeMode='contain'
                            style={{ width: 30, height: 30 }}
                        />
                    </View>
                );
            default:
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
});

export default StatusIndicator;
