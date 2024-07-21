import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../../../../theme";
import RemarksComments from "./Components/RemarksComments";
import AddRemarks from "./Components/AddRemarks";
import UniversalFormModal from "../../../../../components/UniversalFormModal";

const Remarks: React.FC = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const handleOpenModal = () => setModalVisible(true);
    const handleCloseModal = () => setModalVisible(false);

    return (
        <View style={styles.cardContent}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.nameText}>Remarks</Text>

                <TouchableOpacity onPress={handleOpenModal}>
                    <View style={styles.viewRemarksButton}>
                        <Image source={require('../../../../../assets/icons/inbox.png')} style={styles.inboxIcons} />
                        <Text style={styles.viewText}>
                            My Inbox
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            <RemarksComments />

            <View style={styles.viewRemarksContent}>
                <View style={styles.viewRemarksButton}>
                    <Image source={require('../../../../../assets/icons/view.png')} style={styles.viewIcons} />
                    <Text style={styles.viewText}>
                        View all remarks
                    </Text>
                </View>
            </View>

            <AddRemarks data={['Public', 'POC', 'Assistan']} label={"who can see your remarks?"} />

            <UniversalFormModal visible={isModalVisible} onClose={handleCloseModal} titleName={'My Remarks'}>
                <View>
                    <View style={styles.mainRemarksCommentsContent}>
                        <View style={styles.textContainer}>
                            <Text style={styles.typeText}>Prasad Kandala</Text>
                            <Text style={styles.dateText}>15 Feb, 2024</Text>
                        </View>

                        <View>
                            <Text style={styles.commentsText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</Text>
                        </View>
                    </View>

                    <View style={styles.mainRemarksCommentsContent}>
                        <View style={styles.textContainer}>
                            <Text style={styles.typeText}>Prasad Kandala</Text>
                            <Text style={styles.dateText}>15 Feb, 2024</Text>
                        </View>

                        <View>
                            <Text style={styles.commentsText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</Text>
                        </View>
                    </View>
                </View>
            </UniversalFormModal>
        </View>
    )
};

const styles = StyleSheet.create({
    cardContent: {
        backgroundColor: theme.colors.secondary,
        borderRadius: 25,
        marginVertical: 10,
        position: 'relative',
        padding: 20,
    },

    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text,
    },

    viewRemarksContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80,
        marginBottom: 20
    },
    viewRemarksButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 25,
    },
    inboxIcons: {
        width: 18,
        height: 18,
        marginRight: 10,
    },
    viewIcons: {
        marginRight: 10,
    },
    viewText: {
        color: 'white',
    },



    // remarks comment
    mainRemarksCommentsContent: {
        marginVertical: 5
    },
    textContainer: {
        marginLeft: 10,
    },
    typeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.text
    },
    dateText: {
        fontSize: 12,
        fontWeight: '600',
        color: theme.colors.textSecondary
    },
    commentsText: {
        marginTop: 5,
        marginHorizontal: 20,
        fontSize: 12,
        color: theme.colors.textSecondary,
    },
});

export default Remarks;