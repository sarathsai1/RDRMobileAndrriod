import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import BackGround from './BackGround';
import defaults from '../styles/defaults';
import { theme } from '../theme';
import { useNavigation } from '@react-navigation/native';

const ApprovalStatus: React.FC = () => {
    const navigation = useNavigation<any>();

    return (
        <BackGround safeArea={true} style={defaults.flex}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate('')}>
                    <Image
                        source={require('../assets/icons/status_pending.png')} // Replace with your local icon path
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <Text style={styles.heading}>Account Approval Pending</Text>
                <Text style={styles.description}>
                    Your account is awaiting approval. Please wait for the administrator to
                    review your application,{"\n"}Reference No:
                    <Text style={styles.highlight}> RDR02457896584.</Text>
                </Text>
            </View>
        </BackGround>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 200, // Set the size of your icon
        height: 205, // Set the size of your icon
        marginBottom: 20,
        // You might need to adjust the opacity and color if your icon doesn't match the design
        tintColor: 'grey',
        opacity: 1,
    },
    heading: {
        fontSize: 30,
        color: theme.colors.text,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    description: {
        textAlign: 'center',
        fontSize: 12,
        color: theme.colors.textSecondary,
    },
    highlight: {
        fontWeight: 'bold',
        color: theme.colors.text, // Change the color to your preference for highlighting
    },
});

export default ApprovalStatus;
