import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, SectionList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Make sure to install react-native-vector-icons
import { theme } from '../../../../../../theme';

type PaymentHistoryDataItem = {
    id: string;
    type: string;
    amount: string;
    date: string;
    status: 'paid' | 'due';
};

const paymentHistoryData: PaymentHistoryDataItem[] = [
    { id: '1', type: 'Paid Amount', amount: '₹250', date: '15 Dec, 2023', status: 'paid' },
    { id: '2', type: 'Paid Amount', amount: '₹250', date: '15 Jan, 2024', status: 'paid' },
    { id: '3', type: 'Due Amount', amount: '₹250', date: '15 Feb, 2024', status: 'due' },
    { id: '4', type: 'Due Amount', amount: '₹250', date: '15 Mar, 2024', status: 'due' },
];

interface PaymentHistoryItemProps {
    type: string;
    amount: string;
    date: string;
    status: 'paid' | 'due';
}

const PaymentHistoryItem: React.FC<PaymentHistoryItemProps> = ({ type, amount, date, status }) => (
    <View style={styles.itemContainer}>
        {
            status === 'paid'
                ? <Image source={require('../../../../../../assets/icons/tick-circle.png')} />
                : <Image source={require('../../../../../../assets/icons/in-tick-circle.png')} />
        }

        <View style={styles.textContainer}>
            <Text style={styles.typeText}>{type}</Text>
            <Text style={styles.dateText}>{date}</Text>
        </View>
        <Text style={styles.amountText}>{amount}</Text>
    </View>
);

const PaymentHistory: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.nameOfTitle}>Payment History:</Text>
            <FlatList
                data={paymentHistoryData}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <PaymentHistoryItem {...item} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    nameOfTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 15
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    typeText: {
        fontSize: 16,
        color: theme.colors.textSecondary
    },
    dateText: {
        fontSize: 14,
        color: 'grey',
    },
    amountText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.text
    },
});

export default PaymentHistory;
