import React, { useState } from "react";
import BackGround from "../../components/BackGround";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import defaults from "../../styles/defaults";
import ClientsOverviewCards from "./Components/ClientsOverviewCards";
import { useNavigation } from "@react-navigation/native";
import UniversalFormModal from "../../components/UniversalFormModal";
import DueReminder from "./Components/DueReminder";
import useTabletStyle from "../../styles/TabStyles";
import NavigationBar from "./Components/NavigationBar";
import RoundButton from "../../components/buttons/RoundButton";
import RoundInput from "../../components/inputs/RoundInput";

const DuesOverviewScreen: React.FC = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const handleOpenModal = () => setModalVisible(true);
    const handleCloseModal = () => setModalVisible(false);
    const { isTablet, orientation, tabletStyle } = useTabletStyle();
    const [activeTab, setActiveTab] = useState('InProgress');

    const inProgressClientsDuesData = [
        {
            clientName: 'Charan',
            workNature: 'Income tax',
            startDate: '08-02-2024',
            etcDate: '12-02-22024',
            totalAmount: '1000',
            dueAmount: '500',
        },
        {
            clientName: 'Charan',
            workNature: 'Income tax',
            startDate: '05-02-2024',
            etcDate: '10-02-22024',
            totalAmount: '8000',
            dueAmount: '2500',
        },
    ];

    const completedClientsDuesData = [
        {
            clientName: 'Charan',
            workNature: 'Income tax',
            startDate: '08-02-2024',
            etcDate: '12-02-22024',
            totalAmount: '1000',
            dueAmount: '500',
        },
    ];
    const handleTabPress = (tabName: string) => {
        setActiveTab(tabName); // Update the active tab state
    };

    return (
        <BackGround safeArea={true} style={defaults.flex}>
            <View style={styles.container}>

                <NavigationBar onTabPress={handleTabPress} />

                <View style={styles.topContentBtns}>
                    <View>

                    </View>
                    <View>
                        <RoundButton
                            title={'Sent All Payment Alerts'}
                            onPress={handleOpenModal}
                            style={styles.addClientWidthButton}
                        />
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={isTablet && orientation === 'horizontal' ? { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-start', } : {}}>
                        {activeTab === 'InProgress' && inProgressClientsDuesData.map((client, index) => (
                            <View key={index} style={isTablet && orientation === 'horizontal' ? { width: '48%', margin: '0.5%' } : {}}>
                                <ClientsOverviewCards
                                    key={index}
                                    clientName={client.clientName}
                                    workNature={client.workNature}
                                    startDate={client.startDate}
                                    etcDate={client.etcDate}
                                    totalAmount={client.totalAmount}
                                    dueAmount={client.dueAmount}
                                    onPress={handleOpenModal}
                                />
                            </View>
                        ))}

                        {activeTab === 'Completed' && completedClientsDuesData.map((client, index) => (
                            <View key={index} style={isTablet && orientation === 'horizontal' ? { width: '48%', margin: '0.5%' } : {}}>
                                <ClientsOverviewCards
                                    key={index}
                                    clientName={client.clientName}
                                    workNature={client.workNature}
                                    startDate={client.startDate}
                                    etcDate={client.etcDate}
                                    totalAmount={client.totalAmount}
                                    dueAmount={client.dueAmount}
                                    onPress={handleOpenModal}
                                />
                            </View>
                        ))}
                    </View>
                </ScrollView>
                <UniversalFormModal visible={isModalVisible} onClose={handleCloseModal} titleName={'Send Remainder'}>
                    <RoundInput
                        placeholder="Reminder Date"
                        style={styles.viewButton}
                    />
                    <DueReminder />
                </UniversalFormModal>
            </View>
        </BackGround>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    topContentBtns: {
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    addClientWidthButton: {
        width: '100%',
        alignSelf: 'center',
        paddingHorizontal: 25,
    },
    viewButton: {
        width: '100%',
        alignSelf: 'center',
    },
});

export default DuesOverviewScreen;