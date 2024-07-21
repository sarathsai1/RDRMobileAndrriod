import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, View, TouchableOpacity, Image, Alert, ViewStyle } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  getHash,
  startOtpListener,
  useOtpVerify,
} from 'react-native-otp-verify';

import RoundInput from '../../components/inputs/RoundInput';
import RoundButton from '../../components/buttons/RoundButton';
import SocialMediaButton from '../../components/buttons/SocialMediaButton';
import BackGround from '../../components/BackGround';
import defaults from '../../styles/defaults';
import { theme } from '../../theme';
import { useAuth } from '../../services/firebaseAuthContext';
import useTabletStyle from "../../styles/TabStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userObj } from '../../storage/storageUser';

GoogleSignin.configure({
  webClientId: '244634140968-sva74pkqer9qq9cmk5har334hr2qsumf.apps.googleusercontent.com',
 // From Firebase Console
  offlineAccess: true,
  scopes: ['profile', 'email', 'https://www.googleapis.com/auth/userinfo.profile'],
});

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const countryid = '+91';
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const { setConfirmationResult } = useAuth();
  const { isTablet, orientation, tabletStyle } = useTabletStyle();

  useEffect(() => {
    getHash().then(hash => {
      console.log(hash)
    }).catch(console.log);
  }, []);

  const sendOtp = async () => {
    console.log('+91' + phoneNumber)
    const confirmation = await auth().signInWithPhoneNumber('+91' + phoneNumber);
    console.log(confirmation);
    navigation.navigate('OtpVerify', { confirmation });
  };

  const handleLogin = async () => {
    const mobileNumberWithcountryid = countryid + phoneNumber
    console.log("mobile",mobileNumberWithcountryid);
    try {
      const confirmationResult = await auth().signInWithPhoneNumber(mobileNumberWithcountryid);

      console.log('Confirmation result:', confirmationResult);
      setConfirmationResult(confirmationResult);
      navigation.navigate('OtpVerify', { mobileNumber: mobileNumberWithcountryid });
    } catch (error) {
      console.error('Phone number sign-in error:', (error as Error).message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      
      const idToken = userInfo.idToken;
      const accessToken = (await GoogleSignin.getTokens()).accessToken; // Explicitly get the access token

      if (!idToken || !accessToken) {
        throw new Error("Failed to retrieve idToken or accessToken");
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
      console.log('ID Token:', idToken);
      console.log('Access Token:', accessToken);

      const firebaseUser = await auth().signInWithCredential(googleCredential);
      const token = await firebaseUser.user.getIdToken()
       console.log("token",token);
       await AsyncStorage.setItem('authToken', token);
      if (firebaseUser) {
      
        userObj.name=firebaseUser.user.displayName || '';
        userObj.email=firebaseUser.user.email || '';
        userObj.userProfile=firebaseUser.user.photoURL || '';
        AsyncStorage.setItem('sarath',JSON.stringify(userObj));
        console.log("Firebase User Email:", firebaseUser.user.email);
        console.log("Firebase User Name:", firebaseUser.user.displayName);
        console.log("Firebase User Profile Picture:", firebaseUser.user.photoURL);

        // Use the access token as needed
        console.log("Access Token for further API calls:", accessToken);

        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
     // Alert.alert('Google Sign-In Error', .message);
    }
  };

  const handleGoogleLogout = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await auth().signOut();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <BackGround safeArea={true} style={defaults.flex}>
      <View style={[styles.container, tabletStyle, isTablet && orientation === 'vertical' ? { width: '70%', height: 'auto', alignSelf: 'center' } : {}]}>
        <View style={styles.titleContent}>
          <Text style={styles.title}>Log in</Text>
          <Text style={styles.description}>Please confirm your enter your phone number.</Text>
        </View>

        <RoundInput
          label='Mobile Number'
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Mobile Number"
          keyboardType="phone-pad"
          editable={false}
          error={''} options={[]}        />

        <RoundButton
          title={'Log in'}
          onPress={handleLogin}
          style={styles.fullWidthButton}
        />

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>Or Register with</Text>
          <View style={styles.divider} />
        </View>

        <SocialMediaButton title={'Log in with Google'} onPress={handleGoogleLogin} />
      </View>
    </BackGround>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 100,
  },

  title: {
    fontSize: 40,
    fontWeight: '800',
    color: theme.colors.text,
  },

  description: {
    width: '70%',
    color: theme.colors.textSecondary
  },

  titleContent: {
    marginBottom: 25
  },

  fullWidthButton: {
    width: '100%',
    alignSelf: 'center',
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.borderColor,
  },

  dividerText: {
    color: theme.colors.textSecondary,
    marginHorizontal: 10,
  },
});

export default LoginScreen;
