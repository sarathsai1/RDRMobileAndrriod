import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Alert, Text, TouchableOpacity, Image } from 'react-native';
import RoundInput from '../../../components/inputs/RoundInput';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs'; // Ensure this is installed
import FileViewer from 'react-native-file-viewer'; // Ensure this is installed
import { theme } from '../../../theme';
import RoundButton from '../../../components/buttons/RoundButton';

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
    const fetchEmployeeData = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const employeeId = await AsyncStorage.getItem('employeeId');
        
        if (!token || !employeeId) {
          throw new Error("Token or ID is missing");
        }

        const response = await fetch(`http://54.152.49.191:8080/employee/getEmployeeById/${employeeId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setEmployee(data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
        Alert.alert('Error', 'There was an error fetching the employee data.');
      }
    };

    fetchEmployeeData();
  }, []);

  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        throw new Error("Token is missing");
      }

      const response = await axios.put('http://54.152.49.191:8080/employee/save', employee, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      Alert.alert('Success', 'Employee data updated successfully');
    } catch (error) {
      console.error('Failed to update employee data:', error);
      Alert.alert('Error', 'Failed to update employee data');
    }
  };

  const downloadAndOpenFile = async (url: string | undefined, fileName: string) => {
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
  

  const handleInputChange = (field: keyof Employee, value: string) => {
    setEmployee(prevState => ({ ...prevState, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }}>
        <Text style={styles.label}>Employee Name</Text>
        <RoundInput
          placeholder="Employee Name"
          value={employee.name}
          editable={false}
          onChangeText={(text: string) => handleInputChange('name', text)} label={''} error={''} options={[]}        />

        <Text style={styles.label}>Company Email</Text>
        <RoundInput
          placeholder="Company Email"
          value={employee.companyEmail}
          editable={false}
          onChangeText={(text: string) => handleInputChange('companyEmail', text)} label={''} error={''} options={[]}        />

        <Text style={styles.label}>Personal Email</Text>
        <RoundInput
          placeholder="Personal Email"
          value={employee.personalEmailId}
          editable={true}
          onChangeText={(text: string) => handleInputChange('personalEmailId', text)} label={''} error={''} options={[]}        />

        <Text style={styles.label}>Phone Number</Text>
        <RoundInput
          placeholder="Phone Number"
          value={employee.phoneNumber}
          editable={true}
          onChangeText={(text: string) => handleInputChange('phoneNumber', text)} label={''} error={''} options={[]}        />

        <Text style={styles.label}>Address</Text>
        <RoundInput
          placeholder="Address"
          value={employee.address}
          editable={false}
          onChangeText={(text: string) => handleInputChange('address', text)} label={''} error={''} options={[]}        />

        <Text style={styles.label}>City</Text>
        <RoundInput
          placeholder="City"
          value={employee.city}
          editable={false}
          onChangeText={(text: string) => handleInputChange('city', text)} label={''} error={''} options={[]}        />

        <Text style={styles.label}>Country</Text>
        <RoundInput
          placeholder="Country"
          value={employee.country}
          editable={false}
          onChangeText={(text: string) => handleInputChange('country', text)} label={''} error={''} options={[]}        />

        <Text style={styles.label}>Pin Code</Text>
        <RoundInput
          placeholder="Pin Code"
          value={employee.zipCode}
          editable={false}
          onChangeText={(text: string) => handleInputChange('zipCode', text)} label={''} error={''} options={[]}        />

        <Text style={styles.label}>Expertise</Text>
        <RoundInput
          placeholder="Expertise"
          value={employee.expertise}
          editable={false}
          onChangeText={(text: string) => handleInputChange('expertise', text)} label={''} error={''} options={[]}        />

        <Text style={styles.label}>Role</Text>
        <RoundInput
          placeholder="Role"
          value={employee.role}
          editable={false}
          onChangeText={(text: string) => handleInputChange('role', text)} label={''} error={''} options={[]}        />

        <Text style={styles.label}>Aadhar Card Front</Text>
        {employee.aadharFrontDocumentUrl ? (
          <TouchableOpacity onPress={() => downloadAndOpenFile(employee.aadharFrontDocumentUrl, 'aadharFrontDocument.pdf')}>
            <View style={styles.fileRow}>
              <Text style={styles.fileName}>Aadhar Card Front</Text>
              <Image source={require('../../../assets/icons/pdf.png')} style={styles.icon} />
            </View>
          </TouchableOpacity>
        ) : (
          <Text>No file available</Text>
        )}

        <Text style={styles.label}>Aadhar Card Back</Text>
        {employee.aadharBackDocumentUrl ? (
          <TouchableOpacity onPress={() => downloadAndOpenFile(employee.aadharBackDocumentUrl, 'aadharBackDocument.pdf')}>
            <View style={styles.fileRow}>
              <Text style={styles.fileName}>Aadhar Card Back</Text>
              <Image source={require('../../../assets/icons/pdf.png')} style={styles.icon} />
            </View>
          </TouchableOpacity>
        ) : (
          <Text>No file available</Text>
        )}

        <Text style={styles.label}>PAN Card</Text>
        {employee.panCardDocumentUrl ? (
          <TouchableOpacity onPress={() => downloadAndOpenFile(employee.panCardDocumentUrl, 'panCardDocument.pdf')}>
            <View style={styles.fileRow}>
              <Text style={styles.fileName}>PAN Card</Text>
              <Image source={require('../../../assets/icons/pdf.png')} style={styles.icon} />
            </View>
          </TouchableOpacity>
        ) : (
          <Text>No file available</Text>
        )}

        {/* <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update Employee</Text>
        </TouchableOpacity> */}
        <RoundButton
                title={'Update Employee'}
                onPress={handleUpdate}
            />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  fileName: {
    fontSize: 14,
    color: '#007BFF',
  },
  button: {
    backgroundColor: theme.colors.background,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditEmployeeScreen;
