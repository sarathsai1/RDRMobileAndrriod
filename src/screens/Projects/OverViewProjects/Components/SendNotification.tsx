import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { theme } from "../../../../theme";

const SendNotification: React.FC = () => {
    return (
        <View style={styles.cardContent}>
            <Text style={styles.nameText}>Send Notification</Text>

            <View style={styles.notifyIconsContent}>
                <View style={styles.iconsContent}>
                    <Image
                        source={require('../../../../assets/icons/message.png')}
                        style={styles.notifyIconsImage}
                    />

                    <Text style={styles.notifyIconsText}>SMS</Text>
                </View>

                <View style={styles.iconsContent}>
                    <Image
                        source={require('../../../../assets/icons/email.png')}
                        style={styles.notifyIconsImage}
                    />

                    <Text style={styles.notifyIconsText}>Email</Text>
                </View>

                <View style={styles.iconsContent}>
                    <Image
                        source={require('../../../../assets/icons/whatsapp.png')}
                        style={styles.notifyIconsImage}
                    />

                    <Text style={styles.notifyIconsText}>WhatsApp</Text>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    cardContent: {
        backgroundColor: theme.colors.secondary,
        borderRadius: 25,
        marginVertical: 10,
        position: 'relative',
        padding: 20,
    },

    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text,
    },

    notifyIconsContent: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    iconsContent: {
        alignItems: 'center',
    },

    notifyIconsImage: {
        width: 50,
        height: 50,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    notifyIconsText: {
        color: theme.colors.text,
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center'
    }
});

export default SendNotification;

