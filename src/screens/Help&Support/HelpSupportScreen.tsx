import React, { useState } from "react";
import BackGround from "../../components/BackGround";
import { StyleSheet, View } from "react-native";
import defaults from "../../styles/defaults";
import NavigationBar from "./Components/NavigationBar";
import FAQ from "./Components/FAQ";
import ContactUs from "./Components/ContactUs";
import useTabletStyle from "../../styles/TabStyles";

const HelpSupportScreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState('FAQ');

    const { isTablet, orientation, tabletStyle } = useTabletStyle();

    const faqList = [
        {
            question: 'What is refund policy?',
            answer: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
            question: 'How can I cancel  My Membership?',
            answer: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
            question: 'How do i reset my password if i forget?',
            answer: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        }
    ];

    const contactList = [
        {
            question: 'Customer Service',
            answer: "rdrexample@gmail.com",
        },
        {
            question: 'WhatsApp',
            answer: "+91 899999586",
        },
    ]

    const handleTabPress = (tabName: string) => {
        setActiveTab(tabName); // Update the active tab state
    };


    return (
        <BackGround safeArea={true} style={defaults.flex}>
            <View style={styles.container}>
                <NavigationBar onTabPress={handleTabPress} />

                <View style={isTablet && orientation === 'horizontal' ? { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-start', } : {}}>
                    {activeTab === 'FAQ' && faqList.map((item, index) => (
                        <View key={index} style={isTablet && orientation === 'horizontal' ? { width: '48%', margin: '0.5%' } : {}}>
                            <FAQ key={index} question={item.question} answer={item.answer} />
                        </View>
                    ))}
                </View>

                <View style={isTablet && orientation === 'horizontal' ? { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-start', } : {}}>
                    {activeTab === 'Contact' && contactList.map((item, index) => (
                        <View key={index} style={isTablet && orientation === 'horizontal' ? { width: '48%', margin: '0.5%' } : {}}>
                            <ContactUs key={index} question={item.question} answer={item.answer} />
                        </View>
                    ))}
                </View>


            </View>
        </BackGround>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default HelpSupportScreen;