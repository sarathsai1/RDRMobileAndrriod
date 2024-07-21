import * as React from 'react';
import { View, ViewProps, ViewStyle, StyleProp } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isTablet } from 'react-native-device-info';
import defaults from '../styles/defaults';
import { theme } from '../theme';

type BackGroundProps = ViewProps & {
  style?: StyleProp<ViewStyle>;
  safeArea?: boolean;
  noMargin?: boolean;
};

const BackGround: React.FC<BackGroundProps> = ({
  style,
  safeArea,
  noMargin,
  ...props
}) => {
  const tabletStyle: ViewStyle = isTablet() ? { width: '100%', alignSelf: 'center', height: 'auto' } : {};

  return (
    <View
      {...props}
      style={[
        { backgroundColor: theme.colors.background }, // White background
        tabletStyle,
        style,
      ]}
    >
      {safeArea ? (
        <SafeAreaView
          style={[{ flex: 1 }, noMargin ? {} : defaults.pageMargin]}
        >
          {props.children}
        </SafeAreaView>
      ) : (
        props.children
      )}
    </View>
  );
};

export default BackGround;
