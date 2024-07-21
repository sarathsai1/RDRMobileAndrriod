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
import { useNavigation } from "@react-navigation/native";

const ProjectsScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const [isModalVisible, setModalVisible] = useState(false);
    const handleOpenModal = () => setModalVisible(true);
    const handleCloseModal = () => setModalVisible(false);


    const [sortmodalVisible, setSortModalVisible] = useState(false);
    const [selectedSortOption, setSelectedSortOption] = useState('');

    const { isTablet, orientation, tabletStyle } = useTabletStyle();

    const sortOptions = [
        { name: 'Due Date', value: 'dueDate' },
        { name: 'Status Changes', value: 'statusChanges' },
        { name: 'Not Yet Started (Red)', value: 'notStarted' },
        { name: 'In Progress (Orange)', value: 'inProgress' },
        { name: 'Completed (Green)', value: 'completed' },
    ];

    const handleOptionSelect = (value: string) => {
        console.log(value)
        setSelectedSortOption(value);
        setSortModalVisible(false); // close modal after selection
    };

    const projectsData = [
        {
            message: '',
            clientName: 'Charan',
            workNature: 'Income tax',
            statusMesg: 'not_started',
            startDate: '08-02-2024',
            etcDate: '12-02-22024'
        },
        {
            message: 'Prasad(POC) has recently modified!',
            clientName: 'Ram Charan',
            workNature: 'Income tax',
            statusMesg: 'in_progress',
            startDate: '05-02-2024',
            etcDate: '10-02-22024'
        },
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
            clientName: 'Prsad',
            workNature: 'Income tax',
            statusMesg: 'completed',
            startDate: '10-02-2024',
            etcDate: '15-02-22024'
        },
    ];

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
    ];
    function handleApprovalRequestsView(): void {
        navigation.navigate('ApprovalProjects')
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
                                source={require('../../../assets/icons/down_arrow_block.png')} // Replace with your actual back icon
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

                <View style={{paddingBottom:10}}>
                    <RoundButton
                        title={'Project Approval Requests'}
                        onPress={handleApprovalRequestsView}
                        style={styles.addClientWidthButton}
                    />
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={isTablet && orientation === 'horizontal' ? { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-start', } : {}}>
                        {projectsData.map((project, index) => (
                            <View key={index} style={isTablet && orientation === 'horizontal' ? { width: '48%', margin: '0.5%' } : {}}>
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