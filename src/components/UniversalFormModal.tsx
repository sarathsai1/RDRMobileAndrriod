import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Image, Text, ScrollView } from 'react-native';
import { theme } from '../theme';
import useTabletStyle from '../styles/TabStyles';

const UniversalFormModal = ({ titleName, visible, onClose, children }: { titleName: string, visible: boolean; onClose: () => void; children: React.ReactNode }) => {
    const { isTablet, orientation, tabletStyle } = useTabletStyle();

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={[styles.centeredView, isTablet && orientation === 'horizontal' ? { width: '60%'}:{}]}>
                    <View style={styles.modalView}>
                        <View style={styles.headersTitle}>
                            <Text style={styles.modalTitle}>{titleName}</Text>
                            <TouchableOpacity onPress={() => onClose()}>
                                <Image
                                    source={require('../assets/icons/close.png')}
                                    style={styles.closeImage}
                                />
                            </TouchableOpacity>
                        </View>
                        {children}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    centeredView: {
        width: '100%',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    headersTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    modalTitle: {
        fontSize: 25,
        marginBottom: 15,
        color: theme.colors.text,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    closeImage: {
        width: 30,
        height: 30,
        marginBottom: 15
    },
});

export default UniversalFormModal;
