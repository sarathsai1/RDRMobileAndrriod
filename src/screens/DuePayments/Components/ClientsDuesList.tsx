import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../../theme";

type ClientsDuesListProps = {
    nameTitle: string;
    dueAmount: string;
    onPress: () => void;
};


const ClientsDuesList: React.FC<ClientsDuesListProps> = ({ nameTitle, dueAmount, onPress }) => {
    return (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <View>
                <Text style={styles.nameText}>{nameTitle}</Text>
                <Text style={styles.amountText}>Total Due Amount: <Text style={styles.dueAmountText}>{dueAmount}</Text></Text>
            </View>

            <Image
                source={require('../../../assets/icons/arrow_block.png')}
                style={styles.arrowIcon}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.colors.secondary, // The color for the menu item background
        padding: 10,
        paddingVertical: 15,
        borderRadius: 25,
        paddingHorizontal: 20, // The horizontal padding for the menu item
        width: '100%', // The width of the menu item, can be adjusted based on the container
        marginTop: 10,
        marginVertical: 5, // The vertical margin between menu items
    },
    nameText: {
        color: theme.colors.text, // The color of the menu item text
        fontSize: 22, // The font size of the menu item text
        fontWeight: 'bold',
        marginBottom: 10,
    },
    amountText: {
        color: theme.colors.textSecondary
    },
    dueAmountText:{
        color: theme.colors.text,
        fontSize: 20,
        fontWeight: 'bold',
    },

    arrowIcon: {
        width: 10,
        height: 15,
    },
});

export default ClientsDuesList;