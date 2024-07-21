import * as React from 'react';
import {
    ActivityIndicator,
    Alert,
    Animated,
    Easing,
    Image,
    Linking,
    PermissionsAndroid,
    Platform,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { I18n } from 'i18n-js';
import Toast from 'react-native-toast-message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const renderModalCloseButton = (
    style: ViewStyle,
    click: any,
    color?: string,
    size?: number,
) => {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={[
                {
                    position: 'absolute',
                    right: 10,
                    top: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    height: 28,
                    width: 28,
                },
                style,
            ]}
            onPress={click}>
            <Image
                source={require('../assets/icons/close.png')}
                style={{width: 30, height: 30, marginBottom: 15}}
            />
        </TouchableOpacity>
    );
};

const requestCameraUsage = () => {
    return requestPermission('CAMERA');
};

const requestMicrophoneUsage = () => {
    return requestPermission('MICRO_PHONE');
};

const checkCameraUsage = (alertMessage: string) => {
    return checkPermission('CAMERA', alertMessage);
};

const checkMicrophoneUsage = (alertMessage: string) => {
    return checkPermission('MICRO_PHONE', alertMessage);
};

const checkBluetoothUsage = (alertMessage: string) => {
    return checkPermission('BLUETOOTH_CONNECT', alertMessage);
};

const checkBluetoothScan = (alertMessage: string) => {
    return checkPermission('BLUETOOTH_SCAN', alertMessage);
};
const checkPushNotification = (alertMessage: string) => {
    return checkPermission('POST_NOTIFICATIONS', alertMessage);
};

export const checkPermission = (
    permission:
        | 'CAMERA'
        | 'MICRO_PHONE'
        | 'PHOTO_LIBRARY'
        | 'READ_EXTERNAL'
        | 'READ_CONTACTS'
        | 'BLUETOOTH_CONNECT'
        | 'BLUETOOTH_SCAN'
        | 'POST_NOTIFICATIONS',
    alertMessage: string,
) => {
    let permissions: any = {
        ios: {
            CAMERA: PERMISSIONS.IOS.CAMERA,
            MICRO_PHONE: PERMISSIONS.IOS.MICROPHONE,
            PHOTO_LIBRARY: PERMISSIONS.IOS.PHOTO_LIBRARY,
            READ_EXTERNAL: PERMISSIONS.IOS.PHOTO_LIBRARY,
            READ_CONTACTS: PERMISSIONS.IOS.CONTACTS,
        },
        android: {
            CAMERA: PermissionsAndroid.PERMISSIONS.CAMERA,
            MICRO_PHONE: PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            PHOTO_LIBRARY: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            READ_EXTERNAL: PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            READ_CONTACTS: PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            BLUETOOTH_CONNECT: PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            BLUETOOTH_SCAN: PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            POST_NOTIFICATIONS: PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        },
    };

    return new Promise(async (resolve, reject) => {
        if (Platform.OS === 'ios') {
            check(permissions.ios[permission])
                .then(result => {
                    switch (result) {
                        case RESULTS.UNAVAILABLE:
                            console.log(
                                'This feature is not available (on this device / in this context)',
                            );
                            reject(
                                'This feature is not available (on this device / in this context)',
                            );
                            break;
                        case RESULTS.DENIED:
                            console.log(
                                'The permission has not been requested / is denied but requestable',
                            );
                            resolve(true);
                            break;
                        case RESULTS.GRANTED:
                            console.log('The permission is granted');
                            resolve(true);
                            break;
                        case RESULTS.BLOCKED:
                            console.log(
                                'The permission is denied and not requestable anymore',
                            );
                            resolve(false);
                            showSettingsAlert(alertMessage);
                            break;
                    }
                })
                .catch(error => {
                    reject(error);
                });
        } else {
            if (
                permission === 'PHOTO_LIBRARY' ||
                permission === 'POST_NOTIFICATIONS'
            ) {
                if (Platform.constants['Release'].osVersion >= 13) {
                    resolve(true);
                }
                return;
            }

            let granted = await PermissionsAndroid.request(
                permissions.android[permission],
            );
            console.log('is permission granted ? ', granted);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                resolve(true);
            } else {
                resolve(false);
                Alert.alert(alertMessage);
            }
        }
    });
};


export const requestPermission = (permission: string) => {
    return new Promise(async (resolve, reject) => {
        let permissions: any = {
            ios: {
                CAMERA: PERMISSIONS.IOS.CAMERA,
                MICRO_PHONE: PERMISSIONS.IOS.MICROPHONE,
            },
            android: {
                CAMERA: PermissionsAndroid.PERMISSIONS.CAMERA,
                MICRO_PHONE: PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            },
        };
        let reqPermission =
            Platform.OS === 'ios'
                ? permissions.ios[permission]
                : permissions.android[permission];
        try {
            request(reqPermission).then(
                resp => {
                    console.log('requestPermission request ::::::', resp);
                    resolve(resp);
                },
                error => {
                    console.log('requestPermission error:::::::::', error);
                    reject(error);
                },
            );
        } catch (error) { }
    });
};


const showSettingsAlert = (message: string) => {
    Alert.alert(
        '',
        message,
        [
            {
                text: 'settings',
                onPress: () => {
                    goToAppSettings(message);
                },
            },
            {
                text: 'cancel',
                onPress: () => { },
            },
        ],
        { cancelable: false },
    );
};

const goToAppSettings = (alertMsg = 'settings') => {
    if (Platform.OS === 'ios') {
        Linking.canOpenURL('app-settings:')
            .then(supported => {
                if (!supported) {
                    Alert.alert(alertMsg);
                } else {
                    return Linking.openURL('app-settings:');
                }
            })
            .catch(err => {
                console.error('An error occurred', err);
                Alert.alert(alertMsg);
            });
    } else {
        Linking.openSettings();
    }
};

const getSafeAreaInsets = () => {
    const { bottom, top } = useSafeAreaInsets();
    return { bottom, top };
};

export function tryParseJSON(input: any, defaultValue?: any) {
    try {
        //check if the string exists
        if (input) {
            let json = JSON.parse(input);

            //validate the result too
            if (json && json.constructor === Object) {
                return json;
            }
        }
    } catch (e: any) {
        console.log('JSON Parse error ..');
    }
    return defaultValue;
}

export const showErrorToast = ({
    position,
    text,
    icon,
    iconType,
    time,
    height,
}: {
    position?: 'top' | 'bottom';
    text: string;
    icon?: string;
    iconType?: string;
    time?: number;
    height?: number;
}) => {
    position = position ?? 'bottom';
    icon = icon ?? 'alert-circle';
    Toast.show({
        visibilityTime: time ?? 5000,
        position,
        type: 'customToast',
        text1: text,
        //text2: 'This is some something 👋',
        props: {
            icon,
            error: true,
            iconType,
            height,
        },
    });
};

export {
    requestCameraUsage,
    requestMicrophoneUsage,
    checkMicrophoneUsage,
    checkBluetoothUsage,
    checkBluetoothScan,
    checkCameraUsage,
    renderModalCloseButton,
    getSafeAreaInsets,
};