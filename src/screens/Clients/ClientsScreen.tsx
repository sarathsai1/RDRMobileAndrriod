import React, { useState, useEffect } from "react";
import BackGround from "../../components/BackGround";
import { FlatList, ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import defaults from "../../styles/defaults";
import ClientsSelectOption from "./Components/ClientsSelectOptions";
import RoundButton from "../../components/buttons/RoundButton";
import { useNavigation } from "@react-navigation/native";
import UniversalFormModal from "../../components/UniversalFormModal";
import AddClientForm, { FormData } from "./Components/AddClientForm";
import useTabletStyle from "../../styles/TabStyles";
import { authAccessTonken } from "../../services/Token";

interface Client {
    id: string;
    name: string;
}

const ClientsScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const [isModalVisible, setModalVisible] = useState(false);
    const [clients, setClients] = useState<Client[]>([]);
    const { isTablet, orientation, tabletStyle } = useTabletStyle();

    const handleOpenModal = () => setModalVisible(true);
    const handleCloseModal = () => setModalVisible(false);

    useEffect(() => {
       
        // http://192.168.0.106:8080/client/getAllClientNames
        const professionalId = 1;
        fetch(`http://54.152.49.191:8080/client/getClients/${professionalId}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authAccessTonken}`
                
            },
        })
        
            .then(response => {
                console.log('response data from the get method : ',response)
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setClients(data);
                
            })
            
            .catch(error => {
                console.error('Error fetching clients:', error);
                Alert.alert('Error', 'There was an error fetching the client data.');
            });
    }, []);
    // console.log("bghghj",fetch('http://54.152.49.191:8080/client/getClients/1',{
    //     method: 'GET',
    //     headers: {
    //         'Authorization': `Bearer ${authAccessTonken}`
            
    //     },
    // }))
    const handleClientsNamesPress = (name: string) => {
        console.log(name + ' pressed');
        navigation.navigate("Projects");
    };

    const handleAddClients = () => {
        // Handle adding clients here
    }

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

                <ScrollView showsVerticalScrollIndicator={false}>
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
                </ScrollView>

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
