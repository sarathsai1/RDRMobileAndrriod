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
    options: any[];
    onBlur?: () => void; 
    cursor?: 'auto' | 'default';
    keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
    inputStyle?: { backgroundColor: string; color: string };
}

const RoundInput: React.FC<RoundInputProps> = ({
    label,
    placeholder,
    value,
    onChangeText,
    errorMessage,
    maxLength,
    keyboardType,
    style,
    editable,
    onBlur,
    cursor,
    error
    
}) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[styles.inputContainer, error ? styles.inputContainerError : null]}>
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor={"black"} // Placeholder color from theme
                    value={value}
                    onChangeText={onChangeText}
                    maxLength={maxLength}
                    style={[styles.input, style]}
                    onBlur={onBlur}
                    keyboardType={keyboardType}
                    editable={editable}
                />
                {error && (
                    <Image
                        source={require('../../assets/icons/error.png')} // Update with your error icon path
                        style={styles.errorIcon}
                    />
                )}
            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        color: 'black',
    },
    label: {
        marginBottom: 5,
        color: theme.colors.text, // Use theme color for label text
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: "black", // Use theme color for border
        borderRadius: 20,
        paddingHorizontal: 10,
        backgroundColor: theme.colors.background, // Use theme color for background
        width: '100%',
    },
    inputContainerError: {
        borderColor: "red", // Use theme color for error border
    },
    input: {
        flex: 1,
        width: '100%',
        paddingVertical: 10,
        color: theme.colors.text, // Use theme color for text
    },
    errorIcon: {
        width: 20,
        height: 20,
        tintColor: "red", // Use theme color for error icon
    },
    errorText: {
        color: "black", // Use theme color for error text
        marginTop: 2,
        fontSize: 14,
    },
    error: {
        color: 'red',
        marginTop: 5,
        
      },
      errorMessage:{
        color:'red',
      }
});

export default RoundInput;
