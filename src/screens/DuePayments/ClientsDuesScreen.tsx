import React from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import BackGround from "../../components/BackGround";
import defaults from "../../styles/defaults";
import ClientsDuesList from "./Components/ClientsDuesList";
import { useNavigation } from "@react-navigation/native";
import useTabletStyle from "../../styles/TabStyles";

const ClientsDueScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const { isTablet, orientation, tabletStyle } = useTabletStyle();

    const clientsNames = [
        { id: '1', nameTitle: "Charan", dueAmount: "3000" },
        { id: '2', nameTitle: "Prasad", dueAmount: "6000" },
        { id: '3', nameTitle: "Client Name 3", dueAmount: "400" },
        { id: '4', nameTitle: "Client Name 4", dueAmount: "1500" },
        { id: '5', nameTitle: "Client Name 5", dueAmount: "4500" },
    ];

    const handleClientsNamesPress = (name: string) => {
        console.log(name + ' pressed');
        navigation.navigate("DueOverview");
    };

    return (
        <BackGround safeArea={true} style={defaults.flex}>
            <View style={styles.container}>
                {/* <FlatList
                    data={clientsNames}
                    renderItem={({ item }) => (
                        <ClientsDuesList nameTitle={item.nameTitle} dueAmount={item.dueAmount} onPress={() => handleClientsNamesPress(item.nameTitle)} />
                    )}
                    keyExtractor={(item) => item.id}
                /> */}

                <ScrollView showsVerticalScrollIndicator={false}>
                    <FlatList
                        data={clientsNames}
                        renderItem={({ item }) => (
                            <View style={{ width: isTablet && orientation === 'horizontal' ? '50%' : '100%', padding: 5 }}>
                                <ClientsDuesList nameTitle={item.nameTitle} dueAmount={item.dueAmount} onPress={() => handleClientsNamesPress(item.nameTitle)} />
                            </View>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={isTablet && orientation === 'horizontal' ? 2 : 1}
                        // Add a key prop to the FlatList that changes with the numColumns
                        key={isTablet && orientation === 'horizontal' ? 'two-columns' : 'one-column'}
                        columnWrapperStyle={
                            isTablet && orientation === 'horizontal' ? { justifyContent: 'space-between' } : undefined
                        }
                    />
                </ScrollView>

            </View>
        </BackGround>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ClientsDueScreen;