import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../../../../theme";
import PaymentHistory from "./Components/PaymentHistory";
import AmountReminder from "./Components/AmountReminder";
import UpdateStatus from "./Components/UpdateStatus";

const Fees: React.FC = () => {
    return (
        <View style={styles.cardContent}>
            <Text style={styles.nameText}>Fees</Text>

            <View style={styles.feeAmountContent}>
                <View style={styles.amountTextContent}>
                    <Text style={styles.amountNameText}>Total Amount</Text>
                    <Text style={styles.amountText}>₹1000</Text>
                </View>

                <View style={styles.amountTextContent}>
                    <Text style={styles.amountNameText}>Due Amount</Text>
                    <Text style={styles.amountText}>₹500</Text>
                </View>
            </View>

            <PaymentHistory />

            <AmountReminder />

            <UpdateStatus />
            
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

    feeAmountContent: {
        margin: 20,
    },

    amountTextContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5
    },

    amountNameText: {
        color: theme.colors.textSecondary,
        fontSize: 16,
        fontWeight: '500'
    },

    amountText: {
        color: theme.colors.text,
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Fees;