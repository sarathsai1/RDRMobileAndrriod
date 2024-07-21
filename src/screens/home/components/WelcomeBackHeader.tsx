import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { theme } from '../../../theme';
import defaults from '../../../styles/defaults';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type WelcomeBackHeaderProps = {
  userName?: string;
  profileImage?: string;
};

const WelcomeBackHeader: React.FC<WelcomeBackHeaderProps> = () => {
  const navigation = useNavigation<any>();
  const [userName, setUserName] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string>('');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const value = await AsyncStorage.getItem('sarath');
        if (value !== null) {
          console.log("AsyncStorage value", value);
          const userData = JSON.parse(value);
          setUserName(userData.name);
          setProfileImage(userData.userProfile);
        }
      } catch (error) {
        console.error('Error retrieving item from AsyncStorage:', error);
      }
    };

    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerTitleContent}>
        <Text style={styles.welcomeText}>Welcome back</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <View style={styles.profileContent}>
        <View style={styles.notifyIcon}>
          <TouchableOpacity onPress={() => { navigation.navigate("Notification") }}>
            <Image source={require('../../../assets/icons/notification.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.imageUploadContent}>
          <TouchableOpacity style={styles.imageUploadBoxContent} onPress={() => { navigation.navigate("Profile") }}>
            <Image
              source={profileImage ? { uri: profileImage } : require('../../../assets/images/profile.png')}
              style={[defaults.image, styles.profileImage]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 25,
  },

  headerTitleContent: {},

  welcomeText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  userName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  notifyIcon: {
    marginRight: 10,
  },
  icon: {
    width: 34, // Set the size of your icon
    height: 34, // Set the size of your icon
    resizeMode: 'contain',
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageUploadContent: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imageUploadBoxContent: {
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: 'gray',
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});

export default WelcomeBackHeader;
