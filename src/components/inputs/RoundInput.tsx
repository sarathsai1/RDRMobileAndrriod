// RoundInput.tsx

import React from 'react';
import { View, TextInput, Text, StyleSheet, Image, ViewStyle } from 'react-native';
import { theme } from '../../theme'; // Update the path to your theme file

interface RoundInputProps {
    label: string;
    placeholder: string;
    editable: boolean;
    error: string;
    value: string;
    onChangeText: (text: string) => void;
    errorMessage?: string;
    maxLength?: number; 
    style?: ViewStyle;
    options: string[];
    onBlur?: () => void; // Add this line
  
    keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad'; // Define the allowed types
}

const RoundInput: React.FC<RoundInputProps> = ({
    label,
    placeholder,
    value,
    onChangeText,
    errorMessage,
    maxLength , keyboardType,style,editable,onBlur
}) => {
    return (
        <View style={styles.container}>
              {label && <Text style={styles.label}>{label}</Text>}
            <View style={[styles.inputContainer, errorMessage ? styles.inputContainerError : null]}>
                <TextInput
               
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    maxLength={maxLength} // Pass maxLength to TextInput
                    style={[styles.input, style]}
                    onBlur={onBlur}
                    keyboardType={keyboardType} // Assign keyboardType to TextInput
                />
                {errorMessage && (
                    <Image
                        source={require('../../assets/icons/error.png')} // Update with your error icon path
                        style={styles.errorIcon}
                    />
                )}
            </View>
            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
    },
    label: {
        marginBottom: 5,
        color: "black", // Use your theme for consistent colors
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: 'black', // Use your theme for consistent colors
        borderRadius: 20,
        paddingHorizontal: 5,
        color: 'black', // Use your theme for consistent colors
        width: '100%',
    },
    inputContainerError: {
        borderColor: 'red', // Use your theme for error color
    },
    input: {
        flex: 1,
        width: '100%',
        paddingVertical: 10,
        color:'black', // Use your theme for consistent colors
    },
    errorIcon: {
        width: 20,
        height: 20,
        tintColor: 'red', // Use your theme for error color
    },
    errorText: {
        color: 'red',
        marginTop: 2,
        fontSize: 14,
    },
});

export default RoundInput;
