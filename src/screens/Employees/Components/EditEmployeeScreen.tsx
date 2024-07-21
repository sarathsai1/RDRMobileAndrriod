import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Alert, Text, Button } from 'react-native';
import RoundInput from '../../../components/inputs/RoundInput';
import FileUploadInput from '../../../components/inputs/FileUploadInput';
import axios from 'axios';
import { authAccessTonken } from '../../../services/Token';
import RoundButton from '../../../components/buttons/RoundButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Employee {
  name: string;
  companyEmail: string;
  personalEmailId: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
  expertise: string;
  role: string;
  aadharBackDocumentUrl?: string; 
  aadharFrontDocumentUrl?: string;
  panCardDocumentUrl?: string;
  designation?: string;
}

const EditEmployeeScreen: React.FC = () => {
  const [employee, setEmployee] = useState<Employee>({
    name: "",
    designation: "",
    personalEmailId: "",
    companyEmail: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    expertise: "",
    role: "",
    aadharBackDocumentUrl: "",
    aadharFrontDocumentUrl: "",
    panCardDocumentUrl: "",
  });

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await axios.get<Employee>('http://54.152.49.191:8080/employee/6',{
        headers: {
          'Authorization': `Bearer ${authAccessTonken}`,
        },
      });
      setEmployee(response.data);
    } catch (error) {
      console.error('Failed to fetch employee data:', error);
      Alert.alert('Error', 'Failed to fetch employee data');
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put('http://192.168.43.240:8080/employee/save', employee, {
        headers: {
          'Authorization': `Bearer ${authAccessTonken}`,
        },
      });
      console.log(response);
      Alert.alert('Success', 'Employee data updated successfully');
      
    } catch (error) {
      console.error('Failed to update employee data:', error);
      Alert.alert('Error', 'Failed to update employee data');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }}>
        <Text style={styles.label}>Employee Name</Text>
        <RoundInput
          placeholder="Employee Name"
          value={employee.name}
          editable={false} label={''} error={''} onChangeText={function (text: string): void {
            throw new Error('Function not implemented.');
          } } options={[]}        />
        <Text style={styles.label}>Company Email</Text>
        <RoundInput
          placeholder="Company Email"
          value={employee.companyEmail}
          editable={false} label={''} error={''} onChangeText={function (text: string): void {
            throw new Error('Function not implemented.');
          } } options={[]}        />
        <Text style={styles.label}>Personal Email</Text>
        <RoundInput
          placeholder="Personal Email"
          value={employee.personalEmailId}
          editable={false} label={''} error={''} onChangeText={function (text: string): void {
            throw new Error('Function not implemented.');
          } } options={[]}        />
        <Text style={styles.label}>Phone Number</Text>
        <RoundInput
          placeholder="Phone Number"
          value={employee.phoneNumber}
          editable={false} label={''} error={''} onChangeText={function (text: string): void {
            throw new Error('Function not implemented.');
          } } options={[]}        />
        <Text style={styles.label}>Address</Text>
        <RoundInput
          placeholder="Address"
          value={employee.address}
          editable={false} label={''} error={''} onChangeText={function (text: string): void {
            throw new Error('Function not implemented.');
          } } options={[]}        />
        <Text style={styles.label}>City</Text>
        <RoundInput
          placeholder="City"
          value={employee.city}
          editable={false} label={''} error={''} onChangeText={function (text: string): void {
            throw new Error('Function not implemented.');
          } } options={[]}        />
        <Text style={styles.label}>Country</Text>
        <RoundInput
          placeholder="Country"
          value={employee.country}
          editable={false} label={''} error={''} onChangeText={function (text: string): void {
            throw new Error('Function not implemented.');
          } } options={[]}        />
        <Text style={styles.label}>Pin Code</Text>
        <RoundInput
          placeholder="Pin Code"
          value={employee.zipCode}
          editable={false} label={''} error={''} onChangeText={function (text: string): void {
            throw new Error('Function not implemented.');
          } } options={[]}        />
        <Text style={styles.label}>Expertise</Text>
        <RoundInput
          placeholder="Expertise"
          value={employee.expertise}
          editable={false} label={''} error={''} onChangeText={function (text: string): void {
            throw new Error('Function not implemented.');
          } } options={[]}        />
        <Text style={styles.label}>Role</Text>
        <RoundInput
          placeholder="Role"
          value={employee.role}
          editable={false} label={''} error={''} onChangeText={function (text: string): void {
            throw new Error('Function not implemented.');
          } } options={[]}        />
        <Text style={styles.label}>Aadhar Card Front</Text>
        <FileUploadInput
          label="Upload Aadhar Card Front"
          pdfFile={employee.aadharFrontDocumentUrl || ''} onPress={function (file: any): void {
            throw new Error('Function not implemented.');
          } } title={''} file={null} onUpload={function (): Promise<void> {
            throw new Error('Function not implemented.');
          } }          
        />
        <Text style={styles.label}>Aadhar Card Back</Text>
        <FileUploadInput
          label="Upload Aadhar Card Back"
          pdfFile={employee.aadharBackDocumentUrl || ''} onPress={function (file: any): void {
            throw new Error('Function not implemented.');
          } } title={''} file={null} onUpload={function (): Promise<void> {
            throw new Error('Function not implemented.');
          } }          
        />
        <Text style={styles.label}>PAN Card</Text>
        <FileUploadInput
          pdfFile={employee.panCardDocumentUrl || ''} onPress={function (file: any): void {
            throw new Error('Function not implemented.');
          } } title={''} file={null} onUpload={function (): Promise<void> {
            throw new Error('Function not implemented.');
          } }         
        />
        <RoundButton title="Update" onPress={handleUpdate} style={styles.fullWidthButton}/>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  fullWidthButton: {
    width: '100%',
    alignSelf: 'center',
},
});

export default EditEmployeeScreen;
