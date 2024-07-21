import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import BackGround from "../../components/BackGround";
import defaults from "../../styles/defaults";
import { StyleSheet, Text, View } from "react-native";
import ReminderForm, { FormData } from "./Components/ReminderForm";
import UniversalFormModal from "../../components/UniversalFormModal";
import DueReminder from "../DuePayments/Components/DueReminder";

const DailyRemindersScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const [isModalVisible, setModalVisible] = useState(false);
    const handleOpenModal = () => setModalVisible(true);
    const handleCloseModal = () => setModalVisible(false);

    return (
        <BackGround safeArea={true} style={defaults.flex}>
            <View style={styles.container}>
                <ReminderForm onSubmit={handleOpenModal} />

                <UniversalFormModal visible={isModalVisible} onClose={handleCloseModal} titleName={'Send Remainder'}>
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

})

export default DailyRemindersScreen;