import React from "react";
import BackGround from "../../../components/BackGround";
import defaults from "../../../styles/defaults";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RoundButton from "../../../components/buttons/RoundButton";
import { theme } from "../../../theme";
import StatusIndicator from "../ProjectsList/Components/StatusIndicator";
import Allocation from "./Components/Allocation/Allocation";
import SendNotification from "./Components/SendNotification";
import Fees from "./Components/Fees/Fees";
import Remarks from "./Components/Remarks/Remarks";

const OverviewProjectScreen: React.FC = () => {

    const openModal = () => {
        console.log("openModal")
    }

    return (
        <BackGround safeArea={true} style={defaults.flex}>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.topContentBtns}>
                        <View></View>
                        <View >
                            <RoundButton
                                title={'Edit Clients'}
                                onPress={openModal}
                                style={styles.addClientWidthButton}
                            />
                        </View>
                    </View>

                    <View style={styles.overviewContent}>
                        <View style={styles.cardContent}>
                            <View style={styles.cardTextContent}>
                                <View style={styles.headingText}>
                                    <View>
                                        <Text style={styles.nameText}>Charan</Text>
                                        <Text style={styles.workText}>Income Tax <Text style={styles.workTitleText}>Work Nature</Text></Text>
                                    </View>
                                    <View style={styles.statusContent}>
                                        <Text style={styles.statusNameText}>Status</Text>
                                        <StatusIndicator status={'not_started'} />
                                    </View>
                                </View>

                                <View style={styles.datesTextContent}>
                                    <Text style={styles.dateTextTitle}>Start Date: <Text style={styles.dateText}>05-12-2023</Text></Text>
                                    <Text style={styles.dateTextTitle}>ETC: <Text style={styles.dateText}>09-12-2023</Text></Text>
                                </View>
                            </View>
                        </View>

                        <Allocation />

                        <SendNotification />

                        <Fees />

                        <Remarks />

                    </View>


                </ScrollView>
            </View>
        </BackGround>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    topContentBtns: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    addClientWidthButton: {
        width: '100%',
        alignSelf: 'center',
        paddingHorizontal: 25,
    },

    overviewContent: {

    },

    cardContent: {
        backgroundColor: theme.colors.secondary,
        borderRadius: 25,
        marginVertical: 10,
        position: 'relative',
        padding: 20,
    },
    cardTextContent: {

    },
    headingText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    datesTextContent: {
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
        marginRight: -18,
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
    },
});

export default OverviewProjectScreen;