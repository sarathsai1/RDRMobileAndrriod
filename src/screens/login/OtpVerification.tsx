import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, TextInput, Text, View, TouchableOpacity, Image, DeviceEventEmitter } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import OtpTextInput from 'react-native-otp-textinput';


import RoundInput from '../../components/inputs/RoundInput';
import RoundButton from '../../components/buttons/RoundButton';
import SocialMediaButton from '../../components/buttons/SocialMediaButton';
import BackGround from '../../components/BackGround';
import defaults from '../../styles/defaults';
import { theme } from '../../theme';
import { useAuth } from '../../services/firebaseAuthContext';
import useTabletStyle from "../../styles/TabStyles";

const OtpVerification: React.FC<{ route: any }> = ({ route }) => {
    const navigation = useNavigation<any>();
    const [otpValue, setOtpValue] = useState('');
    const { mobileNumber }: any = route.params;
    // const { mobileNumber }: any = '8686043386';
    const { confirmationResult } = useAuth();
    const { isTablet, orientation, tabletStyle } = useTabletStyle();

    const handleVerify = async () => {
        if (confirmationResult) {
            // Use confirmationResult to verify OTP
            try {
                const userCredential: any = await confirmationResult.confirm(otpValue);
                console.log('user', userCredential.user);
                navigation.navigate('Registration');
            } catch (error) {
                console.error('Error during phone number verification', error);
            }
        }
    };

    return (
        <BackGround safeArea={true} style={defaults.flex}>
            <View style={[styles.container, tabletStyle, isTablet && orientation === 'vertical' ? { width: '70%', height: 'auto', alignSelf: 'center' } : {}]}>
                <Text style={styles.title}>Verify your phone number</Text>
                <Text style={styles.subTitle}>
                    We’ve sent an SMS with an activation code to your phone <Text style={styles.numberText}>{mobileNumber}</Text>
                </Text>

                <OtpTextInput
                    handleTextChange={(otp) => { console.log(otp); setOtpValue(otp) }}
                    defaultValue={otpValue} // Ensure the OTP input displays the autofilled value
                    containerStyle={styles.otpContainer}
                    textInputStyle={styles.otpInput}
                    tintColor={theme.colors.primary}
                    inputCount={6}
                />

                <View style={styles.resendContainer}>
                    <Text style={styles.resendText}>
                        I didn’t receive a code -
                    </Text>
                    <TouchableOpacity onPress={() => {/* handle resend action */ }}>
                        <Text style={styles.resendButton}> Resend</Text>
                    </TouchableOpacity>
                </View>

                <RoundButton
                    title={'Verify'}
                    onPress={handleVerify}
                    style={styles.fullWidthButton}
                />
            </View>
        </BackGround>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },

    title: {
        textAlign: 'center',
        fontSize: 35,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: theme.colors.text
    },

    subTitle: {
        fontSize: 16,
        color: theme.colors.textSecondary,
        marginBottom: 20,
        textAlign: 'center',
        width: '80%',
    },

    numberText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.text
    },

    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 20,
    },
    otpInput: {
        width: 50,
        height: 55,
        borderWidth: 1,
        borderRadius: 10, // Rounded corners
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
        textAlign: 'center', // Center the text
        fontSize: 20, // Size of the input text
        color: theme.colors.primary,
    },

    resendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },

    resendText: {
        color: theme.colors.textSecondary,
        fontSize: 16,
    },

    resendButton: {
        color: theme.colors.text,
        fontSize: 16,
        fontWeight: 'bold', // optional to make it stand out more
    },

    fullWidthButton: {
        width: '100%',
        alignSelf: 'center',

        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        zIndex: 1,
    },
});

export default OtpVerification;
