import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import BackGround from "../../components/BackGround";
import defaults from "../../styles/defaults";
import RoundButton from "../../components/buttons/RoundButton";
import EmployeesList from "./Components/EmployeesLIst";
import UniversalFormModal from "../../components/UniversalFormModal";
import AddEmployeeForm from "./Components/AddEmployeeForm";
import AddRolesForm from "./Components/AddRolesForm";
import useTabletStyle from "../../styles/TabStyles";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Employee {
    name: string;
    phoneNumber: string;
    expertise: string;
}

const EmployeesScreen: React.FC = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [isRoleModalVisible, setRoleModalVisible] = useState(false);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [professionalId, setProfessionalId] = useState<number | null>(null);
    const { isTablet, orientation } = useTabletStyle();
    const navigation = useNavigation<any>();

    const handleOpenModal = () => setModalVisible(true);
    const handleCloseModal = () => setModalVisible(false);
    const handleOpenRoleModal = () => setRoleModalVisible(true);
    const handleCloseRoleModal = () => setRoleModalVisible(false);

    useEffect(() => {
        const getID = async () => {
            try {
                const storedId = await AsyncStorage.getItem('Id');
                if (storedId !== null) {
                    console.log("AsyncStorage value", storedId);
                    setProfessionalId(JSON.parse(storedId));
                }
            } catch (error) {
                console.error('Error retrieving item from AsyncStorage:', error);
            }
        };

        getID();
    }, []);

    useEffect(() => {
        const fetchEmployees = async () => {
            if (professionalId === null) {
                return;
            }
            try {
                const token = await AsyncStorage.getItem('authToken');
                if (!token) {
                    throw new Error("Token is missing");
                }
                const response = await axios.get(`http://54.152.49.191:8080/employee/getEmployeeListBy/${professionalId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                console.log("Employees fetched successfully:", response.data);
                setEmployees(response.data);
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        };

        fetchEmployees();
    }, [professionalId]);

    const handleFormSubmit = () => {
        // Handle form submission
    };

    return (
        <BackGround safeArea={true} style={defaults.flex}>
            <View style={styles.container}>
                <View style={styles.topContentBtns}>
                    <View>
                        {/* <RoundButton
                            title={'Roles'}
                            onPress={handleOpenRoleModal}
                            style={styles.addRolesWidthButton}
                        /> */}
                    </View>
                    <View>
                        <RoundButton
                            title={'+ Add Employees'}
                            onPress={handleOpenModal}
                            style={styles.addClientWidthButton}
                        />
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={isTablet && orientation === 'horizontal' ? { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-start' } : {}}>
                        {employees.map((item, index) => (
                            <View key={index} style={isTablet && orientation === 'horizontal' ? { width: '49%', margin: '0.5%' } : {}}>
                                <EmployeesList name={item.name} phoneNumber={item.phoneNumber} expertise={item.expertise} id={0} />
                            </View>
                        ))}
                    </View>

                    <UniversalFormModal visible={isModalVisible} onClose={handleCloseModal} titleName={'Add Employee'}>
                        <AddEmployeeForm onSubmit={handleFormSubmit} />
                    </UniversalFormModal>

                    <UniversalFormModal visible={isRoleModalVisible} onClose={handleCloseRoleModal} titleName={'Roles'}>
                        <AddRolesForm onSubmit={handleFormSubmit} />
                    </UniversalFormModal>
                </ScrollView>
            </View>
        </BackGround>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContentBtns: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    addRolesWidthButton: {
        width: '100%',
        alignSelf: 'center',
        paddingHorizontal: 25,
    },
    addClientWidthButton: {
        width: '100%',
        alignSelf: 'center',
        paddingHorizontal: 25,
    },
});

export default EmployeesScreen;
