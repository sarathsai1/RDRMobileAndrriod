import React, { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";


const ApprovalProjectsScreen: React.FC = () => {
    const [projectsData, setProjectsData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                if (!token) {
                    throw new Error("Token is missing");
                }
                const response = await fetch(`http://54.152.49.191:8080/project/getAllProjects/71`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const data = await response.json();

                // Log and validate data structure
                console.log("Fetched data:", data);
                setProjectsData(data);
            } catch (err) {
                console.error("Error fetching projects:", err);
                setError('Failed to fetch projects');
            }
        };

        fetchProjects();
    }, []);

    return (
        <BackGround safeArea={true} style={defaults.flex}>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ height: '80%', width: '100%' }}>
                    {projectsData.map((project, index) => (
                        <View key={index} style={{}}>
                            <View style={{ zIndex: 1 }}>
                            <ProjectsCards
                                    message={project.message || 'Prasad(POC) has recently modified!'} // Ensure message is a string
                                    clientName={project.name || ''} // Ensure clientName is a string
                                    workNature={project.natureOfWork || ''} // Ensure workNature is a string
                                    statusMesg={project.projectStatus || ''} // Ensure statusMesg is a string
                                    startDate={project.estimatedStartDate || ''} // Ensure startDate is a string
                                    etcDate={project.estimatedEndDate || ''} // Ensure etcDate is a string
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