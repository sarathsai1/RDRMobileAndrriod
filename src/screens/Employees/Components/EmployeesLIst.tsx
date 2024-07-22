import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { theme } from "../../../theme";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import { authAccessTonken } from "../../../services/Token";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface EmployeesListProps {
    id: number; // Added ID prop for identifying which employee to delete
    name: string;
    phoneNumber: string;
    expertise: string;
}

const EmployeesList: React.FC<EmployeesListProps> = ({ id, name, phoneNumber, expertise }) => {
    const navigation = useNavigation<any>();

    // Function to handle the delete action
    const handleDelete = async () => {
        const employeeId = await AsyncStorage.getItem('employeeId');
        const token = await AsyncStorage.getItem('authToken');
        axios.delete(`http://54.152.49.191:8080/employee/${employeeId}`,{
headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },

        })
            .then(response => {
                console.log("Employee deleted successfully:", response.data);
                // Optionally, you might want to update the list or show a success message here
                Alert.alert("Success", "Employee deleted successfully.");
            })
            .catch(error => {
                console.error("Error deleting employee:", error);
                Alert.alert("Error", "Failed to delete employee.");
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.cardContent}>
                <View style={styles.cardInnerContent}>
                    <View style={styles.employeesText}>
                        <Text>Name: <Text style={styles.nameOfTitle}>{name}</Text></Text>
                        <Text>Phone No: <Text style={styles.nameOfTitle}>{phoneNumber}</Text></Text>
                        <Text>Expertise: <Text style={styles.nameOfTitle}>{expertise}</Text></Text>
                    </View>

                    <View style={styles.divideLine}></View>

                    <View>
                        <View style={styles.sideIcons}>
                            <TouchableOpacity onPress={() => { navigation.navigate("EditEmployee") }}>
                                <Image
                                    source={require('../../../assets/icons/edit.png')}
                                    style={{ width: 30, height: 30 }}
                                />
                            </TouchableOpacity>
                            <Text>Edit</Text>
                        </View>

                        <View style={styles.sideIcons}>
                            <TouchableOpacity onPress={handleDelete}>
                                <Image
                                    source={require('../../../assets/icons/remove.png')}
                                    style={{ width: 30, height: 30 }}
                                />
                            </TouchableOpacity>
                            <Text>Remove</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardContent: {
        backgroundColor: theme.colors.secondary,
        borderRadius: 25,
        marginVertical: 10,
        position: 'relative',
        padding: 20,
    },
    cardInnerContent: {
        flexDirection: 'row',
    },
    employeesText: {
        width: '80%',
        justifyContent: 'space-around'
    },
    divideLine: {
        padding: 1.5,
        marginRight: 15,
        backgroundColor: '#E7E8EB',
    },
    sideIcons: {
        alignItems: 'center',
        marginVertical: 5,
    },
    nameOfTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: theme.colors.text,
    }
});

export default EmployeesList;
