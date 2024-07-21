import React, { useState } from "react";
import BackGround from "../../../components/BackGround";
import { StyleSheet, View } from "react-native";
import defaults from "../../../styles/defaults";
import NavigationBar from "./Components/NavigationBar";
import ActiveCompletedHistory from "./Components/ActiveCompletedHistory";
import useTabletStyle from "../../../styles/TabStyles";
import DeactiveCompletedHistory from "./Components/DeactiveCompletedHistory";

const MyMembershipScreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Active');

    const memberShipHistory = [
        {
            title: 'RDR Priemium',
            startDate: '09 Jan 2024',
            endDate: '09 Jan 2025',
            statusInd: 'active'
        },

        {
            title: 'RDR Priemium',
            startDate: '08 Jan 2022',
            endDate: '08 Jan 2023',
            statusInd: 'deActive'
        },
    ];

    const activeMemberships = memberShipHistory.filter(membership => membership.statusInd === 'active');
    const deActiveMemberships = memberShipHistory.filter(membership => membership.statusInd === 'deActive');

    const { isTablet, orientation, tabletStyle } = useTabletStyle();

    const handleTabPress = (tabName: string) => {
        setActiveTab(tabName); // Update the active tab state
    };


    return (
        <BackGround safeArea={true} style={defaults.flex}>
            <View style={styles.container}>

                {/* <NavigationBar onTabPress={handleTabPress} /> */}

                <View style={isTablet && orientation === 'horizontal' ? { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-start', } : {}}>
                    {activeMemberships.map((item, index) => (
                        <View key={index} style={isTablet && orientation === 'horizontal' ? { width: '48%', margin: '0.5%' } : {}}>
                            <ActiveCompletedHistory key={index} title={item.title} startDate={item.startDate} endDate={item.endDate} statusInd={item.statusInd} />
                        </View>
                    ))}

                    <View style={styles.divideLine}></View>

                    {deActiveMemberships.map((item, index) => (
                        <View key={index} style={isTablet && orientation === 'horizontal' ? { width: '48%', margin: '0.5%' } : {}}>
                            <DeactiveCompletedHistory key={index} title={item.title} startDate={item.startDate} endDate={item.endDate} statusInd={item.statusInd} />
                        </View>
                    ))}
                </View>



                {/* <View style={isTablet && orientation === 'horizontal' ? { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-start', } : {}}>
                    {activeTab === 'Completed' && deActiveMemberships.map((item, index) => (
                        <View key={index} style={isTablet && orientation === 'horizontal' ? { width: '48%', margin: '0.5%' } : {}}>
                            <ActiveCompletedHistory key={index} title={item.title} startDate={item.startDate} endDate={item.endDate} statusInd={item.statusInd} />
                        </View>
                    ))}
                </View> */}

            </View>
        </BackGround>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    divideLine: {
        height: 2,
        backgroundColor: '#8B94B2',
        marginVertical: 15,
        marginHorizontal: 25,
    },
});

export default MyMembershipScreen;