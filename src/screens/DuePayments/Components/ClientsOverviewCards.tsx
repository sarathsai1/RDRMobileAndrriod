import { useNavigation } from "@react-navigation/native";
import React from "react";
import { theme } from "../../../theme";
import { StyleSheet, Text, View } from "react-native";
import RoundButton from "../../../components/buttons/RoundButton";
import ModificationNotify from "../../Projects/ProjectsList/Components/ModificationNotify";
import StatusIndicator from "../../Projects/ProjectsList/Components/StatusIndicator";

interface ClientsOverviewCardsProps {
    clientName: string;
    workNature: string;
    startDate: string;
    etcDate: string;
    totalAmount: string;
    dueAmount: string;
    onPress: () => void;
}

const ClientsOverviewCards: React.FC<ClientsOverviewCardsProps> = ({ clientName, workNature, startDate, etcDate, totalAmount, dueAmount, onPress }) => {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.cardContent}>
            <View style={styles.cardTextContent}>
                <View style={styles.headingText}>
                    <View>
                        <Text style={styles.nameText}>{clientName}</Text>
                        <Text style={styles.workText}>{workNature}<Text style={styles.workTitleText}> Work Nature</Text></Text>
                    </View>

                    <View style={styles.datesTextContent}>
                        <Text style={styles.dateTextTitle}>Start Date: <Text style={styles.dateText}>{startDate}</Text></Text>
                        <Text style={styles.dateTextTitle}>ETC: <Text style={styles.dateText}>{etcDate}</Text></Text>
                    </View>
                </View>

                <View style={styles.divideLine}></View>

                <View style={styles.feeAmountContent}>
                    <View style={styles.amountTextContent}>
                        <Text style={styles.amountNameText}>Total Amount</Text>
                        <Text style={styles.amountText}>₹{totalAmount}</Text>
                    </View>

                    <View style={styles.amountTextContent}>
                        <Text style={styles.amountNameText}>Due Amount</Text>
                        <Text style={styles.amountText}>₹{dueAmount}</Text>
                    </View>
                </View>

            </View>

            <View style={styles.viewButtonContent}>
                <RoundButton
                    title={'Send Due Reminder'}
                    onPress={onPress}
                    style={styles.viewButton}
                />
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    cardContent: {
        backgroundColor: theme.colors.secondary,
        borderRadius: 25,
        marginVertical: 15,
        position: 'relative'
    },

    viewButtonContent: {
        padding: 5
    },

    viewButton: {
        width: '100%',
        alignSelf: 'center',
    },

    cardTextContent: {
        marginTop: 10,
        paddingHorizontal: 20,
    },

    headingText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20
    },

    datesTextContent: {
    },

    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text,
    },

    workText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: theme.colors.text
    },

    workTitleText: {
        fontSize: 10,
        color: theme.colors.textSecondary
    },

    dateTextTitle: {
        color: theme.colors.text,
        marginVertical: 2,
        fontSize: 10,
    },

    dateText: {
        fontWeight: 'bold',
        fontSize: 14,
    },

    divideLine: {
        height: 2,
        backgroundColor: '#D8D9DD',
        marginVertical: 10,
        marginHorizontal: 70,
    },

    feeAmountContent: {
        margin: 15,
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

export default ClientsOverviewCards;