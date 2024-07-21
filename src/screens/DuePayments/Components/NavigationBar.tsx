import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../../theme';

const NavigationBar: React.FC<{ onTabPress: (tabName: string) => void }> = ({ onTabPress }) => {
    const [activeTab, setActiveTab] = React.useState('InProgress');

    const handlePress = (tabName: string) => {
        setActiveTab(tabName);
        onTabPress(tabName);
        console.log(tabName)
    };

    return (
        <View style={styles.navContainer}>
            <TouchableOpacity
                style={styles.navButton}
                onPress={() => handlePress('InProgress')}
            >
                <Text style={styles.navText}>In-Progress</Text>
                <View style={activeTab === 'InProgress' ? styles.activeTab : null}></View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.navButton}
                onPress={() => handlePress('Completed')}
            >
                <Text style={styles.navText}>Completed</Text>
                <View style={activeTab === 'Completed' ? styles.activeTab : null}></View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.primary,
        marginTop: 20,
        marginBottom: 15
    },
    navButton: {
        alignItems: 'center',
        width: 100,
    },
    navText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: theme.colors.text,
    },
    activeTab: {
        padding: 3,
        width: '100%',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        backgroundColor: theme.colors.primary, // Active tab color
    },
});

export default NavigationBar;
