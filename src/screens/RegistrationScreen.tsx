import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, Text, View, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import BackGround from "../components/BackGround";
import defaults from "../styles/defaults";
import RoundInput from "../components/inputs/RoundInput";
import SocialMediaInput from "../components/inputs/SocialMediaInput";
import FileUploadInput from "../components/inputs/FileUploadInput";
import RoundButton from "../components/buttons/RoundButton";
import { theme } from "../theme";
import DocImageUpload from "../components/DocImageUpload";
import DocumentPicker from 'react-native-document-picker';
import { authAccessTonken } from '../services/Token';
import RNFS, {
    Fields,
    UploadBeginCallbackResult,
    UploadFileItem,
    UploadFileOptions,
    UploadProgressCallbackResult,
} from 'react-native-fs';
import useTabletStyle from "../styles/TabStyles";
import axios, { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    validateEmail,
    validateFullName,
    validateGstNumber,
    validateAddress,
    validateCity,
    validateCountry,
    validatePinCode,
    validateFileType,
    validatePanNumber
} from '../utils/validationUtils';
import { userObj } from "../storage/storageUser";
interface RegistrationResponse {
    id: number;
    // Add other properties if the response contains more fields
}
const RegistrationScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const [profileImage, setProfileImage] = useState('');
    const [gstPdfFile, setGSTPdfFile] = useState<any | null>(null); // Update with correct type if necessary
    const [gstPdfFileName, setGstPdfFileName] = useState<string | null>('');
    const [panOrVoterPdfFile, setPanOrVoterPdfFile] = useState<any | null>(null); // Update with correct type if necessary
    const [panOrVoterPdfFileName, setPanOrVoterPdfFileName] = useState<string | null>('');
    const { isTablet, orientation, tabletStyle } = useTabletStyle();

    // Form fields states
    const [email, setEmail] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [personalEmail, setPersonalEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [businessEmail, setBusinessEmail] = useState('');
    const [gstNumber, setGstNumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [websiteLink, setWebsiteLink] = useState('');
    const [socialMediaLink, setSocialMediaLink] = useState('');
    const [country, setCountry] = useState('');
    const [pinCode, setPinCode] = useState('');
    // const [gstPdfFileName, setGstPdfFileName] = useState('');
    // const [panOrVoterPdfFileName, setPanOrVoterPdfFileName] = useState('');
    // const [profileImage, setProfileImage] = useState('');
    const [panNumber, setPanNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [professionalId, setProfessionalId] = useState('');
    const [receivedId, setReceivedId] = useState(null);
    // const [websiteLink, setWebsiteLink] = useState('');
    // const [socialMediaLink, setSocialMediaLink] = useState('');

    const onChangeUploadImages = async (uri: string) => {
        const stats = await RNFS.stat(uri);
        console.log(uri, typeof uri);
        let uploadedFile: any = '';
        if (typeof uri === 'string') {
            uploadedFile = {
                fileCopyUri: uri,
                size: stats.size,
                name: stats.name,
                type: 'image/jpeg',
                uri: stats.originalFilepath,
            };
        } else {
            uploadedFile = uri[0];
        }

        return uploadedFile;
    }
    const imageUploaded = (uri: string, data?: any, metadata?: any) => {
        //   let imageUri: string = onChangeUploadImages(uri);
        setProfileImage(uri);
        // console.log('imageUploaded', imageUri)
        // console.log(uri, 'uri');
        // console.log(data, 'data');
        // console.log(metadata, 'metadata');
    }

    const imagePicked = (uri: string, data?: any, metadata?: any) => {
        // let imageUri: string = onChangeUploadImages(uri);
        setProfileImage(uri)
        // console.log('imagePicked', imageUri)
        // console.log(uri, 'uri');
        // console.log(data, 'data');
        // console.log(metadata, 'metadata');
    };
    const handleUploadGSTPDF = async () => {
        try {
            const results = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });

            const result = results[0];
            const pdfFileObject = {
                uri: result.uri,
                type: result.type,
                name: result.name
            };
            // Validate file type
            if (result.type !== 'application/pdf') {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    gstPdfFileName: 'Please upload a valid PDF file for GST',
                }));
                return;
            }

            setGSTPdfFile(result);
            setGstPdfFileName(result.name);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker
            } else {
                throw err;
            }
        }
    };

    const handleUploadPanOrVoterPDF = async () => {
        try {
            const results = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });

            const result = results[0];


            const pdfFileObject = {
                uri: result.uri,
                type: result.type,
            };

            // Validate file type
            if (result.type !== 'application/pdf') {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    panOrVoterPdfFileName: 'Please upload a valid PDF file for PAN/Voter ID',
                }));
                return;
            }

            setPanOrVoterPdfFile(result);
            setPanOrVoterPdfFileName(result.name);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker
            } else {
                throw err;
            }
        }
    };

    const handleRegister = async () => {
        // if (!validateFields()) {
        //     return; // If fields are not valid, do not proceed with the request
        // }

        const formData = new FormData();
        formData.append('name', fullName);
        formData.append('professionalEmail', personalEmail);
        formData.append('phoneNumber', phoneNumber);
        formData.append('companyName', companyName);
        formData.append('companyEmail', businessEmail);
        formData.append('websiteLink', websiteLink);
        formData.append('socialMediaLink', socialMediaLink);
        formData.append('gstNumber', gstNumber);
        formData.append('panNumber', panNumber);
        formData.append('address', address);
        formData.append('city', city);
        formData.append('country', country);
        formData.append('pinCode', pinCode);

        if (profileImage) {
            const profileImageFile = {
                uri: profileImage,
                type: 'image/jpeg',
                name: 'profile.jpg'
            };
            formData.append('image', profileImageFile);
        }

        if (gstPdfFile) {
            formData.append('gstform', gstPdfFile);
        }

        if (panOrVoterPdfFile) {
            formData.append('pan', panOrVoterPdfFile);
        }

        console.log("dd", formData);

        try {
            // const token = await AsyncStorage.getItem('token');
            // console.log("erter",token);
            const token = await AsyncStorage.getItem('authToken');
            const response = await fetch('http://54.152.49.191:8080/register/professional', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });


            console.log("This is my formdata : ", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authAccessTonken}`,
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });
            const textResponse = await response.text();
            console.log('Raw response:', textResponse);

            let result: RegistrationResponse;
            // try {
            //      result = JSON.parse(textResponse) as RegistrationResponse;

            //     console.log('Parsed response:', result);
            //     await AsyncStorage.setItem('professionalId', result.professionalId);
            //     console.log('id', professionalId)
            //     // const jsonResponse = await response.json();
            //     // console.log('Parsed JSON response:', jsonResponse);
            // } catch (jsonError) {
            //     console.log("This is my response : ", response);
            //     console.log("This is my status : ", response.status);

            // }
            // console.log("This is my response Backend : ", response);
            // console.log("This is my status : ", response.status);
            console.log(response);
            if (response.status == 200) {
                // const jsonResponse = await response.body;
                // console.log('Parsed JSON response:', jsonResponse);
              
        // console.log('Parsed JSON data response:', jsonResponse.data);
        // ...
                // console.log("This is my response",response.data );
                    //  console.log("proffestionalid",result)
                    console.log(response)
                    
                    result = JSON.parse(textResponse) as RegistrationResponse;

                    console.log('Parsed response:', result.id);
                console.log("Registration successful:",);
                AsyncStorage.setItem('Id',JSON.stringify(result.id));
                // console.log(response.json);
                // console.log("ssss",id);
                Alert.alert('Success', 'Registration scessful', [{ text: 'OK', onPress: () => navigation.navigate('Approval',{ id: result.id }) }])


// console.log("ssss",id);
            } else if (response.status == 409) {
                // console.log("Registration 409 error:", result);
                Alert.alert('ERROR', 'plesae give valid phone numner/email id');
            }
            else if (response.status == 400) {
                // console.log("Registration 400 error:", result);
                Alert.alert('ERROR', 'plesae give valid phone');

            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Failed to register');
        }

    };
    // const handleVerify = () => {
    //     navigation.navigate('Approval')
    // }


    const countryCode = '+91';

    function handleVerify(): void {
        throw new Error("Function not implemented.");
    }
    useEffect(() => {
        const getUserData = async () => {
          try {
            const value = await AsyncStorage.getItem('sarath');
            if (value !== null) {
              //console.log("AsyncStorage value", value);
              userObj.id=23;
              userObj.name=JSON.parse(value).fullName;
              userObj.email=JSON.parse(value).professionalEmail;
              userObj.userProfile=JSON.parse(value).userProfile;
        
        AsyncStorage.setItem('sarath',JSON.stringify(userObj));
            }
          } catch (error) {
            console.error('Error retrieving item from AsyncStorage:', error);
          }
        };
    
        getUserData();
      }, []);
    return (
        <BackGround safeArea={true} style={defaults.flex}>
            <View style={[styles.container, tabletStyle, isTablet && orientation === 'vertical' ? { width: '70%', height: 'auto', alignSelf: 'center' } : {}]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.imageUploadContent}>
                        <TouchableOpacity style={styles.imageUploadBoxContent}>
                            <DocImageUpload
                                onImageUploaded={imageUploaded}
                                onImagePicked={imagePicked}
                                upload={false}
                                width={200}
                                height={200} fileType={"images"}>
                                <View style={{ width: 120, height: 120, borderRadius: 100, overflow: "hidden" }}>
                                    {profileImage !== '' ? (
                                        <Image
                                            key={profileImage}
                                            source={{ uri: profileImage }}
                                            style={defaults.image}
                                        />
                                    ) : (
                                        <Image
                                            source={require('../assets/images/profile.png')}
                                            style={defaults.image}
                                        />
                                    )}
                                </View>
                            </DocImageUpload>

                            <View style={styles.cameraIconContent}>
                                <Image
                                    source={require('../assets/icons/camera.png')}
                                    style={defaults.image}
                                />
                            </View>
                        </TouchableOpacity>

                    </View>
                    {errors.profileImage && <Text style={styles.error}>{errors.profileImage}</Text>}

                    <RoundInput
                        label='Full Name *'
                        placeholder="Enter your name"
                        value={fullName}
                        onChangeText={setFullName}
                        errorMessage={errors.fullName} editable={false} error={""} options={[]} />

                    <RoundInput
                        label='Personal Email *'
                        placeholder="Enter your personal email"
                        value={personalEmail}
                        onChangeText={setPersonalEmail}
                        errorMessage={errors.personalEmail} editable={false} error={""} options={[]} />

                    <RoundInput
                        label={`Phone Number(${countryCode}) *`}
                        placeholder={`Enter your phone number (${countryCode})`}
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        errorMessage={errors.phoneNumber}
                        maxLength={12} editable={false} error={""} options={[]} />

                    <RoundInput
                        label='Company Name *'
                        placeholder="Enter your company name"
                        value={companyName}
                        onChangeText={setCompanyName}
                        errorMessage={errors.companyName} editable={false} error={""} options={[]} />

                    <RoundInput
                        label='Business Email *'
                        placeholder="Enter your business email"
                        value={businessEmail}
                        onChangeText={setBusinessEmail}
                        errorMessage={errors.businessEmail} editable={false} error={""} options={[]} />

                    <SocialMediaInput
                        label='Website Link'
                        placeholder="Enter your website link"
                        value={websiteLink}
                        onChangeText={setWebsiteLink}
                    />

                    <SocialMediaInput
                        label='Social Media Link'
                        placeholder="Enter your social media link"
                        value={socialMediaLink}
                        onChangeText={setSocialMediaLink}
                    />

                    <RoundInput
                        label='GST Number *'
                        placeholder="Enter your GST Number"
                        value={gstNumber}
                        onChangeText={setGstNumber}
                        errorMessage={errors.gstNumber} editable={false} error={""} options={[]} />
                    <RoundInput
                        label='PAN Number *'
                        placeholder="Enter your PAN Number"
                        value={panNumber}
                        onChangeText={setPanNumber}
                        errorMessage={errors.panNumber} editable={false} error={""} options={[]} />

                    <FileUploadInput
                        label='GST Registration Form'
                        uploadText='Upload GST Form'
                        onPress={handleUploadGSTPDF}
                        pdfFile={gstPdfFile}
                        pdfFileName={gstPdfFileName}
                        errorMessage={errors.gstPdfFileName} title={""} file={null} onUpload={function (): Promise<void> {
                            throw new Error("Function not implemented.");
                        }} />

                    <FileUploadInput
                        label='Pan Card *'
                        uploadText='Upload Voter Card/Pan Card'
                        onPress={handleUploadPanOrVoterPDF}
                        pdfFile={panOrVoterPdfFile}
                        pdfFileName={panOrVoterPdfFileName}
                        errorMessage={errors.panOrVoterPdfFileName} title={""} // Correct property name here
                        file={null} onUpload={function (): Promise<void> {
                            throw new Error("Function not implemented.");
                        }} />
                    <RoundInput
                        label='Address *'
                        placeholder="Enter your address"
                        value={address}
                        onChangeText={setAddress}
                        errorMessage={errors.address} editable={false} error={""} options={[]} />

                    <RoundInput
                        label='City *'
                        placeholder="Enter your city"
                        value={city}
                        onChangeText={setCity}
                        errorMessage={errors.city} editable={false} error={""} options={[]} />

                    <RoundInput
                        label='Country *'
                        placeholder="Enter your country"
                        value={country}
                        onChangeText={setCountry}
                        errorMessage={errors.country} editable={false} error={""} options={[]} />

                    <RoundInput
                        label='Pin Code *'
                        placeholder="Enter your pin code"
                        value={pinCode}
                        onChangeText={setPinCode}
                        errorMessage={errors.pinCode} editable={false} error={""} options={[]} />
                </ScrollView>

                <View style={styles.registrationContent}>
                    <RoundButton
                        title={'Register'}
                        onPress={handleRegister}
                        style={styles.fullWidthButton}
                    // onPress={handleVerify}
                    />
                </View>
            </View>
        </BackGround >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    imageUploadContent: {
        marginVertical: 25,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    imageUploadBoxContent: {
        width: 120,
        height: 120,
        borderRadius: 100,
        backgroundColor: 'gray',
        position: 'relative'
    },

    cameraIconContent: {
        width: 35,
        height: 35,
        position: 'absolute',
        bottom: 0,
        right: 8,
    },

    registrationContent: {
        width: '100%',
        paddingVertical: 30,
        backgroundColor: theme.colors.background
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

    error: {
        color: 'red',
        fontSize: 16,
        marginTop: -10,
        textAlign: 'center',
    },

})

export default RegistrationScreen; 

function setUserName(name: any) {
    throw new Error("Function not implemented.");
}
function validateFields() {
    throw new Error("Function not implemented.");
}

