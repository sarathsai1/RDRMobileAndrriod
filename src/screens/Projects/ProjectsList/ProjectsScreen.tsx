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
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProjectsScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const [isModalVisible, setModalVisible] = useState(false);
    const handleOpenModal = () => setModalVisible(true);
    const handleCloseModal = () => setModalVisible(false);

    const [error, setError] = useState<string | null>(null);
    const [sortmodalVisible, setSortModalVisible] = useState(false);
    const [selectedSortOption, setSelectedSortOption] = useState('');
    const [projectsData, setProjectsData] = useState<any[]>([]);
    const { isTablet, orientation } = useTabletStyle();

    const sortOptions = [
        { name: 'Due Date', value: 'dueDate' },
        { name: 'Status Changes', value: 'statusChanges' },
        { name: 'Not Yet Started (Red)', value: 'notStarted' },
        { name: 'In Progress (Orange)', value: 'inProgress' },
        { name: 'Completed (Green)', value: 'completed' },
    ];

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

    const handleOptionSelect = (value: string) => {
        setSelectedSortOption(value);
        setSortModalVisible(false); // close modal after selection
    };

    function handleApprovalRequestsView(): void {
        navigation.navigate('ApprovalProjects');
    }

    const handleFormSubmit = (formData: FormData) => {
        console.log('Form Data:', formData);
        // Process formData here
    };

    return (
        <BackGround safeArea={true} style={defaults.flex}>
            <View style={styles.container}>
                <View style={styles.topContentBtns}>
                    <View>
                        <TouchableOpacity onPress={() => setSortModalVisible(true)} style={styles.sortByButton}>
                            <Text style={styles.buttonText}>Sort By</Text>
                            <Image
                                source={require('../../../assets/icons/down_arrow_block.png')} // Replace with your actual down arrow icon
                                style={{ width: 18, height: 10 }} // Add style as needed
                            />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <RoundButton
                            title={'+ Add Projects'}
                            onPress={handleOpenModal}
                            style={styles.addClientWidthButton}
                        />
                    </View>
                </View>

                <View style={{ paddingBottom: 10 }}>
                    <RoundButton
                        title={'Project Approval Requests'}
                        onPress={handleApprovalRequestsView}
                        style={styles.addClientWidthButton}
                    />
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={isTablet && orientation === 'horizontal' ? { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-start', } : {}}>
                        {projectsData.map((project) => (
                            <View key={project.id} style={isTablet && orientation === 'horizontal' ? { width: '48%', margin: '0.5%' } : {}}>
                                <ProjectsCards
                                    message={project.message || 'Prasad(POC) has recently modified!'} // Ensure message is a string
                                    clientName={project.name || ''} // Ensure clientName is a string
                                    workNature={project.natureOfWork || ''} // Ensure workNature is a string
                                    statusMesg={project.projectStatus || ''} // Ensure statusMesg is a string
                                    startDate={project.estimatedStartDate || ''} // Ensure startDate is a string
                                    etcDate={project.estimatedEndDate || ''} // Ensure etcDate is a string
                                />
                            </View>
                        ))}
                    </View>
                </ScrollView>

                <UniversalFormModal visible={isModalVisible} onClose={handleCloseModal} titleName={'Add Project'}>
                    <AddProjectsForm onSubmit={handleFormSubmit} />
                </UniversalFormModal>

                <SortByModal
                    visible={sortmodalVisible}
                    onClose={() => setSortModalVisible(false)}
                    options={sortOptions}
                    onOptionSelect={handleOptionSelect}
                />
            </View>
        </BackGround>
    );
};

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

export default ProjectsScreen;
