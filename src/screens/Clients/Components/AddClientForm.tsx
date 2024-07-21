import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import RoundInput from '../../../components/inputs/RoundInput';
import RoundButton from '../../../components/buttons/RoundButton';
import FileUploadInput from '../../../components/inputs/FileUploadInput';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import axios from 'axios'; // Import Axios for HTTP requests
import { authAccessTonken } from '../../../services/Token'; // Assuming authAccessToken is correctly exported from Token.ts

// Define a type for the form data
export type FormData = {
    companyName: string;
    clientName: string;
    clientPhoneNumber: string;
    clientEmail: string;
    clientGstNumber: string;
    clientGstForm: DocumentPickerResponse | null;
    clientPanCard: DocumentPickerResponse | null;
    id:number;
};

const AddClientForm = ({ onSubmit }: { onSubmit: (formData: FormData) => void }) => {
    const [formData, setFormData] = useState<FormData>({
        
        companyName: '',
        clientName: '',
        clientPhoneNumber: '',
        clientEmail: '',
        clientGstNumber: '',
        clientGstForm: null,
        clientPanCard: null,
        id: 0,
    });

    const handleChange = (name: keyof FormData, value: string | DocumentPickerResponse) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
            
        }));
    };

    const handleSubmit = async () => {
        try {
            // const Id =Math.floor(1000000000 + Math.random() * 9000000000)
            // Prepare FormData
            const formDataToSend = new FormData();
            formDataToSend.append('companyName', formData.companyName);
            formDataToSend.append('name', formData.clientName);
            formDataToSend.append('PhoneNumber', formData.clientPhoneNumber);
            formDataToSend.append('email', formData.clientEmail);
            formDataToSend.append('gstNumber', formData.clientGstNumber);
            formDataToSend.append('professionalId',1);
           
            if (formData.clientGstForm) {
                formDataToSend.append('gstForm', {
                    uri: formData.clientGstForm.uri,
                    type: formData.clientGstForm.type,
                    name: formData.clientGstForm.name,
                });
            }
            if (formData.clientPanCard) {
                formDataToSend.append('pan', {
                    uri: formData.clientPanCard.uri,
                    type: formData.clientPanCard.type,
                    name: formData.clientPanCard.name,
                });
            }

            // Make the API call
            const response = await axios.post('http://54.152.49.191:8080/client/saveClient', formDataToSend, {
                headers: {
                    'Authorization': `Bearer ${authAccessTonken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
console.log(response)
            // Handle success
            console.log('API response:', response.data);
            Alert.alert('Client added successfully!');

            // Reset form after submission
            setFormData({
                companyName: '',
                clientName: '',
                clientPhoneNumber: '',
                clientEmail: '',
                clientGstNumber: '',
                clientGstForm: null,
                clientPanCard: null,
                id: 0,
            });

            // Call onSubmit if needed
            onSubmit(formData);

        } catch (error) {
            // Handle error
            console.error('Error adding client:', error);
            Alert.alert('Failed to add client. Please try again.');
        }
    };

    const handleFileUpload = async (name: keyof FormData) => {
        try {
            const results = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });

            if (!results) {
                return; // Handle no selection case
            }

            const result = results[0]; // Get the first item from the results array

            handleChange(name, result);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the picker');
            } else {
                console.error('Error picking file:', err);
            }
        }
    };

    return (
        <View style={styles.formContainer}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%', height: 400 }}>
                <RoundInput
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChangeText={(value) => handleChange('companyName', value)} label={''} editable={false} error={''} options={[]}                />
                <RoundInput
                    placeholder="Client Name"
                    value={formData.clientName}
                    onChangeText={(value) => handleChange('clientName', value)} label={''} editable={false} error={''} options={[]}                />
                <RoundInput
                    placeholder="Client Phone Number"
                    value={formData.clientPhoneNumber}
                    onChangeText={(value) => handleChange('clientPhoneNumber', value)} label={''} editable={false} error={''} options={[]}                />
                <RoundInput
                    placeholder="Client Email Id"
                    value={formData.clientEmail}
                    onChangeText={(value) => handleChange('clientEmail', value)} label={''} editable={false} error={''} options={[]}                />
                <RoundInput
                    placeholder="Client GST Number"
                    value={formData.clientGstNumber}
                    onChangeText={(value) => handleChange('clientGstNumber', value)} label={''} editable={false} error={''} options={[]}                />
                <FileUploadInput
                    uploadText='Upload Client GST Form'
                    onPress={() => handleFileUpload('clientGstForm')}
                    file={formData.clientGstForm} title={''} onUpload={function (): Promise<void> {
                        throw new Error('Function not implemented.');
                    } }                />
                <FileUploadInput
                    uploadText='Upload Client Pan Card'
                    onPress={() => handleFileUpload('clientPanCard')}
                    file={formData.clientPanCard} title={''} onUpload={function (): Promise<void> {
                        throw new Error('Function not implemented.');
                    } }                />
            </ScrollView>
            <RoundButton
                title={'Submit'}
                onPress={handleSubmit}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        width: '100%',
    },
});

export default AddClientForm;
