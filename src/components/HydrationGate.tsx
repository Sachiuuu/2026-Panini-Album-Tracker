import { ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useHydrated } from '../store/selectors';
import { colors } from '../theme/colors';

interface Props {
  children: ReactNode;
}

export function HydrationGate({ children }: Props) {
  const ready = useHydrated();
  if (!ready) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={colors.accent} size="large" />
      </View>
    );
  }
  return <>{children}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
