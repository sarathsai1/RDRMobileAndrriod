import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { theme } from '../../../theme';
// import { Ionicons } from '@expo/vector-icons';

type ClientsSelectOptionProps = {
    title: string;
    onPress: () => void;
};

const ClientsSelectOption: React.FC<ClientsSelectOptionProps> = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <Text style={styles.menuText}>{title}</Text>
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
        borderRadius: 50,
        paddingHorizontal: 20, // The horizontal padding for the menu item
        width: '100%', // The width of the menu item, can be adjusted based on the container
        marginTop: 10,
        marginVertical: 5, // The vertical margin between menu items
    },
    menuText: {
        color: theme.colors.text, // The color of the menu item text
        fontSize: 22, // The font size of the menu item text
        fontWeight: 'bold',
    },

    arrowIcon: {
        width: 10,
        height: 15,
    },
});

export default ClientsSelectOption;
