import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';
import { radius } from '../theme/typography';

interface Props {
  value: number;
  height?: number;
  tint?: string;
  trackColor?: string;
}

export function ProgressBar({
  value,
  height = 10,
  tint = colors.accent,
  trackColor = colors.surfaceAlt,
}: Props) {
  const clamped = Math.max(0, Math.min(1, value));
  const anim = useRef(new Animated.Value(clamped)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: clamped,
      duration: 380,
      useNativeDriver: false,
    }).start();
  }, [anim, clamped]);

  const width = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View
      style={[
        styles.track,
        { height, backgroundColor: trackColor, borderRadius: radius.pill },
      ]}
    >
      <Animated.View
        style={[
          styles.fill,
          {
            height,
            width,
            backgroundColor: tint,
            borderRadius: radius.pill,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {},
});
