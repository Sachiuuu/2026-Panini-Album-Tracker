import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { radius } from '../theme/typography';

interface Props {
  value: number;
  height?: number;
  tint?: string;
  tintEnd?: string;
  trackColor?: string;
}

export function ProgressBar({
  value,
  height = 10,
  tint = '#fbbf24',
  tintEnd,
  trackColor = '#1f2937',
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

  const widthPct = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const endColor = tintEnd ?? lighten(tint);

  return (
    <View
      style={[
        styles.track,
        { height, backgroundColor: trackColor, borderRadius: radius.pill },
      ]}
    >
      <Animated.View style={{ width: widthPct, height, borderRadius: radius.pill, overflow: 'hidden' }}>
        <LinearGradient
          colors={[tint, endColor]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
}

function lighten(hex: string): string {
  // Adds ~30% brightness to a hex color for the gradient end
  const n = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, ((n >> 16) & 0xff) + 48);
  const g = Math.min(255, ((n >> 8) & 0xff) + 48);
  const b = Math.min(255, (n & 0xff) + 48);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
});
