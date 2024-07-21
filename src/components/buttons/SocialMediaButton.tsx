import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { theme } from '../../theme';

interface SocialMediaButtonProps {
    title: string;
    onPress: () => void;
}

const SocialMediaButton: React.FC<SocialMediaButtonProps> = ({ title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.googleButton}>
            <Image
                source={require('../../assets/icons/Google.png')}
                style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 13,
        paddingHorizontal: 25,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: theme.colors.borderColor,
    },
    googleIcon: {
        width: 24,
        height: 24,
    },
    googleButtonText: {
        fontWeight: '700',
        color: 'black',
        textAlign: 'center',
        flexGrow: 1,
    },
});


export default SocialMediaButton;
