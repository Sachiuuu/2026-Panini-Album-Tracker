import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Animated,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const USE_NATIVE_DRIVER = Platform.OS !== 'web';
import { TeamStanding } from '../store/selectors';
import { colors } from '../theme/colors';
import { radius, spacing, typography } from '../theme/typography';
import { TeamRankRow } from './TeamRankRow';

interface Props {
  title: string;
  rows: TeamStanding[];
  tint?: string;
  defaultExpanded?: boolean;
}

export function CollapsibleRankBlock({
  title,
  rows,
  tint,
  defaultExpanded = false,
}: Props) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(defaultExpanded);
  const rotation = useRef(new Animated.Value(defaultExpanded ? 1 : 0)).current;

  const toggle = () => {
    if (Platform.OS !== 'web') LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const next = !expanded;
    setExpanded(next);
    Animated.timing(rotation, {
      toValue: next ? 1 : 0,
      duration: 220,
      useNativeDriver: USE_NATIVE_DRIVER,
    }).start();
  };

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.block}>
      <Pressable
        onPress={toggle}
        style={({ pressed }) => [styles.header, pressed && { opacity: 0.85 }]}
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        hitSlop={8}
      >
        <Text style={styles.title}>{title}</Text>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Ionicons name="chevron-down" size={22} color={tint ?? colors.accent} />
        </Animated.View>
      </Pressable>

      {expanded ? (
        <View style={styles.list}>
          {rows.map((row, idx) => (
            <TeamRankRow
              key={row.team.code}
              rank={idx + 1}
              team={row.team}
              owned={row.owned}
              total={row.total}
              pct={row.pct}
              tint={tint}
              onPress={() => router.push(`/team/${row.team.code}`)}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    minHeight: 44,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
    flexShrink: 1,
  },
  list: {
    gap: spacing.sm,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
});
