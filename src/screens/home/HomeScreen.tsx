import React, { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import WelcomeBackHeader from "./components/WelcomeBackHeader";
import DashboardStats from "./components/DashboardStats";
import MenuOptions from "./components/MenuOptions";
import useTabletStyle from "../../styles/TabStyles";
import axios from 'axios';
import { authAccessTonken } from "../../services/Token";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const { isTablet, orientation } = useTabletStyle();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            const api_url = 'http://54.152.49.191:8080/dashboard';
            const response = await axios.get(api_url,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    
                },
            });
            console.log("dashboad api respose need see my status code",response)
            console.log({
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    
                },
            })
            // const responsedata ={
            //     "message": "string",
            //     "statusCode": 400,
            //     "name": "string",
            //     "projectCount": 0,
            //     "clientcount": 0,
            //     "employeeCount": 0,
            //     "subscriptionActive": true,
            //     "accountActive": true
            //   }
            // console.log("dcc",responsedata)
            // console.log(responsedata.statusCode);
            // handleStatusCode(responsedata.statusCode);
            console.log("backend dash board api status Code",response.data.statusCode);
            if (response.data.statusCode===404){
                navigation.navigate('Approval');
            }
            if(response.data.statusCode===200){
                navigation.navigate('Dashboard');
            }
            if(response.data.statusCode===400){
                navigation.navigate('Registration');
            }
            if(response.data.statusCode===420){
                navigation.navigate('Subscription');
            }
            if(response.data.statusCode===207){
                navigation.navigate('EmplyeeDashboard');
            }
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // const handleStatusCode = (statusCode: number) => {
    //     switch (statusCode) {
    //         case 200:
    //             // User allowed, navigate to dashboard
    //             navigation.navigate('Dashboard');
    //             break;
    //         case 400:
    //             // User needs to complete registration
    //             navigation.navigate('Registration');
    //             break;
    //         case 404:
    //             // User needs approval
    //             navigation.navigate('Approval');
    //             break;
    //         case 420:
    //             // User inactive, navigate to subscription page
    //             navigation.navigate('Subscription');
    //             break;
    //         default:
    //             console.warn(`Unhandled status code: ${statusCode}`);
    //             break;
    //     }
    // };

    const menuItems = [
        { id: '1', title: "Projects", navigation: 'Projects' },
        { id: '2', title: "Employee's", navigation: 'Employees' },
        { id: '3', title: "Client's", navigation: 'Clients' },
        { id: '4', title: "Payment Pending's", navigation: 'ClientsDues' },
        { id: '5', title: "Setting's", navigation: 'Settings' },
    ];

    function handleMenuItemPress(title: string, navigation: string): void {
        throw new Error("Function not implemented.");
    }

    return (
        <>
            {isTablet && orientation === 'horizontal' ? (
                <>
                    <View style={styles.container}>
                        <View style={styles.dashboarHeadingContent}>
                            <WelcomeBackHeader userName="Jordan Eagle" />
                        </View>

                        <View style={[styles.dashboarMenuListContent, { flexDirection: 'row' }]}>
                            <View style={{ width: '40%', paddingRight: 10 }}>
                                <DashboardStats />
                            </View>

                            <View style={{ width: '60%', paddingLeft: 10 }}>
                                <FlatList
                                    data={menuItems}
                                    renderItem={({ item }) => (
                                        <MenuOptions title={item.title} onPress={() => handleMenuItemPress(item.title, item.navigation)} />
                                    )}
                                    keyExtractor={(item) => item.id}
                                />
                            </View>

                        </View>
                    </View>
                </>
            ) : (
                <>
                    <View style={styles.container}>
                        <View style={styles.dashboarHeadingContent}>
                            <WelcomeBackHeader userName="Jordan Eagle" />
                            <DashboardStats />
                        </View>


                        <View style={styles.dashboarMenuListContent}>
                            <FlatList
                                data={menuItems}
                                renderItem={({ item }) => (
                                    <MenuOptions title={item.title} onPress={() => navigation.navigate(item.navigation)} />
                                )}
                                keyExtractor={(item) => item.id}
                            />
                        </View>
                    </View>
                </>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D7E5D5',
    },

    dashboarHeadingContent: {
        marginHorizontal: 18
    },
    dashboarMenuListContent: {
        paddingTop: 15,
        paddingHorizontal: 18,
        backgroundColor: 'white',
        height: '100%',
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
    }

});

export default HomeScreen;