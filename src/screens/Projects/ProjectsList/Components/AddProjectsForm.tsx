


import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import RoundInput from '../../../../components/inputs/RoundInput';
import RoundButton from '../../../../components/buttons/RoundButton';
import MultiSelectDropDown from '../../../../components/inputs/MultiSelectDropDown';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../../../../theme';

// Define a type for the form data
export type FormData = {
    professionalId: string;
    clientId: string;
    name: string;
    natureOfWork: string;
    estimatedStartDate: string;
    estimatedEndDate: string;
    totalProjectAmount: number;
    amountPaid: number;
    roles: { roleId: number; employeeIds: number[] }[];
};

const AddProjectsForm = ({ onSubmit }: { onSubmit: (formData: FormData) => void }) => {
    const [formData, setFormData] = useState<FormData>({
        professionalId: '',
        clientId: '',
        name: '',
        natureOfWork: '',
        estimatedStartDate: moment().format('YYYY-MM-DD'),
        estimatedEndDate: moment().format('YYYY-MM-DD'),
        totalProjectAmount: 0,
        amountPaid: 0,
        roles: [
            { roleId: 1, employeeIds: [] }, // POC role
            { roleId: 2, employeeIds: [] }  // Assistant role
        ]
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
    const [openEndDatePicker, setOpenEndDatePicker] = useState(false);
    const [clients, setClients] = useState<{ id: string; name: string }[]>([]);
    const [employees, setEmployees] = useState<{ id: number; name: string }[]>([]);

    useEffect(() => {
        const fetchProfessionalId = async () => {
            try {
                const id = await AsyncStorage.getItem('Id');
                if (id) {
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        professionalId: id
                    }));
                }
            } catch (error) {
                console.error('Failed to fetch professional ID', error);
            }
        };

        fetchProfessionalId();
    }, []);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                if (!token) {
                    throw new Error("Token is missing");
                }
                const response = await fetch(`http://54.152.49.191:8080/client/getAllClientNames/${formData.professionalId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setClients(data.map((client: any) => ({
                    id: client.id,
                    name: client.name
                })));
            } catch (error) {
                console.error('Failed to fetch client names', error);
            }
        };

        if (formData.professionalId) {
            fetchClients();
        }
    }, [formData.professionalId]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                if (!token) {
                    throw new Error("Token is missing");
                }
                const response = await fetch(`http://54.152.49.191:8080/employee/getEmployeeListBy/${formData.professionalId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setEmployees(data.map((employee: any) => ({
                    id: employee.id,
                    name: employee.name
                })));
            } catch (error) {
                console.error('Failed to fetch employee list', error);
            }
        };

        if (formData.professionalId) {
            fetchEmployees();
        }
    }, [formData.professionalId]);

    const handleChange = (name: keyof FormData, value: any) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        const validationErrors: { [key: string]: string } = {};
        if (!formData.clientId) validationErrors.clientId = 'Client is required';
        // Add more validation checks as needed
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const token = await AsyncStorage.getItem('authToken');
                if (!token) {
                    throw new Error("Token is missing");
                }

                const response = await fetch('http://54.152.49.191:8080/project/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                });
console.log(response);
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
 else if (response.status === 200) {
    Alert.alert("Successfully Added project", response.statusText)
 }
                const responseData = await response.json();
                console.log('Success:', responseData);
                // You can handle the response as needed
console.log(formData);
                // Reset the form
                setFormData({
                    professionalId: '',
                    clientId: '',
                    name: '',
                    natureOfWork: '',
                    estimatedStartDate: moment().format('YYYY-MM-DD'),
                    estimatedEndDate: moment().format('YYYY-MM-DD'),
                    totalProjectAmount: 0,
                    amountPaid: 0,
                    roles: [
                        { roleId: 1, employeeIds: [] }, // POC role
                        { roleId: 2, employeeIds: [] }  // Assistant role
                    ]
                });
            } catch (error) {
                console.error('Failed to submit project data', error);
            }
        }
    };

    const handleRoleSelection = (roleId: number, selectedItems: string[]) => {
        const selectedEmployeeIds = selectedItems.map(name => {
            const employee = employees.find(emp => emp.name === name);
            return employee ? employee.id : null;
        }).filter(id => id !== null) as number[];

        setFormData(prevFormData => ({
            ...prevFormData,
            roles: prevFormData.roles.map(role => role.roleId === roleId ? { ...role, employeeIds: selectedEmployeeIds } : role)
        }));
    };
    
    return (
        <View style={styles.formContainer}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%', height: 400 }}>
                <Text style={styles.label}>Client Name</Text>
                <View style={styles.dropdownContainer}>
                    <Picker
                        selectedValue={formData.clientId}
                        onValueChange={(itemValue) => {
                            const selectedClient = clients.find(client => client.id === itemValue);
                            handleChange('clientId', itemValue);
                            handleChange('name', selectedClient ? selectedClient.name : '');
                        }}
                        style={styles.dropdown}
                    >
                        <Picker.Item label="Select Client" value="" />
                        {clients.map(client => (
                            <Picker.Item key={client.id} label={client.name} value={client.id} />
                        ))}
                    </Picker>
                    {errors.clientId ? <Text style={styles.errorText}>{errors.clientId}</Text> : null}
                </View>

                <Text style={styles.label}>Work Nature</Text>
                <RoundInput
                    placeholder="Work Nature"
                    value={formData.natureOfWork}
                    onChangeText={(value) => handleChange('natureOfWork', value)}
                    label={''}
                    editable={true}
                    error={errors.workNature} options={[]}                />

                <TouchableOpacity onPress={() => setOpenStartDatePicker(true)}>
                    <RoundInput
                        style={styles.dateInput}
                        placeholder="Estimated Start Date"
                        value={moment(formData.estimatedStartDate).format('DD/MM/YYYY')}
                        label="Estimated Start Date"
                        editable={false}
                        error={errors.estimatedStartDate}
                        onChangeText={() => { } } // No-op
                        options={[]}                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setOpenEndDatePicker(true)}>
                    <RoundInput
                        style={styles.dateInput}
                        placeholder="Estimated End Date"
                        value={moment(formData.estimatedEndDate).format('DD/MM/YYYY')}
                        label="Estimated End Date"
                        editable={false}
                        error={errors.estimatedEndDate}
                        onChangeText={() => { } } // No-op
                        options={[]}                    />
                </TouchableOpacity>

                <DatePicker
                    modal
                    open={openStartDatePicker}
                    date={new Date(formData.estimatedStartDate)}
                    onConfirm={(date) => {
                        setOpenStartDatePicker(true);
                        handleChange('estimatedStartDate', moment(date).format('YYYY-MM-DD'));
                    }}
                    onCancel={() => setOpenStartDatePicker(true)}
                />

                <DatePicker
                    modal
                    open={openEndDatePicker}
                    date={new Date(formData.estimatedEndDate)}
                    onConfirm={(date) => {
                        setOpenEndDatePicker(true);
                        handleChange('estimatedEndDate', moment(date).format('YYYY-MM-DD'));
                    }}
                    onCancel={() => setOpenEndDatePicker(true)}
                />

                <RoundInput
                    placeholder="Total Project Amount"
                    value={formData.totalProjectAmount.toString()}
                    onChangeText={(value) => handleChange('totalProjectAmount', Number(value))}
                    label="Total Project Amount"
                    editable={true}
                    error={errors.totalProjectAmount} options={[]}                />

                <RoundInput
                    placeholder="Amount Paid"
                    value={formData.amountPaid.toString()}
                    onChangeText={(value) => handleChange('amountPaid', Number(value))}
                    label="Amount Paid"
                    editable={true}
                    error={errors.amountPaid} options={[]}                />

                <MultiSelectDropDown
                    data={employees.map(emp => emp.name)}
                    label={'POC'}
                    onSelectionChange={(selectedItems: string[]) => handleRoleSelection(1, selectedItems)}
                    selectedItems={formData.roles.find(role => role.roleId === 1)?.employeeIds.map(id => employees.find(emp => emp.id === id)?.name || '') || []}
                />

                <MultiSelectDropDown
                    data={employees.map(emp => emp.name)}
                    label={'Assistant'}
                    onSelectionChange={(selectedItems: string[]) => handleRoleSelection(2, selectedItems)}
                    selectedItems={formData.roles.find(role => role.roleId === 2)?.employeeIds.map(id => employees.find(emp => emp.id === id)?.name || '') || []}
                />

                <RoundButton
                    title={'Submit'}
                    onPress={handleSubmit}
                />
            </ScrollView>
        </View>
    );
};

// Component styles
const styles = StyleSheet.create({
    formContainer: {
        width: '100%',
        padding: 10,
    },
    dropdownContainer: {
        marginVertical: 4,
        borderWidth: 1.5,
        borderColor: "black",
        borderRadius: 20,
        paddingHorizontal: 10,
        backgroundColor: theme.colors.background,
        width: '100%',
    },
    dropdown: {
        height: 50,
        width: '100%',
        borderColor: theme.colors.primary,
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 10,
        color: theme.colors.text,
    },
    dateInput: {
        marginVertical: 3,
        
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: theme.colors.textSecondary,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
    },
});

export default AddProjectsForm;
