import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Alert, Text } from 'react-native';
import RoundInput from '../../../components/inputs/RoundInput';
import RoundButton from '../../../components/buttons/RoundButton';
import FileUploadInput from '../../../components/inputs/FileUploadInput';
import DocumentPicker from 'react-native-document-picker';
import { authAccessTonken } from '../../../services/Token';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddEmployeeForm = ({ onSubmit }: { onSubmit: () => void }) => {
    const navigation = useNavigation<any>();
    const [employeeName, setEmployeeName] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [personalEmail, setPersonalEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [expertise, setExpertise] = useState('');
    const [role, setRole] = useState('');
    const [adharCardFrontFile, setAdharCardFrontFile] = useState<any>(null);
    const [adharCardBackFile, setAdharCardBackFile] = useState<any>(null);
    const [panCardFile, setPanCardFile] = useState<any>(null);

    const [errors, setErrors] = useState({
        employeeName: '',
        companyEmail: '',
        personalEmail: '',
        phoneNumber: '',
        address: '',
        city: '',
        country: '',
        pinCode: '',
        expertise: '',
        role: '',
        adharCardFront: '',
        adharCardBack: '',
        panCard: '',
    });

    const handleChange = (key: string, value: string) => {
        switch (key) {
            case 'employeeName':
                setEmployeeName(value);
                break;
            case 'companyEmail':
                setCompanyEmail(value);
                break;
            case 'personalEmail':
                setPersonalEmail(value);
                break;
            case 'phoneNumber':
                setPhoneNumber(value);
                break;
            case 'address':
                setAddress(value);
                break;
            case 'city':
                setCity(value);
                break;
            case 'country':
                setCountry(value);
                break;
            case 'pinCode':
                setPinCode(value);
                break;
            case 'expertise':
                setExpertise(value);
                break;
            case 'role':
                setRole(value);
                break;
            default:
                break;
        }
    };

    const validateFileType = (file: any) => {
        const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg'];
        return allowedTypes.includes(file.type);
    };

    const handleFileUpload = async (setFile: any, setError: any) => {
        try {
            const results = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
            });

            const file = results[0];

            if (!validateFileType(file)) {
                setError('Invalid file type. Only PDF, PNG, JPEG are allowed.');
                return;
            }

            setFile(file);
            setError(''); // Clear any previous error
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker
            } else {
                // Handle other errors
                throw err;
            }
        }
    };

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePhoneNumber = (number: string) => {
        const re = /^\d{10}$/;
        return re.test(number);
    };

    const validatePinCode = (code: string) => {
        const re = /^\d{6}$/;
        return re.test(code);
    };

    const validateForm = () => {
        let newErrors = { ...errors };
        let hasError = false;

        if (!employeeName) {
            newErrors.employeeName = 'Employee name is required.';
            hasError = true;
        } else {
            newErrors.employeeName = '';
        }

        if (!companyEmail || !validateEmail(companyEmail)) {
            newErrors.companyEmail = 'Valid company email is required.';
            hasError = true;
        } else {
            newErrors.companyEmail = '';
        }

        if (!personalEmail || !validateEmail(personalEmail)) {
            newErrors.personalEmail = 'Valid personal email is required.';
            hasError = true;
        } else {
            newErrors.personalEmail = '';
        }

        // if (!phoneNumber || !validatePhoneNumber(phoneNumber)) {
        //     newErrors.phoneNumber = 'Valid phone number is required.';
        //     hasError = true;
        // } else {
        //     newErrors.phoneNumber = '';
        // }

        if (!address) {
            newErrors.address = 'Address is required.';
            hasError = true;
        } else {
            newErrors.address = '';
        }

        if (!city) {
            newErrors.city = 'City is required.';
            hasError = true;
        } else {
            newErrors.city = '';
        }

        if (!country) {
            newErrors.country = 'Country is required.';
            hasError = true;
        } else {
            newErrors.country = '';
        }

        if (!pinCode || !validatePinCode(pinCode)) {
            newErrors.pinCode = 'Valid pin code is required.';
            hasError = true;
        } else {
            newErrors.pinCode = '';
        }

        if (!expertise) {
            newErrors.expertise = 'Expertise is required.';
            hasError = true;
        } else {
            newErrors.expertise = '';
        }

        if (!role) {
            newErrors.role = 'Role is required.';
            hasError = true;
        } else {
            newErrors.role = '';
        }

        setErrors(newErrors);
        return !hasError;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            const formData = new FormData();
            formData.append('name', employeeName);
            // console.log("employeename",employeeName);
            formData.append('emailId', personalEmail);
            formData.append('companyEmail',companyEmail);
            formData.append('phoneNumber', phoneNumber);
            formData.append('address', address);
            formData.append('city', city);
            formData.append('country', country);
            formData.append('zipCode', pinCode);
            formData.append('expertise', expertise);
            formData.append('designation', role);
            formData.append('professionalId', 1);

            if (adharCardFrontFile) {
                formData.append('adharFront', {
                    uri: adharCardFrontFile.uri,
                    type: adharCardFrontFile.type,
                    name: adharCardFrontFile.name,
                });
            }

            if (adharCardBackFile) {
                formData.append('adharBack', {
                    uri: adharCardBackFile.uri,
                    type: adharCardBackFile.type,
                    name: adharCardBackFile.name,
                });
            }

            if (panCardFile) {
                formData.append('employeePan', {
                    uri: panCardFile.uri,
                    type: panCardFile.type,
                    name: panCardFile.name,
                });
            }

            try {
                const token = await AsyncStorage.getItem('authToken');
                const response = await fetch('http://54.152.49.191:8080/employee/save', {
                    method: 'POST',
                    body:formData,
                    headers: {
                        'Authorization': `Bearer ${authAccessTonken}`,
                        'content-Type': 'multipart/form-data',
                    },
                });
                console.log("my backend response",response);
                console.log("This is my formdata : ",{
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': `Bearer ${authAccessTonken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log("formdata",formData);
                const textResponse = await response.text();
                // console.log('Raw response:', textResponse);
        
                let result;
                try {
                    result = JSON.parse(textResponse);
                    
                    console.log('Parsed response:', result);
                } catch (jsonError) {
                    console.log("This is my response : ",response);
                    console.log("This is my status : ",response.status);
                    
                }
        console.log("This is my response Backend : ",response);
        console.log("This is my status : ",response.status);
                if (response.status==200) {
                    console.log("Add Employee successful:", result);
                    Alert.alert('Success', 'Add Employee  successful', [{ text: 'OK', onPress: () => navigation.navigate('',) }]);
    
                  
                   
                } 
            } catch (error) {
                console.error('Error:', error);
                Alert.alert('Error', 'Failed to register');
            }
        
    };
    };
    return (
        <View style={styles.formContainer}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%', height: 400 }}>
                <RoundInput
                    placeholder="Employee Name"
                    value={employeeName}
                    onChangeText={(value) => handleChange('employeeName', value)}
                    errorMessage={errors.employeeName} label={''} editable={false} error={''} options={[]}                />

                <RoundInput
                    placeholder="Employee Company email"
                    value={companyEmail}
                    onChangeText={(value) => handleChange('companyEmail', value)}
                    errorMessage={errors.companyEmail} label={''} editable={false} error={''} options={[]}                />

                <RoundInput
                    placeholder="Employee Personal email"
                    value={personalEmail}
                    onChangeText={(value) => handleChange('personalEmail', value)}
                    errorMessage={errors.personalEmail} label={''} editable={false} error={''} options={[]}                />

                <RoundInput
                    placeholder="Employee Phone Number"
                    value={phoneNumber}
                    onChangeText={(value) => handleChange('phoneNumber', value)}
                    errorMessage={errors.phoneNumber} label={''} editable={false} error={''} options={[]}                />

                <RoundInput
                    placeholder="Employee Address"
                    value={address}
                    onChangeText={(value) => handleChange('address', value)}
                    errorMessage={errors.address} label={''} editable={false} error={''} options={[]}                />

                <RoundInput
                    placeholder="Employee City"
                    value={city}
                    onChangeText={(value) => handleChange('city', value)}
                    errorMessage={errors.city} label={''} editable={false} error={''} options={[]}                />

                <RoundInput
                    placeholder="Employee Country"
                    value={country}
                    onChangeText={(value) => handleChange('country', value)}
                    errorMessage={errors.country} label={''} editable={false} error={''} options={[]}                />

                <RoundInput
                    placeholder="Employee Pin-Code"
                    value={pinCode}
                    onChangeText={(value) => handleChange('pinCode', value)}
                    errorMessage={errors.pinCode} label={''} editable={false} error={''} options={[]}                />

                <FileUploadInput
                    uploadText='Upload Adhar Card Front'
                    onPress={() => handleFileUpload(setAdharCardFrontFile, (error: any) => setErrors({ ...errors, adharCardFront: error }))}
                    errorMessage={errors.adharCardFront} title={''} file={null} onUpload={function (): Promise<void> {
                        throw new Error('Function not implemented.');
                    } }                />
                {adharCardFrontFile && <Text style={styles.fileName}>{adharCardFrontFile.name}</Text>}

                <FileUploadInput
                    uploadText='Upload Adhar Card Back'
                    onPress={() => handleFileUpload(setAdharCardBackFile, (error: any) => setErrors({ ...errors, adharCardBack: error }))}
                    errorMessage={errors.adharCardBack} title={''} file={null} onUpload={function (): Promise<void> {
                        throw new Error('Function not implemented.');
                    } }                />
                {adharCardBackFile && <Text style={styles.fileName}>{adharCardBackFile.name}</Text>}

                <FileUploadInput
                    uploadText='Upload Pan Card'
                    onPress={() => handleFileUpload(setPanCardFile, (error: any) => setErrors({ ...errors, panCard: error }))}
                    errorMessage={errors.panCard} title={''} file={null} onUpload={function (): Promise<void> {
                        throw new Error('Function not implemented.');
                    } }                />
                {panCardFile && <Text style={styles.fileName}>{panCardFile.name}</Text>}

                <RoundInput
                    placeholder="Employee Expertise"
                    value={expertise}
                    onChangeText={(value) => handleChange('expertise', value)}
                    errorMessage={errors.expertise} label={''} editable={false} error={''} options={[]}                />

                <RoundInput
                    placeholder="Employee Role"
                    value={role}
                    onChangeText={(value) => handleChange('role', value)}
                    errorMessage={errors.role} label={''} editable={false} error={''} options={[]}                />
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
    fileName: {
        marginTop: 5,
        marginBottom: 15,
        color: 'gray',
        fontSize: 12,
    },
});

export default AddEmployeeForm;
