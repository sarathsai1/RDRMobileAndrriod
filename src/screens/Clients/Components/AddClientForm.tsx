import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import RoundInput from '../../../components/inputs/RoundInput';
import RoundButton from '../../../components/buttons/RoundButton';
import FileUploadInput from '../../../components/inputs/FileUploadInput';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export type FormData = {
    companyName: string;
    clientName: string;
    clientPhoneNumber: string;
    clientEmail: string;
    clientGstNumber: string;
    clientGstForm: DocumentPickerResponse | null;
    clientPanCard: DocumentPickerResponse | null;
};
interface AddClientResponse {
    id: number;
    // Add other properties if the response contains more fields
}
const AddClientForm = ({ onSubmit }: { onSubmit: (formData: FormData) => void }) => {
    const [formData, setFormData] = useState<FormData>({
        companyName: '',
        clientName: '',
        clientPhoneNumber: '',
        clientEmail: '',
        clientGstNumber: '',
        clientGstForm: null,
        clientPanCard: null,
    });
    const navigation = useNavigation<any>();
    // const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [gstPdfFileName, setGstPdfFileName] = useState<string | null>(null);
    const [panOrVoterPdfFileName, setPanOrVoterPdfFileName] = useState<string | null>(null);

    const handleChange = (name: keyof FormData, value: string | DocumentPickerResponse | null) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        const newErrors: { [key: string]: string } = {};
        let hasError = false;

        // Validate required fields
        if (!formData.companyName) {
            newErrors.companyName = 'Company Name is required';
            hasError = true;
        }
        if (!formData.clientName) {
            newErrors.clientName = 'Client Name is required';
            hasError = true;
        }
        if (!formData.clientPhoneNumber) {
            newErrors.clientPhoneNumber = 'Client Phone Number is required';
            hasError = true;
        }
        if (!formData.clientEmail) {
            newErrors.clientEmail = 'Client Email is required';
            hasError = true;
        }
        if (!formData.clientGstNumber) {
            newErrors.clientGstNumber = 'Client GST Number is required';
            hasError = true;
        }

        // setErrors(newErrors);

        if (hasError) {
            return;
        }

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('companyName', formData.companyName);
            formDataToSend.append('name', formData.clientName);
            formDataToSend.append('PhoneNumber', formData.clientPhoneNumber);
            formDataToSend.append('email', formData.clientEmail);
            formDataToSend.append('gstNumber', formData.clientGstNumber);

            const storedId = await AsyncStorage.getItem('Id');
            formDataToSend.append('professionalId', storedId || '');

            if (formData.clientGstForm) {
                formDataToSend.append('gstForm', {
                    uri: formData.clientGstForm.uri,
                    type: formData.clientGstForm.type,
                    name: formData.clientGstForm.name,
                } as any);
            }
            if (formData.clientPanCard) {
                formDataToSend.append('pan', {
                    uri: formData.clientPanCard.uri,
                    type: formData.clientPanCard.type,
                    name: formData.clientPanCard.name,
                } as any);
            }

            const token = await AsyncStorage.getItem('authToken');
            const response = await axios.post('http://54.152.49.191:8080/client/saveClient', formDataToSend, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            const textResponse = JSON.stringify(response);
            console.log('Raw response:', textResponse);
            
            let result;
            try {
                result = JSON.parse(textResponse);
                
                console.log('Parsed response:', result);
            } catch (jsonError) {
                console.log("This is my response : ",response);
                console.log("This is my status : ",response.status);
                
            }
console.log(response);
            if (response.status === 201) {
                const result = response.data;
               
                Alert.alert('Client added successfully!', '', [{ text: 'OK', onPress: () => navigation.navigate('Client', { id: result.id }) }]);
            } else {
                throw new Error('Failed to add client');
            }

            setFormData({
                companyName: '',
                clientName: '',
                clientPhoneNumber: '',
                clientEmail: '',
                clientGstNumber: '',
                clientGstForm: null,
                clientPanCard: null,
            });

            onSubmit(formData);

        } catch (error) {
            console.error('Error adding client:', error);
            Alert.alert('Failed to add client. Please try again.');
        }
    };

    const handleUploadGSTPDF = async () => {
        try {
            const results = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });

            const result = results[0];
            handleChange('clientGstForm', result);
            setGstPdfFileName(result.name);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker
            } else {
                console.error('Error picking GST PDF file:', err);
                setErrors(prevErrors => ({
                    ...prevErrors,
                    gstPdfFileName: 'Error picking GST PDF file. Please try again.',
                }));
            }
        }
    };

    const handleUploadPanOrVoterPDF = async () => {
        try {
            const results = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });

            const result = results[0];
            handleChange('clientPanCard', result);
            setPanOrVoterPdfFileName(result.name);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker
            } else {
                console.error('Error picking PAN/Voter PDF file:', err);
                setErrors(prevErrors => ({
                    ...prevErrors,
                    panOrVoterPdfFileName: 'Error picking PAN/Voter PDF file. Please try again.',
                }));
            }
        }
    };
    const handleChanged = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
        validateField(field, value);
      };
      const [errors, setErrors] = useState({
        companyName: '',
        clientName: '',
        clientPhoneNumber: '',
        clientEmail: '',
        clientGstNumber: '',
        gstPdfFileName: '',
        panOrVoterPdfFileName: '',
      });
      const validateField = (field: string, value: string) => {
        switch (field) {
          case 'companyName':
            setErrors((prevErrors) => ({
              ...prevErrors,
              companyName: !value.trim() ? 'Company Name is required' : '',
            }));
            break;
          case 'clientName':
            setErrors((prevErrors) => ({
              ...prevErrors,
              clientName: !value.trim() ? 'Client Name is required' : '',
            }));
            break;
          case 'clientPhoneNumber':
            const phoneRegex = /^[0-9]{0,10}$/;
            setErrors((prevErrors) => ({
              ...prevErrors,
              clientPhoneNumber: !phoneRegex.test(value) ? 'Invalid phone number' : '',
            }));
            break;
          case 'clientEmail':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setErrors((prevErrors) => ({
              ...prevErrors,
              clientEmail: !emailRegex.test(value) ? 'Invalid email address' : '',
            }));
            break;
          case 'clientGstNumber':
            setErrors((prevErrors) => ({
              ...prevErrors,
              clientGstNumber: !value.trim() ? 'Client GST Number is required' : '',
            }));
            break;
          default:
            break;
        }
      };
      const handleUploadFile = async (fileType: 'gst' | 'pan') => {
        try {
          const result = await DocumentPicker.pickSingle({
            type: [DocumentPicker.types.pdf], // Adjust types if necessary
          });
    
          if (result && result.size && result.size > 5 * 1024 * 1024) { // 5MB in bytes
            Alert.alert('File Size Exceeded', 'The file size exceeds the 5MB limit.');
            return;
          }
    
          // If file size is okay, update the formData and errors
          if (fileType === 'gst') {
            setFormData((prevData) => ({
              ...prevData,
              clientGstForm: result,
            }));
            setErrors((prevErrors) => ({
              ...prevErrors,
              gstPdfFileName: '',
            }));
          } else {
            setFormData((prevData) => ({
              ...prevData,
              clientPanCard: result,
            }));
            setErrors((prevErrors) => ({
              ...prevErrors,
              panOrVoterPdfFileName: '',
            }));
          }
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
            console.log('User cancelled the picker');
          } else {
            console.error('Unknown error: ', err);
          }
        }
      };
    return (
        <View style={styles.formContainer}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%', height: 400 }}>
            <RoundInput
        placeholder="Company Name"
        value={formData.companyName}
        onChangeText={(value) => handleChanged('companyName', value)}
        label=""
        editable
        error={errors.companyName}
        options={[]}
      />
      <RoundInput
        placeholder="Client Name"
        value={formData.clientName}
        onChangeText={(value) => handleChanged('clientName', value)}
        label=""
        editable
        error={errors.clientName}
        options={[]}
      />
      <RoundInput
        placeholder="Client Phone Number"
        value={formData.clientPhoneNumber}
        onChangeText={(value) => handleChanged('clientPhoneNumber', value)}
        label=""
        editable
        error={errors.clientPhoneNumber}
        options={[]}
      />
      <RoundInput
        placeholder="Client Email Id"
        value={formData.clientEmail}
        onChangeText={(value) => handleChanged('clientEmail', value)}
        label=""
        editable
        error={errors.clientEmail}
        options={[]}
      />
      <RoundInput
        placeholder="Client GST Number"
        value={formData.clientGstNumber}
        onChangeText={(value) => handleChanged('clientGstNumber', value)}
        label=""
        editable
        error={errors.clientGstNumber}
        options={[]}
      />
        <FileUploadInput
        label="Client GST Form"
        uploadText="Upload Client GST Form"
        onPress={() => handleUploadFile('gst')}
        file={formData.clientGstForm}
        pdfFile={formData.clientGstForm}
        pdfFileName={errors.gstPdfFileName}
        errorMessage={errors.gstPdfFileName}
        title={errors.gstPdfFileName || 'No file selected'}
        onUpload={(file: any) => handleUploadFile('gst')}
      />
      <FileUploadInput
        label="Client Pan Card"
        uploadText="Upload Client Pan Card"
        onPress={() => handleUploadFile('pan')}
        file={formData.clientPanCard}
        pdfFile={formData.clientPanCard}
        pdfFileName={errors.panOrVoterPdfFileName}
        errorMessage={errors.panOrVoterPdfFileName}
        title={errors.panOrVoterPdfFileName || 'No file selected'}
        onUpload={(file: any) => handleUploadFile('pan')}
      />
            </ScrollView>
            <RoundButton
                title="Submit"
                onPress={handleSubmit}
            />
        </View>
    );
};



const styles = StyleSheet.create({
    formContainer: {
        width: '100%',
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
});

export default AddClientForm;
