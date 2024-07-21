import { useEffect, useState } from 'react';
import { Dimensions, ViewStyle } from 'react-native';
import DeviceInfo from 'react-native-device-info';

interface UseTabletStyleReturn {
  isTablet: boolean;
  orientation: 'unknown' | 'vertical' | 'horizontal';
  tabletStyle: ViewStyle;
}

const useTabletStyle = (): UseTabletStyleReturn => {
  const [orientation, setOrientation] = useState<'unknown' | 'vertical' | 'horizontal'>('unknown');

  useEffect(() => {
    const determineOrientation = () => {
      const { width, height } = Dimensions.get('screen');
      if (width < height) {
        setOrientation('vertical');
      } else {
        setOrientation('horizontal');
      }
    };

    determineOrientation();

    const subscription = Dimensions.addEventListener('change', determineOrientation);

    return () => {
      subscription.remove();
    };
  }, []);

  const isTablet = DeviceInfo.isTablet();

  const tabletStyle: ViewStyle = isTablet ? { width: '40%', height: 'auto', alignSelf: 'center' } : {};

  return { isTablet, orientation, tabletStyle };
};

export default useTabletStyle;
