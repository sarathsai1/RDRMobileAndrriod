// RoundButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface RoundButtonProps {
    title: string;
    onPress: () => void;
    style?: object;
    
}

const RoundButton: React.FC<RoundButtonProps> = ({ title, onPress, style }) => {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.primary,
        padding: 10,
        paddingVertical: 15,
        borderRadius: 45,
        // Add width here if you want a default width
        // width: '100%', // Uncomment if you want the button to be full-width by default
    },
    text: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '700',
        color: theme.colors.buttonText,
    },
});

export default RoundButton;
