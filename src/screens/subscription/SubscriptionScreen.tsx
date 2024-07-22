import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import BackGround from '../../components/BackGround';
import defaults from '../../styles/defaults';
import { theme } from '../../theme';
import SubscriptionPlans from './components/Plans';
import RoundButton from '../../components/buttons/RoundButton';
import CouponCode from './components/Coupon';
import { useNavigation } from '@react-navigation/native';
import useTabletStyle from '../../styles/TabStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SubscriptionPlansType = {
    id: string;
    name: string;
    subscriptionDuration: number;
    subscriptionPlanAmount: number;
    description: string[];
};

const SubscriptionScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const [subscriptionOptions, setSubscriptionOptions] = useState<SubscriptionPlansType[]>([]);
    const [planPrice, setPlanPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [planGrandTotalAmount, setPlanGrandTotalAmount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

    const { isTablet, orientation, tabletStyle } = useTabletStyle();

    useEffect(() => {
        const fetchSubscriptionPlans = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                const response = await axios.get('http://54.152.49.191:8080/subscription/getAllPlans', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setSubscriptionOptions(response.data);
            } catch (err) {
                console.error('Error fetching subscription plans:', err);
                setError('Failed to fetch subscription plans');
                Alert.alert('Error', 'Failed to fetch subscription plans');
            } finally {
                setLoading(false);
            }
        };

        fetchSubscriptionPlans();
    }, []);

    const handleSelectionChange = (selectedOption: SubscriptionPlansType) => {
        setSelectedPlanId(selectedOption.id);
        setPlanPrice(selectedOption.subscriptionPlanAmount);
        setPlanGrandTotalAmount(selectedOption.subscriptionPlanAmount - discount);
    };

    const handleDiscountChange = (newDiscount: number) => {
        setDiscount(newDiscount);
        setPlanGrandTotalAmount(planPrice - newDiscount);
    };

    const handleSubscribe = async () => {
        if (!selectedPlanId) {
            Alert.alert('Error', 'Please select a subscription plan');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('authToken');
            const professionalId = await AsyncStorage.getItem('Id'); // Fetch the professional ID from storage

            if (!professionalId) {
                Alert.alert('Error', 'Professional ID not found');
                return;
            }

            const response = await axios.post(
                `http://54.152.49.191:8080/register/professional/addSubscriptionPlan/${professionalId}/${selectedPlanId}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                Alert.alert('Success', 'Subscription plan added successfully');
                navigation.navigate('Home');
            } else {
                Alert.alert('Error', 'Failed to add subscription plan');
            }
        } catch (err) {
            console.error('Error subscribing to plan:', err);
            Alert.alert('Error', 'Failed to add subscription plan');
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <View><Text>{error}</Text></View>;
    }

    return (
        <>
            {isTablet && orientation === 'horizontal' ? (
                <BackGround safeArea={true} style={defaults.flex}>
                    <View style={styles.container}>
                        <View style={styles.headerContent}>
                            <Text style={styles.title}>Subscription</Text>
                            <Text style={styles.subtitle}>
                                To complete the registration process, please make the payment
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', height: '100%' }}>
                            <View style={{ width: '48%', marginRight: 10 }}>
                                <SubscriptionPlans options={subscriptionOptions} onSelectionChange={handleSelectionChange} />
                            </View>

                            <View style={{ width: '48%', marginLeft: 10 }}>
                                <View style={styles.couponContent}>
                                    <CouponCode title={''} onDiscountChange={handleDiscountChange} />

                                    <View style={styles.discountLine}>
                                        <Text style={styles.discountText}>All Your Discounts:</Text>
                                        <Text style={[styles.discountText, styles.discountAmount]}>
                                            {discount === 0 ? `₹${discount}` : `-₹${discount}`}
                                        </Text>
                                    </View>
                                    <View style={styles.totalLine}>
                                        <Text style={styles.totalText}>Grand total:</Text>
                                        <Text style={styles.totalAmount}>
                                            {planGrandTotalAmount < 0 ? `₹0` : `₹${planGrandTotalAmount}`}
                                        </Text>
                                    </View>
                                </View>

                                <View style={[styles.bottomOfContent, { bottom: 150 }]}>
                                    <RoundButton
                                        title={'Subscribe'}
                                        onPress={handleSubscribe}
                                        style={styles.fullWidthButton}
                                    />

                                    <Text style={styles.terms}>
                                        You agree to the <Text style={styles.link} onPress={() => Linking.openURL('https://example.com/terms')}>Terms of Service</Text> and <Text style={styles.link} onPress={() => Linking.openURL('https://example.com/privacy')}>Privacy Policy</Text>. Subscription automatically renews unless auto-renew is turned off at least 24-hours before the end of the current period.
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </BackGround>
            ) : (
                <BackGround safeArea={true} style={defaults.flex}>
                    <View style={[styles.container, tabletStyle]}>
                        <View style={styles.headerContent}>
                            <Text style={styles.title}>Subscription</Text>
                            <Text style={styles.subtitle}>
                                To complete the registration process, please make the payment
                            </Text>
                        </View>

                        <SubscriptionPlans options={subscriptionOptions} onSelectionChange={handleSelectionChange} />

                        <View style={styles.bottomOfContent}>
                            <View style={styles.couponContent}>
                                <CouponCode title={''} onDiscountChange={handleDiscountChange} />
                                <View style={styles.discountLine}>
                                    <Text style={styles.discountText}>All Your Discounts:</Text>
                                    <Text style={[styles.discountText, styles.discountAmount]}>
                                        {discount === 0 ? `₹${discount}` : `-₹${discount}`}
                                    </Text>
                                </View>
                                <View style={styles.totalLine}>
                                    <Text style={styles.totalText}>Grand total:</Text>
                                    <Text style={styles.totalAmount}>
                                        {planGrandTotalAmount < 0 ? `₹0` : `₹${planGrandTotalAmount}`}
                                    </Text>
                                </View>
                            </View>

                            <RoundButton
                                title={'Subscribe'}
                                onPress={handleSubscribe}
                                style={styles.fullWidthButton}
                            />

                            <Text style={styles.terms}>
                                You agree to the <Text style={styles.link} onPress={() => Linking.openURL('https://example.com/terms')}>Terms of Service</Text> and <Text style={styles.link} onPress={() => Linking.openURL('https://example.com/privacy')}>Privacy Policy</Text>. Subscription automatically renews unless auto-renew is turned off at least 24-hours before the end of the current period.
                            </Text>
                        </View>
                    </View>
                </BackGround>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    headerContent: {
        marginTop: 30,
        marginBottom: 10,
    },

    title: {
        fontSize: 35,
        color: "green",
        fontWeight: 'bold',
        marginBottom: 10,
    },

    subtitle: {
        fontSize: 18,
        marginBottom: 30,
        color: theme.colors.textSecondary,
    },

    bottomOfContent: {
        width: '100%',
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },

    couponContent: {
        backgroundColor: theme.colors.primary,
        borderRadius: 25,
        paddingVertical: 8,
        marginVertical: 10,
        paddingHorizontal: 8,
    },
    discountLine: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    totalLine: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    discountText: {
        color: '#fff',
        fontSize: 16,
    },
    discountAmount: {
        fontWeight: 'bold',
    },
    totalText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    totalAmount: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    fullWidthButton: {
        width: '100%',
        alignSelf: 'center',
    },

    terms: {
        marginHorizontal: 20,
        marginVertical: 5,
        fontSize: 10,
        textAlign: 'center',
        color: theme.colors.textSecondary,
    },

    link: {
        fontWeight: 'bold',
        color: theme.colors.text,
    },
});

export default SubscriptionScreen;
