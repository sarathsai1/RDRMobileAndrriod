import React from "react";
import { View, StyleSheet, TextInput, TextInputProps, Text } from "react-native";
import { theme } from "../../theme";

interface SocialMediaInputProps extends TextInputProps {
    label?: string;
}

const SocialMediaInput: React.FC<SocialMediaInputProps> = ({ label, ...props }) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.inputContainer}>
                <View style={styles.prefixContainer}>
                    <Text style={styles.prefix}>https://</Text>
                </View>
                <TextInput
                    style={styles.input}
                    {...props}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 0,
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: theme.colors.text,
        marginBottom: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderRadius: 25,
        borderColor: '#D0D5DD',
        backgroundColor: '#F0F1F5',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 1,
    },
    prefixContainer: {
        height: '100%',
        justifyContent: 'center',
        backgroundColor: '#F0F1F5',
        borderRightWidth: 1,
        borderColor: '#D0D5DD',
        paddingHorizontal: 10,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
    },
    prefix: {
        color: theme.colors.text,
    },
    input: {
        flex: 1,
        height: '100%',
        borderRadius: 25,
        padding: 0,
        paddingHorizontal: 8,
        color: theme.colors.text,
    },
});

export default SocialMediaInput;
