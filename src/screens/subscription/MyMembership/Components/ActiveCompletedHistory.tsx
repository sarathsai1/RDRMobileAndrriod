import React from "react";
import { StyleSheet, Text, View } from "react-native";
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

const ActiveCompletedHistory: React.FC<ActiveCompletedHistoryProps> = ({ title, startDate, endDate, statusInd }) => {
    const { isTablet, orientation, tabletStyle } = useTabletStyle();

    return (
        <>
            <View style={styles.cardContent}>
                <View style={styles.viewButtonContent}>
                    <View style={styles.membershipContent}>
                        <View>
                            <Text style={styles.memberShipText}>{title}</Text>
                            <Text style={styles.memberShipDate}>Validity: {startDate} to {endDate}</Text>
                        </View>
                        <View>
                            <StatusIndicator status={statusInd} />
                        </View>
                    </View>
                    <RoundButton
                        title={'Download Invoice'}
                        onPress={() => { }}
                        style={styles.viewButton}
                    />
                </View>
            </View>
        </>

    )
};

const styles = StyleSheet.create({
    cardContent: {
        backgroundColor: theme.colors.secondary,
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


});

export default ActiveCompletedHistory;