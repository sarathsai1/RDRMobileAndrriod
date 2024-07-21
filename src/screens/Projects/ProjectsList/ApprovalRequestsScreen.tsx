import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackGround from "../../../components/BackGround";
import defaults from "../../../styles/defaults";
import RoundButton from "../../../components/buttons/RoundButton";
import { theme } from "../../../theme";
import ProjectsCards from "./Components/ProjectsCards";
import UniversalFormModal from "../../../components/UniversalFormModal";
import AddProjectsForm, { FormData } from "./Components/AddProjectsForm";
import SortByModal from "./Components/SortByModal";
import useTabletStyle from "../../../styles/TabStyles";

const ApprovalProjectsScreen: React.FC = () => {

    const compProjectsData = [
        {
            message: '',
            clientName: 'Prsad',
            workNature: 'Income tax',
            statusMesg: 'completed',
            startDate: '10-02-2024',
            etcDate: '15-02-22024'
        },
        {
            message: '',
            clientName: 'Guru Prsad',
            workNature: 'GST',
            statusMesg: 'completed',
            startDate: '10-02-2024',
            etcDate: '15-02-22024'
        },
        {
            message: '',
            clientName: 'Charan',
            workNature: 'GST',
            statusMesg: 'completed',
            startDate: '10-02-2024',
            etcDate: '15-02-22024'
        },
        {
            message: '',
            clientName: 'Ram',
            workNature: 'GST',
            statusMesg: 'completed',
            startDate: '10-02-2024',
            etcDate: '15-02-22024'
        },
    ];

    return (
        <BackGround safeArea={true} style={defaults.flex}>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ height: '80%', width: '100%' }}>
                    {compProjectsData.map((project, index) => (
                        <View key={index} style={{}}>
                            <View style={{ zIndex: 1 }}>
                                <ProjectsCards
                                    key={index}
                                    message={project.message}
                                    clientName={project.clientName}
                                    workNature={project.workNature}
                                    statusMesg={project.statusMesg}
                                    startDate={project.startDate}
                                    etcDate={project.etcDate}
                                />
                            </View>

                            <View style={[styles.approvedRejectedMainContent, { backgroundColor: theme.colors.secondary, borderRadius: 25 }]}>
                                <View style={{ width: '50%' }}>
                                    <View style={[styles.approvedRejectedButton, { backgroundColor: '#049659', borderColor: '#049659', borderWidth: 1, }]}>
                                        <Text style={styles.approvedRejectedText}>
                                            Approve
                                        </Text>
                                    </View>
                                </View>

                                <View style={{ width: '50%' }}>
                                    <View style={[styles.approvedRejectedButton, { borderColor: '#FD2E00', borderWidth: 1, }]}>
                                        <Text style={[styles.approvedRejectedText, { color: '#FD2E00' }]}>
                                            Reject
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </BackGround>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 15,
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
    sortByButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: theme.colors.primary,
        padding: 15,
        paddingVertical: 12,
        borderRadius: 25,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '700',
        color: theme.colors.text,
        marginRight: 10,
    },

    approvedRejectedMainContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        marginTop: -55,
        paddingTop: 45,
        paddingBottom: 5,
    },

    approvedRejectedButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 25,
        marginHorizontal: 5
    },
    approvedRejectedText: {
        color: 'white',
    },
});

export default ApprovalProjectsScreen;