import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import BackGround from "../components/BackGround";
import RoundInput from "../components/inputs/RoundInput";
import RoundButton from "../components/buttons/RoundButton";
import { theme } from "../theme";
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import axios from 'axios';
import useTabletStyle from "../styles/TabStyles";
import { authAccessTonken } from "../services/Token";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyaccountScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const [profileImage, setProfileImage] = useState<string>('');
    const [gstPdfFileName, setGstPdfFileName] = useState<string | null>(null);
    const [panOrVoterPdfFileName, setPanOrVoterPdfFileName] = useState<string | null>(null);
    const { isTablet, orientation, tabletStyle } = useTabletStyle();
    const [loading, setLoading] = useState<boolean>(true);
    const route = useRoute();
    const [id, setId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        fullName: '',
        personalEmail: '',
        phoneNumber: '',
        companyName: '',
        businessEmail: '',
        websiteLink: '',
        socialMediaLink: '',
        gstNumber: '',
        address: '',
        city: '',
        country: '',
        pinCode: '',
        gstPdfFileName: '',
        panOrVoterPdfFileName: '',
        profileImage: '',
    });

    useEffect(() => {
        const getID = async () => {
            try {
                const storedId = await AsyncStorage.getItem('Id');
                if (storedId !== null) {
                    console.log("AsyncStorage value", storedId);
                    setId(JSON.parse(storedId));
                }
            } catch (error) {
                console.error('Error retrieving item from AsyncStorage:', error);
            }
        };

        getID();
    }, []);

    useEffect(() => {
        if (id) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [id]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('authToken');
            const api_url = `http://54.152.49.191:8080/register/professional/${id}`;
            const response = await axios.get(api_url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log("Response Data:", response.data);
            if (response.data) {
                const userData = response.data;
                setFormData({
                    fullName: userData.name || '',
                    personalEmail: userData.professionalEmail || '',
                    phoneNumber: userData.phoneNumber?.toString() || '',
                    companyName: userData.companyName || '',
                    businessEmail: userData.companyEmail || '',
                    websiteLink: userData.websiteLink || '',
                    socialMediaLink: userData.socialMediaLink || '',
                    gstNumber: userData.gstNumber || '',
                    address: userData.address || '',
                    city: userData.city || '',
                    country: userData.country || '',
                    pinCode: userData.pinCode?.toString() || '',
                    gstPdfFileName: userData.gstPdfFileName || '',
                    panOrVoterPdfFileName: userData.panOrVoterPdfFileName || '',
                    profileImage: userData.profileImage || '',
                });
                setProfileImage(userData.imageS3SignedURL || '');
                setGstPdfFileName(userData.gstFormS3SignedURL || '');
                setPanOrVoterPdfFileName(userData.panCardS3SignedURL || '');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            Alert.alert('Error', 'Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const downloadAndOpenFile = async (url: string | null, fileName: string) => {
        const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
        try {
            if (url) {
                const response = await RNFS.downloadFile({
                    fromUrl: url,
                    toFile: filePath,
                }).promise;

                if (response.statusCode === 200) {
                    await FileViewer.open(filePath);
                } else {
                    Alert.alert('Error', 'Failed to download file');
                }
            } else {
                Alert.alert('Error', 'Invalid file URL');
            }
        } catch (error) {
            console.error('File download error:', error);
            Alert.alert('Error', 'Failed to open file');
        }
    };

    const fields = [
        { label: 'Full Name *', placeholder: 'Enter your name', value: formData.fullName, editable: false },
        { label: 'Personal Email *', placeholder: 'Enter your personal email', value: formData.personalEmail, editable: false },
        { label: 'Phone Number *', placeholder: 'Enter your phone number', value: formData.phoneNumber, editable: false },
        { label: 'Company Name *', placeholder: 'Enter your company name', value: formData.companyName, editable: false },
        { label: 'Business Email *', placeholder: 'Enter your business email', value: formData.businessEmail, editable: false },
        { label: 'Website Link', placeholder: 'Enter your website link', value: formData.websiteLink, editable: false },
        { label: 'Social Media Link', placeholder: 'Enter your social media link', value: formData.socialMediaLink, editable: false },
        { label: 'GST Number *', placeholder: 'Enter your GST Number', value: formData.gstNumber, editable: false },
        { label: 'Address', placeholder: 'Enter your address', value: formData.address, editable: false },
        { label: 'City *', placeholder: 'Enter your city', value: formData.city, editable: false },
        { label: 'Country *', placeholder: 'Enter your country', value: formData.country, editable: false },
        { label: 'Pin Code *', placeholder: 'Enter your pin code', value: formData.pinCode, editable: false },
    ];

    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </SafeAreaView>
        );
    }

    return (
        <BackGround safeArea={true} style={styles.container}>
            <View style={[styles.content, tabletStyle, isTablet && orientation === 'vertical' ? { width: '70%', alignSelf: 'center' } : {}]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: profileImage }}
                            style={styles.profileImage}
                        />
                    </View>
                    {fields.map((field, index) => (
                        <RoundInput
                            key={index}
                            label={field.label}
                            placeholder={field.placeholder}
                            value={field.value}
                            editable={field.editable}
                            error={""}
                            onChangeText={() => {}}
                            options={[]}
                        />
                    ))}
                    <View style={styles.pdfContainer}>
                        <Text style={styles.pdfLabel}>GST Registration Form</Text>
                        <View style={styles.pdfRow}>
                            <Text style={styles.pdfFileName}>{gstPdfFileName || 'No file available'}</Text>
                            <TouchableOpacity onPress={() => downloadAndOpenFile(gstPdfFileName, 'gst-form.pdf')}>
                                <Image source={require('../assets/icons/pdf.png')} style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.pdfContainer}>
                        <Text style={styles.pdfLabel}>Pan Card</Text>
                        <View style={styles.pdfRow}>
                            <Text style={styles.pdfFileName}>{panOrVoterPdfFileName || 'No file available'}</Text>
                            <TouchableOpacity onPress={() => downloadAndOpenFile(panOrVoterPdfFileName, 'pan-or-voter-card.pdf')}>
                                <Image source={require('../assets/icons/pdf.png')} style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <RoundButton
                        title={'Update'}
                        onPress={() => { }}
                    />
                </View>
            </View>
        </BackGround>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 5,
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "gray",
    },
    buttonContainer: {
        marginTop: 20,
    },
    pdfContainer: {
        marginTop: 20,
    },
    pdfLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    pdfRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    pdfFileName: {
        fontSize: 14,
        color: 'blue',
    },
    icon: {
        width: 20,
        height: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default MyaccountScreen;
