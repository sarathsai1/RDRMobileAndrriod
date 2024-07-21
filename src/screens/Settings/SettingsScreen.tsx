import React from "react";
import BackGround from "../../components/BackGround";
import defaults from "../../styles/defaults";
import { FlatList, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SettingsSelectOptions from "./Components/SettingsSelectOptions";
import useTabletStyle from "../../styles/TabStyles";

const SettingsScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const { isTablet, orientation, tabletStyle } = useTabletStyle();
    
    const SettingsNames = [
        {
            id: '1',
            title: "Daily Reminder",
            navigation: 'DailyReminders'
        },
    ];


    return (
        <BackGround safeArea={true} style={defaults.flex}>
            <View style={styles.container}>
                {/* <FlatList
                    data={SettingsNames}
                    renderItem={({ item }) => (
                        <SettingsSelectOptions title={item.title} onPress={() => { navigation.navigate("Projects") }} />
                    )}
                    keyExtractor={(item) => item.id}
                /> */}

                <FlatList
                    data={SettingsNames}
                    renderItem={({ item }) => (
                        <View style={{ width: isTablet && orientation === 'horizontal' ? '50%' : '100%', padding: 5 }}>
                            <SettingsSelectOptions title={item.title} onPress={() => { navigation.navigate(item.navigation) }} />
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
            </View>
        </BackGround>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

})

export default SettingsScreen;