import React from "react";
import BackGround from "../components/BackGround";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import defaults from "../styles/defaults";
import { theme } from "../theme";

const PrivacyPolicyScreen: React.FC = () => {
    return (
        <BackGround safeArea={true} style={defaults.flex}>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.policyContent}>
                        <Text style={styles.policyTitle}>Cancellation Policy</Text>
                        <Text style={styles.policyDesc}>RDR offers a flexible cancellation policy for your convenience. You may cancel your subscription at any time, effective at the end of the current billing cycle, but please be aware that refunds are not provided for the remainder of the cycle. Note that RDR is not responsible for any repercussions of project cancellations; these should be managed directly with clients. Subscriptions automatically renew, so to avoid unintended charges, please cancel at least 24 hours before the end of the current period. We reserve the right to modify this policy and will notify you of any significant changes.</Text>
                    </View>
                    <View style={styles.policyContent}>
                        <Text style={styles.policyTitle}>Terms and Conditions</Text>
                        <Text style={styles.policyDesc}>By using RDR, you accept our terms, designed for a fair user environment. The app offers a professional project management platform, but we are not liable for project outcomes. Users are responsible for their account's security and any activities under it; misuse may result in account termination. All RDR content is our intellectual property and legally protected. RDR disclaims liability for indirect or consequential damages from using our services. Terms are subject to change, and continued use implies acceptance of new terms. These terms are governed by our jurisdiction's laws. For inquiries, contact us at contact@email.com</Text>
                    </View>
                </ScrollView>
            </View>
        </BackGround>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    policyContent: {
        marginTop: 15,
    },

    policyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.text
    },

    policyDesc: {
        fontSize: 14,
        marginHorizontal: 12,
        color: theme.colors.textSecondary,
        lineHeight: 20,
    }
})

export default PrivacyPolicyScreen;