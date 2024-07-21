import {Alert} from 'react-native';

import RazorpayCheckout from 'react-native-razorpay';

interface PaymentDetails {
  amount: number; // Amount in the smallest currency unit (e.g., paise for INR)
  currency: string;
  receipt: string; // An identifier for the order
}

interface PrefillInfo {
  email: string;
  contact: string;
  name: string;
}

export const useRazorpayPayment = (
  razorpayKey: string,
  paymentDetails: PaymentDetails,
  prefillInfo: PrefillInfo,
) => {

  const makePayment = () => {
    console.log('working')
    const options = {
      description: 'RDR App Subscription',
      image: 'https://www.shutterstock.com/image-vector/rdr-letter-original-monogram-logo-260nw-1759069715.jpg',
      currency: paymentDetails.currency,
      key: razorpayKey,
      amount: paymentDetails.amount,
      name: 'RDR',
      order_id: paymentDetails.receipt,
      prefill: prefillInfo,
      theme: {color: '#F37254'}
    };

    RazorpayCheckout.open(options).then((data: any) => {
      // handle success
      Alert.alert(`Success: ${data.razorpay_payment_id}`);
    }).catch((error: any) => {
      // handle failure
      console.log(error.description)
      Alert.alert(`Error: ${error.code} |  ${error.description}`);
    });
  };

  return makePayment;
};
