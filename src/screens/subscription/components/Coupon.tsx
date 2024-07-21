import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { theme } from "../../../theme";

interface CouponCodeProps {
    title: string;
    onDiscountChange: (discountAmount: number) => void;
}

const CouponCode: React.FC<CouponCodeProps> = ({ onDiscountChange }) => {

    const [couponCodeTextName, setCouponCodeTextName] = useState('');
    const [couponCode, setCouponCode] = useState('');
    const [couponDisAmount, setCouponDisAmount] = useState(0);
    const [couponCodeApplyStatus, setCouponCodeApplyStatus] = useState(false);

    const couponList = [
        {
            couponCode: 'New Customer',
            discountAmount: 5 //rupees
        },
        {
            couponCode: 'Happy Customer',
            discountAmount: 50 //rupees
        },
    ]

    const couponCodeApply = () => {
        if (couponCodeTextName !== '') {
            for (let coupon of couponList) {
                if (couponCodeTextName == coupon.couponCode) {
                    console.log(coupon)
                    setCouponCode(coupon.couponCode)
                    setCouponDisAmount(coupon.discountAmount)
                    onDiscountChange(coupon.discountAmount);
                    setCouponCodeApplyStatus(true)
                    return
                }
            }
        }
        setCouponCodeApplyStatus(false)
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setCouponCodeTextName(value)}
                    placeholder="Coupon Code"
                />
                <TouchableOpacity onPress={couponCodeApply}>
                    <View style={styles.prefixContainer}>
                        <Image
                            source={require('../../../assets/icons/arrow.png')}
                            style={styles.arrowIcon}
                        />
                    </View>
                </TouchableOpacity>
            </View>

            {couponCodeApplyStatus ? (
                <>
                    <View style={styles.discountLine}>
                        <Text style={styles.discountText}>{couponCode}</Text>
                        <Text style={[styles.discountText, styles.discountAmount]}>
                            -₹{couponDisAmount}
                        </Text>
                    </View>
                </>
            ) : (
                <>
                    <View style={styles.discountLine}>

                    </View>
                </>
            )}

            <View style={styles.discountLine}>
                <Text style={styles.discountText}>NEWCUSTOMER_3%</Text>
                <Text style={[styles.discountText, styles.discountAmount]}>
                    -₹5
                </Text>
            </View>
            <View style={styles.divideLine}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        height: '100%',
        borderRadius: 25,
        padding: 0,
        paddingHorizontal: 8,
        color: theme.colors.text,
    },
    prefixContainer: {
        width: 60,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
        borderWidth: 1,
        borderColor: '#D0D5DD',
        paddingHorizontal: 10,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
    },
    arrowIcon: {
        width: 18,
        height: 15,
    },
    discountLine: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4, // Adjust as needed
    },
    totalLine: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    discountText: {
        color: '#fff', // Replace with your desired text color
        fontSize: 16,
    },
    discountAmount: {
        fontWeight: 'bold',
    },
    divideLine: {
        height: 2,
        backgroundColor: '#8B94B2',
        marginVertical: 15,
        marginHorizontal: 25,
    },
});

export default CouponCode;
