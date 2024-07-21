import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../../../../../theme";
import LinearGradient from 'react-native-linear-gradient';
import RoundButton from "../../../../../../components/buttons/RoundButton";

const AmountReminder: React.FC = () => {
    function handleSubmit(): void {
    }

    return (
        <LinearGradient
            start={{ x: 0, y: 0 }} // Start at the left
            end={{ x: 1, y: 0 }}   // End at the right
            colors={['#E3E3E4', '#EDEEF1', '#F0F1F5']}
            style={styles.cardContent}
        >
            <View style={styles.reminderContent}>
                <View style={styles.textContainer}>
                    <Text style={styles.typeText}>Next Due Date</Text>
                    <Text style={styles.dateText}>15 Feb, 2024</Text>
                </View>

                <View>
                    <RoundButton
                        title={'Send Reminder'}
                        onPress={handleSubmit}
                    />
                </View>
            </View>

        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    cardContent: {
        borderRadius: 25,
        marginVertical: 10,
        marginBottom: 30,
        position: 'relative',
        padding: 20,
    },
    reminderContent: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    typeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.text
    },
    dateText: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.text
    },
})

export default AmountReminder;