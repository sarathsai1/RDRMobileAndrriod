import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import RoundInput from '../../../../components/inputs/RoundInput';
import RoundButton from '../../../../components/buttons/RoundButton';
import MultiSelectDropDown from '../../../../components/inputs/MultiSelectDropDown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type FormData = {
    name: string[];
    natureOfWork: string;
    estimatedStartDate: string;
    estimatedEndDate: string;
    professionalId: number;
    clientId: number;
    roles: { roleId: number; employeeIds: number[] }[];
    totalProjectAmount: number;
    amountPaid: number;
};

const AddProjectsForm = ({ onSubmit }: { onSubmit: (formData: FormData) => void }) => {
    const [formData, setFormData] = useState<FormData>({
        name: [],
        natureOfWork: '',
        estimatedStartDate: moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        estimatedEndDate: '',
        professionalId: 1, // Replace with actual professional ID
        clientId: 1, // Replace with actual client ID
        roles: [
            { roleId: 1, employeeIds: [1] }, // Replace with actual role ID and employee ID
            { roleId: 2, employeeIds: [1] }, // Replace with actual role ID and employee ID
        ],
        totalProjectAmount: 0,
        amountPaid: 0,
    });

    const [errors, setErrors] = useState<Partial<FormData>>({});

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [currentDateField, setCurrentDateField] = useState<keyof FormData | null>(null);

    const clientEmployees = ['Prasad', 'Ram Charan', 'KGP', 'Shanu']; // Replace with actual data

    const handleChange = (name: keyof FormData, value: string | number | string[]) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const validateFields = () => {
        let valid = true;
        let newErrors: Partial<FormData> = {};

        // if (formData.name.length === 0) {
        //     newErrors.name = 'Client name is required';
        //     valid = false;
        // }
        if (formData.natureOfWork.trim() === '') {
            newErrors.natureOfWork = 'Nature of work is required';
            valid = false;
        }
        if (formData.estimatedStartDate.trim() === '') {
            newErrors.estimatedStartDate = 'Estimated start date is required';
            valid = false;
        }
        if (formData.estimatedEndDate.trim() === '') {
            newErrors.estimatedEndDate = 'Estimated end date is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async () => {
        if (validateFields()) {
            const token = await AsyncStorage.getItem('authToken');
            axios.post('http://54.152.49.191:8080/project/save', formData,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(_response => {
                    Alert.alert('Success', 'Project added successfully');
                    onSubmit(formData);
                    setFormData({
                        name: [],
                        natureOfWork: '',
                        estimatedStartDate: moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
                        estimatedEndDate: '',
                        professionalId: 1,
                        clientId: 1,
                        roles: [
                            { roleId: 1, employeeIds: [1] },
                            { roleId: 2, employeeIds: [1] }
                        ],
                        totalProjectAmount: 0,
                        amountPaid: 0,
                    });
                })
                .catch(error => {
                    Alert.alert('Error', 'An error occurred while adding the project');
                    console.error(error);
                });
        }
    };

    const showDatePicker = (field: keyof FormData) => {
        setCurrentDateField(field);
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        if (currentDateField) {
            const formattedDate = moment(date).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
            handleChange(currentDateField, formattedDate);
        }
        hideDatePicker();
    };

    useEffect(() => {
        const updateDate = () => {
            const formattedDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
            handleChange('estimatedStartDate', formattedDate);
        };

        updateDate();

        const intervalId = setInterval(updateDate, 24 * 60 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <View style={styles.formContainer}>
            <MultiSelectDropDown
                data={clientEmployees}
                label={'Client Name'}
                onSelectionChange={(selectedItems: string[]) => handleChange('name', selectedItems)} selectedItems={[]}            />
            <RoundInput
                placeholder="Nature of Work"
                value={formData.natureOfWork}
                onChangeText={(value) => handleChange('natureOfWork', value)}
                errorMessage={errors.natureOfWork}
                label="Nature of Work"
                editable={true} error={''} options={[]}            />

            <TouchableOpacity onPress={() => showDatePicker('estimatedStartDate')}>
                <View pointerEvents="none">
                    <RoundInput
                        style={styles.dateInput}
                        placeholder="Estimated Start Date"
                        value={moment(formData.estimatedStartDate).format('DD/MM/YYYY')}
                        errorMessage={errors.estimatedStartDate}
                        label="Estimated Start Date"
                        editable={false} error={''} onChangeText={function (text: string): void {
                            throw new Error('Function not implemented.');
                        } } options={[]}                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showDatePicker('estimatedEndDate')}>
                <View pointerEvents="none">
                    <RoundInput
                        style={styles.dateInput}
                        placeholder="Estimated End Date"
                        value={moment(formData.estimatedEndDate).format('DD/MM/YYYY')}
                        errorMessage={errors.estimatedEndDate}
                        label="Estimated End Date"
                        editable={false} error={''} onChangeText={function (text: string): void {
                            throw new Error('Function not implemented.');
                        } } options={[]}                    />
                </View>
            </TouchableOpacity>

            <RoundInput
                placeholder="Total Project Amount"
                value={formData.totalProjectAmount.toString()}
                onChangeText={(value) => handleChange('totalProjectAmount', parseFloat(value))}
                // errorMessage={errors.totalProjectAmount}
                label="Total Project Amount"
                keyboardType="numeric"
                editable={true} error={''} options={[]}            />
            <RoundInput
                placeholder="Amount Paid"
                value={formData.amountPaid.toString()}
                onChangeText={(value) => handleChange('amountPaid', parseFloat(value))}
                // errorMessage={errors.amountPaid}
                label="Amount Paid"
                keyboardType="numeric"
                editable={true} error={''} options={[]}            />

            <RoundButton
                title="Submit"
                onPress={handleSubmit}
            />

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        width: '100%',
    },
    dateInput: {
        flex: 1,
        marginHorizontal: 1,
    },
});

export default AddProjectsForm;
