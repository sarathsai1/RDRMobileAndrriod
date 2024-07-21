import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../../../../../theme";

const RemarksComments: React.FC = () => {
    return (
        <>
            <View style={styles.mainRemarksCommentsContent}>
                <View style={styles.textContainer}>
                    <Text style={styles.typeText}>Prasad Kandala</Text>
                    <Text style={styles.dateText}>15 Feb, 2024</Text>
                </View>

                <View>
                    <Text style={styles.commentsText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</Text>
                </View>
            </View>

            <View style={styles.mainRemarksCommentsContent}>
                <View style={styles.textContainer}>
                    <Text style={styles.typeText}>Prasad Kandala</Text>
                    <Text style={styles.dateText}>15 Feb, 2024</Text>
                </View>

                <View>
                    <Text style={styles.commentsText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</Text>
                </View>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    mainRemarksCommentsContent: {
        marginVertical: 15
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    typeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.text
    },
    dateText: {
        fontSize: 12,
        fontWeight: '600',
        color: theme.colors.textSecondary
    },
    commentsText: {
        marginTop: 5,
        marginHorizontal: 20,
        fontSize: 12,
        color: theme.colors.textSecondary,
    },
});

export default RemarksComments;