import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { theme } from "../../../../theme";
import RoundButton from "../../../../components/buttons/RoundButton";
import StatusIndicator from "./StatusIndicator";
import useTabletStyle from "../../../../styles/TabStyles";

interface ActiveCompletedHistoryProps {
    title: string;
    startDate: string;
    endDate: string;
    statusInd: string;
}

const DeactiveCompletedHistory: React.FC<ActiveCompletedHistoryProps> = ({ title, startDate, endDate, statusInd }) => {
    const { isTablet, orientation, tabletStyle } = useTabletStyle();

    return (
        <>
            <View style={styles.cardContent}>
                <View style={styles.viewButtonContent}>
                    <View style={styles.membershipContent}>
                        <View>
                            <Text style={styles.memberShipText}>{title}</Text>
                            {/* <Text style={styles.memberShipDate}>Validity: {startDate} to {endDate}</Text> */}
                            <Text style={styles.memberShipDate}>validity expired</Text>
                        </View>
                        <View>
                            {/* <StatusIndicator status={statusInd} /> */}
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Image
                                    source={require('../../../../assets/icons/invoice_download.png')}
                                    style={styles.invoiceIocn}
                                />
                                <Text>Invoice</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </>

    )
};

const styles = StyleSheet.create({
    cardContent: {
        // backgroundColor: theme.colors.secondary,
        borderRadius: 25,
        marginVertical: 10,
        position: 'relative',
    },
    membershipContent: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    viewButtonContent: {
        padding: 5
    },
    viewButton: {
        width: '100%',
        alignSelf: 'center',
    },
    memberShipText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.colors.text
    },
    memberShipDate: {
        fontSize: 12,
        color: theme.colors.textSecondary
    },
    invoiceIocn:{
        width: 18,
        height: 15,
    }
});

export default DeactiveCompletedHistory;