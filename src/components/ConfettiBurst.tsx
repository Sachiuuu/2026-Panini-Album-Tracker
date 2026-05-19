import { useEffect, useRef } from 'react';
import { Animated, Platform, StyleSheet, View } from 'react-native';

const USE_NATIVE_DRIVER = Platform.OS !== 'web';

const COLORS = ['#fbbf24', '#34d399', '#60a5fa', '#f472b6', '#a78bfa', '#fb923c'];
const COUNT = 18;

interface Particle {
  x: Animated.Value;
  y: Animated.Value;
  opacity: Animated.Value;
  rotate: Animated.Value;
  color: string;
  tx: number;
  ty: number;
  size: number;
}

interface Props {
  active: boolean;
}

export function ConfettiBurst({ active }: Props) {
  const particles = useRef<Particle[]>(
    Array.from({ length: COUNT }, (_, i) => {
      const angle = (i / COUNT) * 2 * Math.PI + Math.random() * 0.4;
      const dist = 55 + Math.random() * 55;
      return {
        x: new Animated.Value(0),
        y: new Animated.Value(0),
        opacity: new Animated.Value(0),
        rotate: new Animated.Value(0),
        color: COLORS[i % COLORS.length],
        tx: Math.cos(angle) * dist,
        ty: Math.sin(angle) * dist,
        size: 6 + Math.random() * 6,
      };
    }),
  ).current;

  const triggered = useRef(false);

  useEffect(() => {
    if (!active || triggered.current) return;
    triggered.current = true;

    particles.forEach((p) => {
      p.x.setValue(0);
      p.y.setValue(0);
      p.opacity.setValue(1);
      p.rotate.setValue(0);
      Animated.parallel([
        Animated.timing(p.x, { toValue: p.tx, duration: 700, useNativeDriver: USE_NATIVE_DRIVER }),
        Animated.timing(p.y, { toValue: p.ty, duration: 700, useNativeDriver: USE_NATIVE_DRIVER }),
        Animated.timing(p.rotate, { toValue: 1, duration: 700, useNativeDriver: USE_NATIVE_DRIVER }),
        Animated.sequence([
          Animated.delay(300),
          Animated.timing(p.opacity, { toValue: 0, duration: 400, useNativeDriver: USE_NATIVE_DRIVER }),
        ]),
      ]).start();
    });
  }, [active, particles]);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {particles.map((p, i) => {
        const spin = p.rotate.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
        return (
          <Animated.View
            key={i}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: p.size,
              height: p.size,
              borderRadius: 2,
              backgroundColor: p.color,
              opacity: p.opacity,
              transform: [
                { translateX: p.x },
                { translateY: p.y },
                { rotate: spin },
              ],
            }}
          />
        );
      })}
    </View>
  );
}
