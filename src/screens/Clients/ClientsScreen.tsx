import React, { useState, useEffect } from "react";
import BackGround from "../../components/BackGround";
import { FlatList, StyleSheet, Text, View, Alert } from "react-native";
import defaults from "../../styles/defaults";
import ClientsSelectOption from "./Components/ClientsSelectOptions";
import RoundButton from "../../components/buttons/RoundButton";
import { useNavigation } from "@react-navigation/native";
import UniversalFormModal from "../../components/UniversalFormModal";
import AddClientForm, { FormData } from "./Components/AddClientForm";
import useTabletStyle from "../../styles/TabStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Client {
    id: string;
    name: string;
}

const ClientsScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const [isModalVisible, setModalVisible] = useState(false);
    const [clients, setClients] = useState<Client[]>([]);
    const { isTablet, orientation, tabletStyle } = useTabletStyle();
    const [professionalId, setProfessionalId] = useState<number | null>(null);

    const handleOpenModal = () => setModalVisible(true);
    const handleCloseModal = () => setModalVisible(false);

    useEffect(() => {
        const getID = async () => {
            try {
                const storedId = await AsyncStorage.getItem('Id');
                if (storedId !== null) {
                    console.log("AsyncStorage value", storedId);
                    setProfessionalId(JSON.parse(storedId));
                }
            } catch (error) {
                console.error('Error retrieving item from AsyncStorage:', error);
            }
        };

        getID();
    }, []);

    useEffect(() => {
        const fetchClients = async () => {
            if (professionalId === null) {
                console.log(professionalId)
                return;
            }
            try {
                const token = await AsyncStorage.getItem('authToken');
                if (!token) {
                    throw new Error("Token is missing");
                }
                const response = await fetch(`http://54.152.49.191:8080/client/getClients/${professionalId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setClients(data);
                console.log('Clients fetched successfully:', data);
            } catch (error) {
                console.error('Error fetching clients:', error);
                Alert.alert('Error', 'There was an error fetching the client data.');
            }
        };

        fetchClients();
    }, [professionalId]);

    const handleClientsNamesPress = (name: string) => {
        console.log(name + ' pressed');
        navigation.navigate("Projects");
    };

    const handleFormSubmit = (formData: FormData) => {
        console.log('Form Data:', formData);
        // Process formData here
    };

    return (
        <BackGround safeArea={true} style={defaults.flex}>
            <View style={styles.container}>
                <View style={styles.topContentBtns}>
                    <View></View>
                    <View>
                        <RoundButton
                            title={'+ Add Clients'}
                            onPress={handleOpenModal}
                            style={styles.addClientWidthButton}
                        />
                    </View>
                </View>

                <FlatList
                    data={clients}
                    renderItem={({ item }) => (
                        <View style={{ width: isTablet && orientation === 'horizontal' ? '50%' : '100%', padding: 5 }}>
                            <ClientsSelectOption title={item.name} onPress={() => handleClientsNamesPress(item.name)} />
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                    numColumns={isTablet && orientation === 'horizontal' ? 2 : 1}
                    key={isTablet && orientation === 'horizontal' ? 'two-columns' : 'one-column'}
                    columnWrapperStyle={
                        isTablet && orientation === 'horizontal' ? { justifyContent: 'space-between' } : undefined
                    }
                />

                <UniversalFormModal visible={isModalVisible} onClose={handleCloseModal} titleName={'Add Client'}>
                    <AddClientForm onSubmit={handleFormSubmit} />
                </UniversalFormModal>
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
});

export default ClientsScreen;
