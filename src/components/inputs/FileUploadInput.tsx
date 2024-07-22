import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { theme } from "../../theme";
import { DocumentPickerResponse } from "react-native-document-picker";

interface FileUploadInputProps {
    label?: string;
    uploadText?: string;
    onPress: (file: any) => void;
    pdfFile?: {} | null,
    pdfFileName?: string | null
    errorMessage?: string;
    url?: string | null; // Add the url prop here
    title: string;
    onUpload: (file: any) => void;
    file: DocumentPickerResponse | null;
   
}

const FileUploadInput: React.FC<FileUploadInputProps> = ({onUpload,file, label, uploadText, onPress, pdfFile, pdfFileName, errorMessage,url,title }) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TouchableOpacity style={styles.uploadButton} onPress={onPress}>
                {pdfFile ? (
                    <>
                        <Image
                            source={require('../../assets/icons/pdfImgIcon.png')}
                            style={styles.pdfIcon}
                        />
                        <Text style={styles.uploadText}>{pdfFileName}</Text>
                    </>
                ) : (
                    <>
                        <Image
                            source={require('../../assets/icons/upload.png')}
                            style={styles.googleIcon}
                        />
                        <Text style={styles.uploadText}>{uploadText}</Text>
                    </>
                )}
            </TouchableOpacity>
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        </View>
    )
}

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
    uploadButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 150,
        paddingHorizontal: 10,
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
    googleIcon: {
        width: 30,
        height: 30,
    },
    pdfIcon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    uploadText: {
        color:"green",
        marginTop: 10, // Space between icon and text
    },
    error: {
        color: 'red',
        marginTop: 5,
    },
});

export default FileUploadInput;