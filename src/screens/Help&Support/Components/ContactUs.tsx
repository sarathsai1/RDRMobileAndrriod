import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../../theme";

interface ContactUsProps {
    question: string;
    answer: string;
}

const ContactUs: React.FC<ContactUsProps> = ({question, answer}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <View style={[
            styles.menuItemContainer,
            isExpanded && styles.expandedContainer // Apply expanded styles if the item is expanded
        ]}>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => setIsExpanded(!isExpanded)}
            >
                <Text style={styles.menuText}>{question}</Text>
                <Image
                    source={isExpanded
                        ? require('../../../assets/icons/up_arrow_block.png')
                        : require('../../../assets/icons/down_arrow_block.png')
                    }
                    style={styles.arrowIcon}
                />
            </TouchableOpacity>
            {isExpanded && (
                <View style={styles.answerContainer}>
                    <View style={styles.divideLine}></View>
                    <Text style={styles.answerText}>{answer}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    menuItemContainer: {
        backgroundColor: theme.colors.secondary,
        borderRadius: 50,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginTop: 10,
        marginVertical: 5,
        width: '100%',
        alignItems: 'center',
    },
    expandedContainer: {
        borderRadius: 20,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    menuText: {
        color: theme.colors.text,
        fontSize: 14,
        fontWeight: 'bold',
    },
    arrowIcon: {
        width: 18,
        height: 10,
    },
    answerContainer: {
        width: '100%',
    },
    answerText: {
        color: theme.colors.textSecondary,
    },
    divideLine: {
        height: 2,
        backgroundColor: '#D8D9DD',
        marginVertical: 20,
        marginHorizontal: 25,
    },
});

export default ContactUs;
