import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import RoundInput from "../../../components/inputs/RoundInput";
import RoundButton from "../../../components/buttons/RoundButton";

// Define a type for the form data
export type FormData = {
    someField: any;
    clientName: string;
    workNature: string;
    startDate: string;
    etcDate: string;
    // Add more fields as needed
};

const ReminderForm = ({onSubmit}: {onSubmit: () => void;}) => {

    const handleSubmit = () => {

    };


    return (
        <View style={styles.formContainer}>
            <View style={styles.datesContent}>
                <RoundInput
                    style={styles.dateInput}
                    placeholder="Date"
                />
                <RoundInput
                    style={styles.dateInput}
                    placeholder="Time"
                />
            </View>

            <RoundInput
                placeholder="Write Your Imported Message"
            />

            <RoundButton
                title={'Send Daily Reminder'}
                onPress={onSubmit}
            />
        </View>
    )
}

// Component styles
const styles = StyleSheet.create({
    formContainer: {
        marginTop: 20,
        width: '100%',
    },
    datesContent: {
        flexDirection: 'row',
        justifyContent: 'space-between', // This will add space around the items
    },
    dateInput: {
        flex: 1, // This makes each input take up half the available space
        marginHorizontal: 2, // Adjust as needed for spacing between the inputs
    },
});

export default ReminderForm;