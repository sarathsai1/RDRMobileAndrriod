import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import { theme } from "../../../../theme";
import RoundButton from "../../../../components/buttons/RoundButton";
import { useNavigation } from "@react-navigation/native";
import StatusIndicator from "./StatusIndicator";
import ModificationNotify from "./ModificationNotify";

interface ProjectsCardsProps {
    message: string;
    clientName: string;
    workNature: string;
    statusMesg: any;
    startDate: string;
    etcDate: string;
}

const ProjectsCards: React.FC<ProjectsCardsProps> = ({ message, clientName, workNature, statusMesg, startDate, etcDate }) => {
    const navigation = useNavigation<any>();

    function handleView(): void {
        navigation.navigate('Overview')
    }

    return (
        <View style={styles.cardContent}>
            <ModificationNotify message={message} />
            <View style={styles.cardTextContent}>
                <View style={styles.headingText}>
                    <View>
                        <Text style={styles.nameText}>{clientName}</Text>
                        <Text style={styles.workText}>{workNature}<Text style={styles.workTitleText}> Work Nature</Text></Text>
                    </View>
                    <View style={styles.statusContent}>
                        <Text style={styles.statusNameText}>Status</Text>
                        <StatusIndicator status={statusMesg} />
                    </View>
                </View>

                <View style={styles.datesTextContent}>
                    <Text style={styles.dateTextTitle}>Start Date: <Text style={styles.dateText}>{startDate}</Text></Text>
                    <Text style={styles.dateTextTitle}>ETC: <Text style={styles.dateText}>{etcDate}</Text></Text>
                </View>
            </View>

            <View style={styles.viewButtonContent}>
                <RoundButton
                    title={'View'}
                    onPress={handleView}
                    style={styles.viewButton}
                />
            </View>
        </View>
    );
}

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
    },
    datesTextContent: {
        marginVertical: 25,
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statusContent: {
        flexDirection: 'row',
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    statusNameText: {
        fontSize: 24,
        // marginRight: -18,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    workText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: theme.colors.text
    },
    workTitleText: {
        fontSize: 10,
        color: theme.colors.textSecondary
    },
    statusText: {
        color: 'red',
        fontSize: 12,
    },
    statusImageContent: {
        alignItems: 'center',
    },
    dateTextTitle: {
        color: theme.colors.text
    },
    dateText: {
        fontWeight: 'bold',
        fontSize: 16,
    }
})

export default ProjectsCards;